const {app, shell, Menu, BrowserWindow, ipcMain: ipc, dialog} = require('electron')
const Store = require('electron-store')
const store = new Store()

const Replay = require('./src/main/replay')(app,store)

const path = require('path')
const url  = require('url')

const WIN_WIDTH  = 256
const WIN_HEIGHT = 224


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

const template = [
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
      {click: click_debug('main')      , label: "Inspector Main"},
      {click: click_debug('settings')  , label: "Inspector Settings"}
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

function click_debug(kind){
  return function(){
    switch (kind) {
      case 'main':
        if (win !== null) {
          win.webContents.openDevTools()
        }
        break
      case 'settings':
        if (win_settings !== null) {
          win_settings.webContents.openDevTools()
        }
        break
    }
  }
}

function click_settings(mode) {
  return function(item, win, ev){
    if (win_settings !== null){
      win_settings.custom = {mode: mode}
      win_settings.webContents.send('reload',{mode: mode})
      win_settings.show()
      return
    }
    win_settings = new BrowserWindow({
      title     : "Settings",
      width     : 500,
      height    : 500,
      parent    : win,
      resizable: false,
      backgroundColor: '#212121'
    })
    win_settings.custom = {mode: mode}
    win_settings.loadURL(url.format({
      pathname: path.join(__dirname, 'src', 'settings.html'),
      protocol: 'file:',
      slashes: true
    }))
    win_settings.webContents.on('devtools-opened', () => {setImmediate(function() { win_settings.focus()})})
    win_settings.on('closed', function () {
      win_settings = null
    })
  }
}


function create_window () {
  win = new BrowserWindow({
    title     : "Swap N Pop",
    width     : 2*WIN_WIDTH ,
    height    : 2*WIN_HEIGHT,
    minWidth  : 2*WIN_WIDTH ,
    minHeight : 2*WIN_HEIGHT,
    useContentSize: true,
    backgroundColor: '#282828'
  })
  win.setTitle("Swap N Pop")
  win.setAspectRatio(8/7,0)
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src', 'index.html'),
    protocol: 'file:',
    slashes: true,
    icon: path.join(__dirname, 'src', 'assets', 'icons', 'png', '64x64.png')
  }))
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
  dialog.showOpenDialog(win_settings, {
    properties: ['openDirectory']
  },function(data){
    if (data !== undefined && data !== null && data.length > 0){
      let dir = Replay.dir('change',data[0])
      win_settings.webContents.send('replay-dir',dir)
    }
  })
})
ipc.on('replay-list', (event) => {
  Replay.list(function(err,files){
    win_settings.webContents.send('replay-list',files)
  })
})
ipc.on('replay-dir-reveal', (event) => {
  let dir = Replay.dir()
  shell.openItem(dir)
})
ipc.on('replay-dir-reset', (event) => {
  let dir = Replay.dir('reset')
  win_settings.webContents.send('replay-dir',dir)
})
ipc.on('replay-save', (event, {seed,inputs}) => {
  Replay.save(`${Date.now()}`,seed,inputs,function(err,data){})
})
ipc.on('replay-delete', (event,name) => {
  Replay.del(name)
})
ipc.on('replay-load', (event,name) => {
  Replay.load(name,function(err,data){
    win_settings.close()
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
  win_settings.close()
  win.focus()
})

ipc.on('settings', (event,name) => {
  click_settings(name)()
})

ipc.on('fullscreen', (event,name) => {
  win.setFullScreen(!win.isFullScreen())
})
