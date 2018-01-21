import * as m from 'mithril'

import game   from 'core/game'
import Ui     from 'ui/mode'
import Store  from 'common/store'

const store = new Store()

let audio_sfx_volume: number = 100
let audio_msx_volume: number = 100
let muted: boolean = false

let audio_settings = store.get("audio")
if (audio_settings !== undefined) {
  audio_sfx_volume = audio_settings[0]
  audio_msx_volume = audio_settings[1]
  muted = audio_settings[2]
}

export default function render() { 
  return m('form',[
    m('.check_box.sfx',[
      m("input[type='range']",{
        min:"0",
        max:"100",
        value: audio_sfx_volume,

        // registered when click is over
        onclick: function() {
          store.set("audio", [
            audio_sfx_volume,
            audio_msx_volume,
            muted
          ])
        },

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
        // registered when click is over
        onclick: function() {
          store.set("audio", [
            audio_sfx_volume,
            audio_msx_volume,
            muted
          ])
        },

        oninput: function(e){
          audio_msx_volume = e.target.value
          game.sounds.set_msx_volume(audio_msx_volume * 0.01)
        },
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
          store.set("audio", [
            audio_sfx_volume,
            audio_msx_volume,
            muted
          ])
        }
      }),
      m('.val', ['Mute all Audio'])
    ])
  ])
}
