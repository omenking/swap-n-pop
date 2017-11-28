const APP = require('../../../app')('../../../')
const m = require('./../../lib/mithril')
const {ipcRenderer: ipc} = require('electron')

const {remote} = require('electron')
let mode = remote.getCurrentWindow().custom.mode

Ui = {
  close: function(){
    mode = false
    document.getElementById('game').classList.remove('hide')
  },
  show: function(){
    mode = 'input'
    document.getElementById('game').classList.add('hide')
  },
  mode: function(){
    return mode
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
function content(game){
  if      (mode === 'input')  { return m('.content.settings_input'  ,UiInput()   )}
  else if (mode === 'network'){ return m('.content.settings_network',UiNetwork() )}
  else if (mode === 'audio')  { return m('.content.settings_audio'  ,UiAudio(game))}
  else if (mode === 'replay') { return m('.content.settings_replay' ,UiReplay()  )}
}

function render(game){
  const app = {view: function(){
    if (mode !== false) {
      return m('.wrap1',
        m('.wrap2',[
          nav(),
          content(game)
        ])
      )
    }
  }}

  el = document.getElementById('ui')
  m.mount(el, app)
}

ipc.on('reload',function(event,data){
  mode = data.mode
  document.getElementById('game').classList.add('hide')
  m.redraw()
})

module.exports = render
