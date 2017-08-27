const {app, BrowserWindow, ipcMain: ipc} = require('electron')
const Replay = require('./src/main/replay')(__dirname)

const path = require('path')
const url  = require('url')

const WIN_WIDTH  = 256
const WIN_HEIGHT = 224

let win

function create_window () {
  win = new BrowserWindow({
    width     : WIN_WIDTH*2,
    height    : WIN_HEIGHT*2,
    minWidth  : WIN_WIDTH*2,
    minHeight : WIN_HEIGHT*2
  })
  win.setAspectRatio(8/7,0)
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools()
  win.on('closed', function () {
    win = null
  })
}

function test(){
  console.log('Testing to see if this calls main')
}

function ready(){
  create_window()

  ipc.on('replay-save', (event, {inputs}) => {
    Replay.save(`${Date.now()}`,inputs,function(err,data){})
  });
  ipc.on('replay-load', (event) => {
    console.log('main replay load')
    Replay.last(function(err,name){
      Replay.load(name,function(err,data){
        win.webContents.send('replay-load',{inputs: data})
      })
    })
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
