const m = require('./lib/mithril')
const {remote,ipcRenderer: ipc} = require('electron')
const Store = require('electron-store')
const store = new Store()
const keycode = require('keycode')

var mode = remote.getCurrentWindow().custom.mode

//settings_network #####################
var host_port = {value: 40001      , setValue: function(v) {host_port.value = v}}
var join_host = {value: '127.0.0.1', setValue: function(v) {join_host.value = v}}
var join_port = {value: 40001      , setValue: function(v) {join_port.value = v}}

ipc.on('reload',function(event,data){
  mode = data.mode
  m.redraw()
})

function submit_host(){
  ipc.send('network-connect',{
    mode: 'host',
    host_port: host_port.value,
    join_host: join_host.value,
    join_port: join_port.value
  })
  return false
}

function submit_join(){
  ipc.send('network-connect',{
    mode: 'join',
    host_port: host_port.value,
    join_host: join_host.value,
    join_port: join_port.value
  })
  return false
}
function settings_network(){
  return([
    m('form.host.divider',{onsubmit: submit_host}, [
      m('.text_field.port',[m('label','port'),m("input[type='text']",{oninput: m.withAttr('value',host_port.setValue), value: host_port.value })]),
      m("input[type='submit']",{value: 'Host'})
    ]),
    m('form.join',{onsubmit: submit_join}, [
      m('.text_field.host',[m('label','host'),m("input[type='text']",{oninput: m.withAttr('value',join_host.setValue), value: join_host.value })]),
      m('.text_field.port',[m('label','port'),m("input[type='text']",{oninput: m.withAttr('value',join_port.setValue), value: join_port.value })]),
      m("input[type='submit']",{value: 'Join'})
    ])
  ])
}
//settings_input #######################
var setting = null
var inputs  = store.get('inputs')

function setkey(key){
  return(function(){
    setting = key
  })
}

function inputclass(key){
  if (setting === key) {
    return 'setting'
  } else {
    return ''
  }
}

function inputvalue(key){
  const v = inputs[key]
  if (typeof(v) === 'string' && (v.charAt(1) === 'A' || v.charAt(1) === 'P')){
    return v
  } else {
    return keycode(v)
  }
}

function textfield(key,label){
  return m('tr.text_field',[
    m('td.lbl',label),
    m('td.val',m(".input",{ className: inputclass(key), onclick: setkey(key) }, inputvalue(key) ))
  ])
}

function settings_input(){
 return m('form',[
    m('.p0',
    m('.title','Player 1'),
    m('table',[
     textfield(0,'Up'),
     textfield(1,'Down'),
     textfield(2,'Left'),
     textfield(3,'Right'),
     textfield(4,'A'),
     textfield(5,'B'),
     textfield(6,'L'),
     textfield(7,'R'),
     textfield(8,'Start')
    ])),
    m('.p1',
     m('.title','Player 2'),
     m('table',[
     textfield(9,'Up'),
     textfield(10,'Down'),
     textfield(11,'Left'),
     textfield(12,'Right'),
     textfield(13,'A'),
     textfield(14,'B'),
     textfield(15,'L'),
     textfield(16,'R'),
     textfield(17,'Start')
    ])),
   m('.clear')
 ])
}

function storekey(v){
  let i = inputs.indexOf(v)
  if (i != -1) { inputs[i] = null}
  inputs[setting] = v
  store.set('inputs', inputs)
  ipc.send('controls-update')
  setting = null
  m.redraw()
}

document.onclick = function (e) {
  if (setting != null && e.target.className != 'input setting') {
    setting = null
  }
}

document.onkeydown = function (e) {
  if (setting != null) {
    storekey(e.keyCode)
  }
}

