import * as path     from 'path'
import * as url      from 'url'
import * as electron from 'electron'
import Replay   from 'common/replay'
import Logger   from 'common/logger'
import store    from 'common/store'

const {app, shell, Menu, BrowserWindow, ipcMain: ipc, dialog} = electron
const WIN_WIDTH  = 398 * 2
const WIN_HEIGHT = 224 * 2

//require('electron-reload')(__dirname);

let win, win_settings = null
Replay.dir()

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
  null  //p0_start
  ])
}
const template : any = [
  {
    label: 'Settings',
    submenu: [
      {click: click_settings('input')  , label: "Input"},
      {click: click_settings('network'), label: "Network"},
      {click: click_settings('audio')  , label: "Audio"},
      {click: click_settings('replay') , label: "Replay"}
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
  win.setAspectRatio(8/7,0)   // MAC only function

  const load_url : any = {
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: true,
    icon: path.join(__dirname, 'assets', 'icons', 'png', '64x64.png')
  }

  win.loadURL(url.format(load_url))

  win.webContents.openDevTools()
  win.webContents.on('devtools-opened', () => {setImmediate(function() { win.focus()})})
  win.on('closed', function () {
    app.quit()
    //win = null
  })
}

function ready(){
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

ipc.on('controls-update', (event) => {
  win.webContents.send('controls-rebind')
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
  let dir = Replay.dir()
  shell.openItem(dir)
})
ipc.on('replay-dir-reset', (event) => {
  let dir = Replay.dir('reset')
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
ipc.on('play-vs', (event,{seed,online,cpu}) => {
  console.log('seed_____:0',seed)
  if (online){
    seed = seed
  } else {
    seed = Replay.random_seed()
  }
  console.log('seed_____:1',seed)
  win.webContents.send('play-vs',{
    seed:   seed,
    online: online,
    cpu:    cpu
  })
})

ipc.on('network-connect', (event,data) => {
  win.webContents.send('network-connect',data)
  win.focus()
})

ipc.on('settings', (event,name) => {
  click_settings(name)()
})

ipc.on('fullscreen', (event,name) => {
  win.setFullScreen(!win.isFullScreen())
})

ipc.on('log', (event,data) => {
  Logger.debug(data)
})
