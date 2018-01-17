import * as m  from 'mithril'
import Ui from 'ui/mode'
import {ipcRenderer as ipc} from 'electron'
import {HOST}  from 'common/data'
import Store  from 'common/store'
const store = new Store()

const state = {
  email: null,
  password: null,
  errors: {}
}



function field_error(key){
  if (state.errors[key]) {
    const arr = []
    for(let i = 0; i < state.errors[key].length; i++){
      arr.push(m('.err_msg', `${state.errors[key][i]}`) )
    }
    return m('.err',arr)
  }
}


function input_email(){
  return m('.field.text_field',
    m("input[type='text']", {
      placeholder: 'Username or Email',
      onchange: m.withAttr('value',function(val){ state.email = val}),
      value: state.email
  }))
}
function input_password(){
  return m('.field.text_field',
    m("input[type='password']", {
      placeholder: 'Password',
      onchange: m.withAttr('value',function(val){ state.password = val}),
      value: state.password
    }),
    field_error('user_authentication')
  )
}

function onsubmit(e){
  e.preventDefault()
  submit()
  return false
}

function submit(){
  const data = {
    email   : state.email,
    password: state.password
  }
  m.request({
      method: "POST",
      url: `${HOST}/api/users/auth`,
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

function button_submit(){
  return m('.submit',
    m("input[type='submit']",{value: 'Log In'}),
    forgot()
  )
}

function forgot(){
  return m('.forgot', {onclick: click_forgot}, 'Forgot My Password')
}

function click_forgot(){
  Ui.mode = 'forgot'
}

function click_signup(){
  Ui.mode = 'signup'
}

function no_account(){
  return m('.signup',{ onclick: click_signup },
   m('span', "Don't have an account?"),
   m('span.action', 'Sign Up')
      )
}

function click_skip(){
  Ui.access()
}

function skip(){
  return m('.skip',{onclick: click_skip},'Skip this, I want to play offline >>')
}

function click_discord(){
  ipc.send('discord')
}

export function reset(){
  state.email    = null
  state.password = null
  state.errors   = {}
}

export function render(){
  return m('main.login',
    m('.logo'),
    m('form', {onsubmit: onsubmit},
       m('.connect.discord',{onclick: click_discord},[
         m('span.icon'),
         m('span.name','Connect with Discord')
       ]),
       m('.or',m('span','OR')),
       input_email(),
       input_password(),
       button_submit()
    ),
    no_account(),
    skip()
  )
}
