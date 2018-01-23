import Ui            from 'ui/mode'
import * as m        from 'mithril'
import * as electron from 'electron'
import Store         from 'common/store'
import * as keycode  from 'keycode'

const store = new Store()

const {ipcRenderer: ipc} = electron
let setting = null
let inputs  = store.get('inputs')

declare var window: {
  document: any,
  navigator: any,
}

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

function render(){
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

    m('.simulate',
     m('.title','Simulation'),
     m('table',[
     textfield(18,'Stop/Play'),
     textfield(19,'Step Forward'),
     textfield(20,'Step Backward')
    ])),

    m('.other',
     m('.title','Other'),
     m('table',[
     textfield(21,'Fullscreen'),
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

window.document.onclick = function (e) {
  if (setting != null && e.target.className != 'input setting') {
    setting = null
  }
}

window.document.onkeydown = function (e) {
  if (e.keyCode === 27) { //esc
    if (Ui.mode === false) {
      Ui.show()
    } else {
      Ui.close()
    }
    m.redraw()
  }

  if (setting != null) {
    storekey(e.keyCode)
  }
}

function poll_gamepad(){
  if (setting === null){ return }
  const gg = window.navigator.getGamepads()
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

export default render
