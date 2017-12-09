import Ui from 'ui/mode'
import m  from 'mithril'

let audio_sfx_volume = 100
let audio_msx_volume = 100
let muted            = false

function render(game){ 
  return m('form',[
    m('.check_box.sfx',[
      m("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_sfx_volume,
        oninput: function(e){
          audio_sfx_volume = e.target.value
          game.sounds.set_sfx_volume(audio_sfx_volume * 0.01)
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
          game.sounds.set_msx_volume(audio_msx_volume * 0.01)
        }
      }),
      m('.val',[
        'Music: ',
        audio_msx_volume + '%'
      ])
    ]),

    m('.check_box.mute', [
      m("input[type='checkbox']", {
        checked: muted,
        onclick: function(e) { 
          muted = !muted;
          game.sounds.mute_all(muted);
        }
      }),
      m('.val', ['Mute all Audio'])
    ])

  ])
}

export default render
