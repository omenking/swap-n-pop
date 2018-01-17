import * as m  from 'mithril'
import Ui from 'ui/mode'
import {HOST}  from 'common/data'
import Store  from 'common/store'
const store = new Store()

const state = {
  username: null,
  email: null,
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

function click_cancel(){
  store.delete('auth_token')
  store.delete('username')
  Ui.mode = 'login'
}

function button_submit(){
  return m('.submit',
    m("input[type='submit']",{value: 'Complete Profile'}),
    m('.button.cancel',{onclick: click_cancel},'Log Out')
  )
}

function onsubmit(e){
  e.preventDefault()
  submit()
  return false
}

function submit(){
  const data = { user: {
    username  : state.username,
    email     : state.email
  }}
  m.request({
      method: "PUT",
      url: `${HOST}/api/users/incomplete_update`,
      data: data,
      config: function(xhr) {
        xhr.setRequestHeader('Authorization', store.get('auth_token'))
      }
  }).then(submit_success,submit_error)
}

function submit_success(data){
  store.set('username',data.username)
  Ui.access()
}

function submit_error(errors){
  state.errors = errors
  m.redraw()
}

export function reset(){
  state.username  = null
  state.email     = null
  state.errors    = {}
  m.request({
      method: "GET",
      url: `${HOST}/api/users/incomplete`,
      config: function(xhr) {
        xhr.setRequestHeader('Authorization', store.get('auth_token'))
      }
  }).then(reset_success,reset_error)
}

function reset_success(data){
  state.username = data.username
  state.email    = data.email
}

function reset_error(){
}

export function render(){
  return m('main.signup',
    m('.logo'),
    m('form', {onsubmit: onsubmit},
       input_username(),
       input_email(),
       button_submit()
    )
  )
}

