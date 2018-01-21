import * as m  from 'mithril'
import * as electron from 'electron'
const {remote} = electron
import controls from 'core/controls'
import {reset as StateResetForgot}     from 'ui/forgot'
import {reset as StateResetLogin}      from 'ui/login'
import {reset as StateResetSignup}     from 'ui/signup'
import {reset as StateResetIncomplete} from 'ui/incomplete'

let mode = remote.getCurrentWindow().custom.mode
class UiMode {
  close(){
    if(mode === 'login' ){ return }
    if(mode === 'signup'){ return }
    if(mode === 'forgot'){ return }
    if(mode === 'incomplete'){ return }
    controls.start()
    mode = false
    document.getElementById('game').classList.remove('hide')
  }
  show(mode){
    controls.stop()
    this.mode = mode
    document.getElementById('game').classList.add('hide')
    m.redraw()
  }
  access(){
    controls.start()
    mode = false
    document.getElementById('game').classList.remove('hide')
    m.redraw()
  }
  get mode(){
    return mode
  }
  set mode(v){
    if     (v === 'login')     { StateResetLogin()}
    else if(v === 'signup')    { StateResetSignup()}
    else if(v === 'forgot')    { StateResetForgot()}
    else if(v === 'incomplete'){ StateResetIncomplete()}
    mode = v
  }
}
const klass = new UiMode()

export default klass
