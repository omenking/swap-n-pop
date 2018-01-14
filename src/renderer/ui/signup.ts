import * as m  from 'mithril'
import Ui from 'ui/mode'
import {ipcRenderer as ipc} from 'electron'
import {HOST}  from 'core/data'
import Store  from 'common/store'
const store = new Store()

const state = {
  username: null,
  email: null,
  password: null,
  password_confirmation: null,
  errors: {}
}

function field_error(label,key){
  if (state.errors[key]) {
    const arr = []
    for(let i = 0; i < state.errors[key].length; i++){
      arr.push(m('.err_msg', `${label} ${state.errors[key][i]}`) )
    }
    return m('.err',arr)
  }
}
function input_username(){
  return m('.field.text_field',[
    //m('label','Username'),
    m("input[type='text']", {
      placeholder: 'Username',
      onchange: m.withAttr('value',function(val){ state.username = val}),
      value: state.username
    }),
    field_error('Username','username')
  ])
}
function input_email(){
  return m('.field.text_field',[
    //m('label','Email'),
    m("input[type='text']", {
      placeholder: 'Email',
      onchange: m.withAttr('value',function(val){ state.email = val}),
      value: state.email
    }),
    field_error('Email','email')
  ])
}
function input_password(){
  return m('.field.text_field',[
    //m('label','Password'),
    m("input[type='password']", {
      placeholder: 'Password',
      onchange: m.withAttr('value',function(val){ state.password = val}),
      value: state.password
    }),
    field_error('Password','password')
  ])
}
function input_password_confirm(){
  return m('.field.text_field',[
    //m('label','Password Confirm'),
    m("input[type='password']", {
      placeholder: 'Password Confirm',
      onchange: m.withAttr('value',function(val){ state.password_confirmation = val}),
      value: state.password_confirmation
    }),
    field_error('Password Confirm','password_confirmation')
  ])
}

function click_cancel(){
  Ui.mode = 'login'
}

function button_submit(){
  return m('.submit',
    m("input[type='submit']",{value: 'Sign Up'}),
    m('.button.cancel',{onclick: click_cancel},'Cancel')
  )
}

function onsubmit(e){
  e.preventDefault()
  submit()
  return false
}

function submit(){
  const data = { user: {
    username              : state.username,
    email                 : state.email,
    password              : state.password,
    password_confirmation : state.password_confirmation
  }}
  m.request({
      method: "POST",
      url: `${HOST}/api/users`,
      data: data
  }).then(submit_success,submit_error)
}

function submit_success(data){
  store.set('auth_token', data.auth_token)
  store.set('username'  , data.username)
  Ui.access()
}

function submit_error(errors){
  state.errors = errors
  m.redraw()
}

function click_discord(){
  ipc.send('discord')
}

export function reset(){
  state.username              = null
  state.email                 = null
  state.password              = null
  state.password_confirmation = null
  state.errors                = {}
}

export function render(){
  return m('main.signup',
    m('.logo'),
    m('form', {onsubmit: onsubmit},
       m('.connect.discord',{onclick: click_discord},[
         m('span.icon'),
         m('span.name','Connect with Discord')
       ]),
       m('.or',m('span','OR')),
       input_username(),
       input_email(),
       input_password(),
       input_password_confirm(),
       button_submit()
    )
  )
}
