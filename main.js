const {app, BrowserWindow, ipcMain: ipc} = require('electron')

const path = require('path')
const url  = require('url')
const fs   = require('fs')

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

  ipc.on('game-over', (event, {inputs}) => {
    var path_replay = path.join(__dirname,'replays',`${Date.now()}.replay`)
    var replay      = fs.createWriteStream(path_replay, {flags: 'a'})
    const len = inputs[0].length + inputs[1].length
    for (i = 0; i < len; i++) {
      if (inputs[0].length === 0 && inputs[1].length > 0) {
        replay.write("1,"+inputs[1].shift().join(',')+"\n")
      }
      else if (inputs[0].length > 0 && inputs[1].length === 0) {
        replay.write("0,"+inputs[0].shift().join(',')+"\n")
      }
      else if (inputs[1][0][0] >= inputs[0][0][0].length) {
        replay.write("0,"+inputs[0].shift().join(',')+"\n")
      }
      else {
        replay.write("1,"+inputs[1].shift().join(',')+"\n")
      }
    }
    replay.end()
  });
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
