import {app, shell, Menu, BrowserWindow, ipcMain as ipc, dialog} from 'electron'
import * as path     from 'path'
import * as url      from 'url'
import * as fs       from 'fs'
import {URL} from 'url'

import Replay         from 'common/replay'
import ExternalAssets from 'common/external_assets';
import Logger         from 'common/logger'
import Store          from 'common/store'
import {HOST, ENV}    from 'common/data'

const WIN_WIDTH  = 398 * 2
const WIN_HEIGHT = 224 * 2
const store = new Store()

//require('electron-reload')(__dirname);

let win, win_discord = null
Replay.dir(undefined, undefined)
ExternalAssets.dir()

if (!store.has('network.host_port')) { store.set('network.host_port',22022) }
if (!store.has('network.join_host')) { store.set('network.join_host','192.168.0.0') }
if (!store.has('network.join_port')) { store.set('network.join_port',22022) }

// maybe move to inputs
if (!store.has('inputs')){
  store.set('inputs',[
  38, //p0_up
  40, //p0_down
  37, //p0_left
  39, //p0_right
  90, //p0_a
  88, //p0_b
  83, //p0_l
  65, //p0_r
  13, //p0_start
  null, //p0_up
  null, //p0_down
  null, //p0_left
  null, //p0_right
  null, //p0_a
  null, //p0_b
  null, //p0_l
  null, //p0_r
  null, //p0_start

  null, //sim_toggle
  null, //sim_forward
  null  //sim_backward
  ])
}
const template : any = [
  {
    label: 'Settings',
    submenu: [
      {click: click_settings('input')  , label: "Input"},
      {click: click_settings('network'), label: "Network"},
      {click: click_settings('audio')  , label: "Audio"},
      {click: click_settings('replay') , label: "Replay"},
      {click: click_settings('assets') , label: "External Assets"},
    ]
  },
  {
    label: 'Debug',
    submenu: [
      {click: click_debug, label: "Inspector"},
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: "Swap'N'Pop",
    submenu: [
      {role: 'about', label: "About Swap'N'Pop"},
      {type: 'separator' },
      {click: click_settings('input'), label: "Preferences"},
      {type: 'separator' },
      {role: 'quit' , label: "Quit"}
    ]
  })
}

const menu  = Menu.buildFromTemplate(template)

function click_debug(){
  win.webContents.openDevTools()
}

function click_settings(mode : string) {
  return function(item?, win?, ev?){
    win.custom = {mode: mode}
    win.webContents.send('reload',{mode: mode})
  }
}

function create_window () {
  const dev = process.env.NODE_ENV !== 'production';
  win = new BrowserWindow({
    title     : "Swap'N'Pop",
    width     : 2*WIN_WIDTH ,
    height    : 2*WIN_HEIGHT,
    minWidth  : WIN_WIDTH ,
    minHeight : WIN_HEIGHT,
    useContentSize: true,
    backgroundColor: '#282828',
    webPreferences: {
      webSecurity: false
    }
  })
  win.custom = {mode: false}
  win.setTitle("Swap'N'Pop")
  win.setAspectRatio(16/9,0)   // MAC only function

  const load_url : any = {
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: true,
    icon: path.join(__dirname, 'assets', 'icons', 'png', '64x64.png')
  }

  win.loadURL(url.format(load_url))
  if (ENV === 'development'){
    win.webContents.openDevTools()
  }

  win.webContents.on('devtools-opened', () => {setImmediate(function() { win.focus()})})
  win.on('closed', function () {
    app.quit()
    //win = null
  })
}

function ready(){
  BrowserWindow.addDevToolsExtension(path.join(__dirname,'devtools'))
  Menu.setApplicationMenu(menu)
  create_window()
}


