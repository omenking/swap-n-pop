const m = require('../node_modules/mithril/mithril.min.js')
const {ipcRenderer: ipc} = require('electron')
const Store = require('electron-store')
const store = new Store()
const keycode = require('keycode')

var mode    = 'input'

//settings_network #####################
var host_port = {value: 40001      , setValue: function(v) {host_port.value = v}}
var join_host = {value: '127.0.0.1', setValue: function(v) {join_host.value = v}}
var join_port = {value: 40001      , setValue: function(v) {join_port.value = v}}

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

function textfield(key,label){
  return m('tr.text_field',[
    m('td.lbl',label),
    m('td.val',m(".input",{ className: inputclass(key), onclick: setkey(key) }, keycode(inputs[key])))
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

document.onclick = function (e) {
  if (setting != null && e.target.className != 'input setting') {
    setting = null
  }
}

document.onkeydown = function (e) {
  if (setting != null) {
    let i = inputs.indexOf(e.keyCode)
    if (i != -1) {
      inputs[i] = null
    }
    inputs[setting] = e.keyCode
    store.set('inputs', inputs)
    ipc.send('controls-update')
    setting = null
    m.redraw()
  }
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
    m('.clear')
  ])
}
function content(){
  if      (mode === 'input'){   return settings_input()}
  else if (mode === 'network'){ return settings_network()}
}

const app = {view: function(){
  return [
    nav(),
    content()
  ]
}}
m.mount(document.body, app)
