const {app, Menu, BrowserWindow, ipcMain: ipc} = require('electron')
const Replay = require('./src/main/replay')(__dirname)
const Store = require('electron-store')


const path = require('path')
const url  = require('url')

const WIN_WIDTH  = 256
const WIN_HEIGHT = 224

let win,
    win_settings

const store = new Store()
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

const template = [
  {
    label: 'Settings',
    submenu: [
      {click: click_settings('input')  , label: "Input"},
      {click: click_settings('network'), label: "Network"},
      {click: click_settings('audio')  , label: "Audio"}
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: "Swap N Pop",
    submenu: [
      {role: 'about', label: "About Swap N Pop"},
      {type: 'separator' },
      {click: click_settings('input'), label: "Preferences"},
      {type: 'separator' },
      {role: 'quit' , label: "Quit"}
    ]
  })
}

const menu  = Menu.buildFromTemplate(template)

function click_settings(item, win, ev) {
  return function(){
    win_settings = new BrowserWindow({
      title     : "Settings",
      width     : 500,
      height    : 500,
      parent    : win,
      resizable: false
    })
    win_settings.loadURL(url.format({
      pathname: path.join(__dirname, 'src', 'settings.html'),
      protocol: 'file:',
      slashes: true
    }))
    win_settings.webContents.on('devtools-opened', () => {setImmediate(function() { win_settings.focus()})})
    win_settings.webContents.openDevTools()
  }
}


function create_window () {
  win = new BrowserWindow({
    title     : "Swap N Pop",
    width     : WIN_WIDTH*2,
    height    : WIN_HEIGHT*2,
    minWidth  : WIN_WIDTH*2,
    minHeight : WIN_HEIGHT*2
  })
  win.setTitle("Swap N Pop")
  win.setAspectRatio(8/7,0)
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.on('devtools-opened', () => {setImmediate(function() { win.focus()})})
  win.webContents.openDevTools()
  win.on('closed', function () {
    win = null
  })
}

function ready(){
  Menu.setApplicationMenu(menu)
  create_window()

  ipc.on('controls-update', (event) => {
    win.webContents.send('controls-rebind')
  })
  ipc.on('replay-save', (event, {seed,inputs}) => {
    Replay.save(`${Date.now()}`,seed,inputs,function(err,data){})
  })
  ipc.on('replay-load', (event) => {
    Replay.last(function(err,name){
      Replay.load(name,function(err,data){
        win.webContents.send('replay-load',data)
      })
    })
  })
  ipc.on('play-vs', (event,{online,cpu}) => {
    win.webContents.send('play-vs',{
      seed:   Replay.random_seed(),
      online: online,
      cpu:    cpu
    })
  })

  ipc.on('network-connect', (event,data) => {
    win.webContents.send('network-connect',data)
    win_settings.close()
    win.focus()
  })
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
