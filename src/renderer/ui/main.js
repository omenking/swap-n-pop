import m          from 'mithril'
import Ui         from 'ui/mode'
import UiInput    from 'ui/input'
import UiNetwork  from 'ui/network'
import UiAudio    from 'ui/audio'
import UiReplay   from 'ui/replay'
import electron   from 'electron'

const {ipcRenderer: ipc} = electron


function class_tab(new_mode){
  if (Ui.mode === new_mode){
    return 'active'
  } else {
    return ''
  }
}

function click_tab(new_mode){
  return function(){
    Ui.mode = new_mode
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
  if      (Ui.mode === 'input')  { return m('.content.settings_input'  ,UiInput()   )}
  else if (Ui.mode === 'network'){ return m('.content.settings_network',UiNetwork() )}
  else if (Ui.mode === 'audio')  { return m('.content.settings_audio'  ,UiAudio(game))}
  else if (Ui.mode === 'replay') { return m('.content.settings_replay' ,UiReplay()  )}
}

function render(game){
  const app = {view: function(){
    if (Ui.mode !== false) {
      return m('.wrap1',
        m('.wrap2',[
          nav(),
          content(game)
        ])
      )
    }
  }}

  const el = document.getElementById('ui')
  m.mount(el, app)
}

ipc.on('reload',function(event,data){
  Ui.mode = data.mode
  document.getElementById('game').classList.add('hide')
  m.redraw()
})

export default render
