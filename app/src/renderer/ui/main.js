const APP = require('../../../app')('../../../')
const m = require('./../../lib/mithril')
const {ipcRenderer: ipc} = require('electron')

const {remote} = require('electron')
let mode = remote.getCurrentWindow().custom.mode

Ui = {
  close: function(){
    mode = false
    document.getElementById('game').classList.remove('hide')
  }
}
const UiInput    = require(APP.path.ui('input'  ))(Ui)
const UiNetwork  = require(APP.path.ui('network'))(Ui)
const UiAudio    = require(APP.path.ui('audio'  ))(Ui)
const UiReplay   = require(APP.path.ui('replay' ))(Ui)


function class_tab(new_mode){
  if (mode === new_mode){
    return 'active'
  } else {
    return ''
  }
}

function click_tab(new_mode){
  return function(){
    mode = new_mode
  }
}

function nav(){
  return m('nav.divider',[
    m('.tab',{className: class_tab('input')  , onclick: click_tab('input')}  ,'Inputs'),
    m('.tab',{className: class_tab('network'), onclick: click_tab('network')},'Network'),
    m('.tab',{className: class_tab('audio')  , onclick: click_tab('audio')}  ,'Audio'),
    m('.tab',{className: class_tab('replay') , onclick: click_tab('replay')}  ,'Replays'),
    m('.clear')
  ])
}
function content(){
  if      (mode === 'input')  { return m('.content.settings_input'  ,UiInput()   )}
  else if (mode === 'network'){ return m('.content.settings_network',UiNetwork() )}
  else if (mode === 'audio')  { return m('.content.settings_audio'  ,UiAudio()   )}
  else if (mode === 'replay') { return m('.content.settings_replay' ,UiReplay()  )}
}

function render(){
  const app = {view: function(){
    if (mode !== false) {
      return m('.wrap1',
        m('.wrap2',[
          nav(),
          content()
        ])
      )
    }
  }}

  el = document.getElementById('ui')
  m.mount(el, app)
}

document.onkeydown = function (e) {
  if (e.keyCode == 27) { //esc
    console.log('esc')
    if (mode === false) {
      mode = 'input'
      document.getElementById('game').classList.add('hide')
    } else {
      mode = false
      document.getElementById('game').classList.remove('hide')
    }
    m.redraw()
  }
}

ipc.on('reload',function(event,data){
  mode = data.mode
  document.getElementById('game').classList.add('hide')
  m.redraw()
})

module.exports = render
