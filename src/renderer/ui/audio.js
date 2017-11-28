import Ui from '@/ui/mode'
import m  from 'mithril';

let audio_sfx_volume = 100
let audio_msx_volume = 100

function render(){
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

export default render
