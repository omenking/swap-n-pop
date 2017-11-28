import m from 'mithril';
const {ipcRenderer: ipc} = require('electron')

const {remote} = require('electron')
let mode = remote.getCurrentWindow().custom.mode

const Ui = {
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
import UiInput    from '@/ui/input'
import UiNetwork  from '@/ui/network'
import UiAudio    from '@/ui/audio'
import UiReplay   from '@/ui/replay'


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
  if      (mode === 'input')  { return m('.content.settings_input'  ,UiInput(Ui)   )}
  else if (mode === 'network'){ return m('.content.settings_network',UiNetwork(Ui) )}
  else if (mode === 'audio')  { return m('.content.settings_audio'  ,UiAudio(Ui)   )}
  else if (mode === 'replay') { return m('.content.settings_replay' ,UiReplay(Ui)  )}
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

ipc.on('reload',function(event,data){
  mode = data.mode
  document.getElementById('game').classList.add('hide')
  m.redraw()
})

export default render
