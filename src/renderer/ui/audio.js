import m from 'mithril';

module.exports = function(Ui){
  audio_sfx_volume = 100
  audio_msx_volume = 100
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

  return render
}