function window_all_closed(){
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

function activate(){
  if (win === null) {
    create_window()
  }
}

app.on('ready'            , ready)
app.on('window-all-closed', window_all_closed)
app.on('activate'         , activate)
ipc.on('login',(event) => {
  store.delete('auth_token')
  store.delete('username')
  win.custom = {mode: 'login'}
  win.webContents.send('reload',{mode: 'login'})
})
ipc.on('logout',(event) => {
  store.delete('auth_token')
  store.delete('username')
  win.custom = {mode: 'login'}
  win.webContents.send('reload',{mode: 'login'})
})

ipc.on('discord', (event)=> {
  win_discord = new BrowserWindow({
    title     : "Swap'N'Pop",
    width     : 480,
    height    : 540,
    useContentSize: true,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false
    }
  })
  const path = `${HOST}/auth/discord`
  win_discord.webContents.on('did-navigate', function (event, _url) {
    const url : URL = new URL(_url)
    if (url.pathname === '/auth/result') {
      const username = url.searchParams.get('username')
      const token    = url.searchParams.get('auth_token')
      const state    = url.searchParams.get('state')
      store.set('auth_token',token)
      store.set('username',username)
      if (state === 'incomplete'){
        win.custom = {mode: 'incomplete'}
        win.webContents.send('reload',{mode: 'incomplete'})
      } else if (state === 'close'){
        console.log(token,username)
        win.webContents.send('close')
      }
      win_discord.close()
      win.focus()
      win.show()
      win.webContents.focus()
    }
  })
  console.log('discord_path',path)
  win_discord.loadURL(path)
  win_discord.show()
  if (ENV === 'development'){
    win_discord.webContents.openDevTools()
  }
})
ipc.on('controls-update', (event) => {
  win.webContents.send('controls-rebind')
})

ipc.on('snapshot-export',(event,snapshot) => {
  const json = JSON.stringify(snapshot)
  dialog.showSaveDialog(win, {
    defaultPath: '~/untitled.snap'
  },function(filename){
    if (filename === undefined){return}
    fs.writeFile(filename,json, function (err) {})
  })
})
ipc.on('snapshot-import',(event) => {
  dialog.showOpenDialog(win, {}, function(filepaths){
    if (filepaths === undefined){return}
    const data = JSON.parse(fs.readFileSync(filepaths[0], 'utf8'))
    win.webContents.send('snapshot-import',data)
  })
})
ipc.on('replay-export',(event) => {
})
ipc.on('replay-import',(event) => {
})

ipc.on('replay-dir-change', (event) => {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  },function(data){
    if (data !== undefined && data !== null && data.length > 0){
      let dir = Replay.dir('change',data[0])
      win.webContents.send('replay-dir',dir)
    }
  })
})
ipc.on('replay-list', (event) => {
  Replay.list(function(err,files){
    win.webContents.send('replay-list',files)
  })
})
ipc.on('replay-dir-reveal', (event) => {
  let dir = Replay.dir(undefined, undefined)
  shell.openItem(dir)
})
ipc.on('replay-dir-reset', (event) => {
  let dir = Replay.dir('reset',undefined)
  win.webContents.send('replay-dir',dir)
})
ipc.on('replay-save', (event, {seed,inputs}) => {
  Replay.save(`${Date.now()}`,seed,inputs,function(err,data){})
})
ipc.on('replay-delete', (event,name) => {
  Replay.del(name)
})
ipc.on('replay-load', (event,name) => {
  Replay.load(name,function(err,data){
    win.focus()
    win.webContents.send('replay-load',data)
  })
})

ipc.on('asset-dir-reveal',  e => shell.openItem(ExternalAssets.dir()))
ipc.on('asset-dir-reset',   e => win.webContents.send('asset-dir', ExternalAssets.dir('reset')))

ipc.on('asset-dir-change', e => {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  }, data => {
    if (data !== undefined && data !== null && data.length > 0)
      win.webContents.send('asset-dir', ExternalAssets.dir('change', data[0]))
  })
})

ipc.on('play-single', (event,data) => {
  const seed = Replay.random_seed(16,undefined)
  win.webContents.send('play-single',{
    seed:    seed,
    timer:   data.timer
  })
})

ipc.on('play-vs', (event,data) => {
  const seed = data.online ? data.seed : Replay.random_seed(16,undefined)
  win.webContents.send('play-vs',{
    seed:    seed,
    online:  data.online,
    cpu:     data.cpu,
    garbage: data.garbage,
    timer:   data.timer
  })
})

ipc.on('network-connect', (event,data) => {
  win.webContents.send('network-connect',data)
  win.focus()
})

ipc.on('settings', function(event,name){
  win.custom = {mode: name}
  win.webContents.send('reload',{mode: name})
})

ipc.on('fullscreen', (event,name) => {
  win.setFullScreen(!win.isFullScreen())
})

ipc.on('log', (event,data) => {
  Logger.debug(data)
})
