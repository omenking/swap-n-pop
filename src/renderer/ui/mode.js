const {remote} = require('electron')
let mode = remote.getCurrentWindow().custom.mode
class UiMode {
  close(){
    mode = false
    document.getElementById('game').classList.remove('hide')
  }
  show(){
    mode = 'input'
    document.getElementById('game').classList.add('hide')
  }
  get mode(){
    return mode
  }
  set mode(v){
    mode = v
  }
}
const klass = new UiMode()

export default klass
