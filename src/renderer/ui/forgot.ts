import * as m  from 'mithril'
import Ui from 'ui/mode'
import {HOST}  from 'common/data'

const SEND  = 'form_send'
const CODE  = 'code'
const RESET = 'form_reset'
const state = {
  email: null,
  code: null,
  password: null,
  password_confirmation: null,
  state: SEND,
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
function input_code(){
  return m('.field.text_field',[
    //m('label','Email'),
    m("input[type='text']", {
      placeholder: 'Code',
      onchange: m.withAttr('value',function(val){ state.code = val}),
      value: state.code
    }),
    field_error('Send Code','code')
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
}

function onsubmit(callback){
  return function(e){
    e.preventDefault()
    callback()
    return false
  }
}

class Send {
  static content(){
    return m('form', {onsubmit: onsubmit(Send.submit)},
      input_email(),
      Send.button_submit()
    )
  }
  static button_submit(){
    return m('.submit',
      m("input[type='submit']",{value: 'Email Reset Password'}),
      m('.button.cancel',{onclick: click_cancel},'Cancel')
    )
  }
  static submit(){
    const data = {
      email : state.email
    }
    m.request({
        method: "POST",
        url: `${HOST}/reset_passwords`,
        data: data
    }).then(Send.success,Send.error)
  }
  static success(data){
    state.state = CODE
  }
  static error(errors){
    state.errors = errors
    m.redraw()
  }
}

class Code {
  static content(){
    return m('form', {onsubmit: onsubmit(Code.submit)},
      input_code(),
      Code.button_submit()
    )
  }
  static button_submit(){
    return m('.submit',
      m("input[type='submit']",{value: 'Cofirm Code'}),
      m('.button.cancel',{onclick: click_cancel},'Cancel')
    )
  }
  static submit(){
    const data = {
      email : state.email
    }
    m.request({
        method: "POST",
        url: `${HOST}/reset_passwords/confirm`,
        data: data
    }).then(Code.success,Code.error)
  }
  static success(data){
    state.state = RESET
  }
  static error(errors){
    state.errors = errors
    m.redraw()
  }
}

class Reset {
  static content(){
    return m('form', {onsubmit: onsubmit(Reset.submit)},
      input_password(),
      input_password_confirm(),
      Reset.button_submit()
    )
  }
  static submit(){
    const data = {
      email : state.email
    }
    m.request({
        method: "PUT",
        url: `${HOST}/reset_passwords`,
        data: data
    }).then(Reset.success,Reset.error)
  }
  static button_submit(){
    return m('.submit',
      m("input[type='submit']",{value: 'Update Password'}),
      m('.button.cancel',{onclick: click_cancel},'Cancel')
    )
  }
  static success(data){
  }
  static error(errors){
    state.errors = errors
    m.redraw()
  }
}

function content(){
  if      (state.state === SEND ){ return Send.content() }
  else if (state.state === CODE ){ return Code.content() }
  else if (state.state === RESET){ return Reset.content()}
}

export function reset(){
  state.email                 = null
  state.code                  = null
  state.password              = null
  state.password_confirmation = null
  state.state                 = SEND
  state.errors                = {}
}

export function render(){
  return m('main.signup',
    m('.logo'),
    content()
  )
}