function poll_gamepad(){
  if (setting === null){ return }
  const gg = navigator.getGamepads()
  if (gg[0] === null &&
      gg[1] === null &&
      gg[2] === null &&
      gg[3] === null){ return }
  for(let i = 0; i < gg.length; i++){
    let gamepad = gg[i]
    if (gamepad !== null) {
      for (let ii = 0;  ii < gamepad.buttons.length; ii++) {
        if (gamepad.buttons[ii].value === 1){
          storekey(`${i}PAD${ii}`)
        } // if
      } // for

      for (let ii = 0;  ii < gamepad.axes.length; ii++) {
        let axis = null
        if      (ii % 2 === 0) {
          if     (gamepad.axes[ii]  ===  -1){ axis = 'L' }
          else if(gamepad.axes[ii]  ===   1){ axis = 'R' }
        }
        else if (ii % 2 === 1) {
          if     (gamepad.axes[ii]  ===  -1){ axis = 'U' }
          else if(gamepad.axes[ii]  ===   1){ axis = 'D' }
        }
        if (axis !== null){
          storekey(`${i}AXS${ii}${axis}`)
        }
      } // for

    } // if
  } // for
}

setInterval(function(){
  poll_gamepad()
},100)

//settings_replay ######################
let replay_files = []
let replay_dir   = store.get('replay_dir')
ipc.send('replay-list')
ipc.on('replay-dir',function(event,dir){
  replay_dir = dir
  m.redraw()
})
ipc.on('replay-list',function(event,files){
  replay_files = files
  m.redraw()
})

function click_change_replay_dir(){
  ipc.send('replay-dir-change')
}

function click_reset_replay_dir(){
  ipc.send('replay-dir-reset')
}

function click_replay_play(file){
  return function(){
    ipc.send('replay-load',file)
  }
}

function click_replay_remove(file){
  return function(){
    i = replay_files.indexOf(file)
    replay_files.splice(i, 1)
    ipc.send('replay-delete',file)
  }
}

function settings_replay_items(){
  let items = []
  for (let file of replay_files){
    items.push(m('tr.item',[
      m('td.name', file),
      m('td.date', ''),
      m('td.actions',[
        m('.button.small.replay.icon',{onclick: click_replay_play(file)}, [
          m('span.fa.fa-play'),
          m('span','Replay')
        ]),
        m('.button.small.delete',{onclick: click_replay_remove(file)}, [
          m('span.fa.fa-trash-o')
        ])
      ])
    ]))
  }
  return items
}
function settings_replay(){
  return m('form',[
    m('.text_field.replay_dir',[
      m('label','Replay Folder Location:'),
      m('.input',replay_dir),
      m('.buttons',[
        m('.button.change',{onclick: click_change_replay_dir},'Change'),
        m('.button.reset' ,{onclick: click_reset_replay_dir },'Reset'),
      ]),
      m('.clear')
    ]),
    m('.data-table', m('table',settings_replay_items()))
  ])
}
//settings_audio #######################
audio_sfx_volume = 100
audio_msx_volume = 100
function settings_audio(){
  return m('form',[
    m('.check_box.sfx',[
      m("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_sfx_volume,
        oninput: function(e){
         audio_sfx_volume = e.target.value
        }
      }),
      m('.val',[
        'Sound Effects: ',
        audio_sfx_volume + '%'
      ])
    ]),
    m('.check_box.msx',[
      m("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_msx_volume,
        oninput: function(e){
         audio_msx_volume = e.target.value
        }
      }),
      m('.val',[
        'Music: ',
        audio_msx_volume + '%'
      ])
    ])
  ])
}
//######################################
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
  if      (mode === 'input')  { return m('.content.settings_input'  ,settings_input()   )}
  else if (mode === 'network'){ return m('.content.settings_network',settings_network() )}
  else if (mode === 'audio')  { return m('.content.settings_audio'  ,settings_audio()   )}
  else if (mode === 'replay') { return m('.content.settings_replay' ,settings_replay()  )}
}

const app = {view: function(){
  return [
    nav(),
    content()
  ]
}}
m.mount(document.body, app)
