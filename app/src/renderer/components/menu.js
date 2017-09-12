module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {PUZZLE} = require(APP.path.core('data'))
  const ComponentMenuCursor = require(APP.path.components('menu_cursor'))(game)
  const {ipcRenderer: ipc} = require('electron')

  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.mode_1p_vs_2p_local  = this.mode_1p_vs_2p_local.bind(this)
      this.mode_1p_vs_2p_online = this.mode_1p_vs_2p_online.bind(this)
      this.mode_1p_vs_cpu       = this.mode_1p_vs_cpu.bind(this)
      this.mode_improve         = this.mode_improve.bind(this)
      this.mode_option          = this.mode_option.bind(this)

      this.cursor = new ComponentMenuCursor()
    }
    create() {
      this.sprite = game.add.sprite(40, 40, 'menu');
      this.cursor.create(this, 26, 39, [
        this.mode_1p_vs_2p_local,
        this.mode_1p_vs_2p_online,
        this.mode_1p_vs_cpu,
        this.mode_improve,
        this.mode_option
      ]);
    }
    update() {
      this.cursor.update()
    }
    mode_1p_vs_2p_local() {
      ipc.send('play-vs',{online: false, cpu: [false,false]})
    }
    mode_1p_vs_2p_online() {
      ipc.send('settings','network')
    }
    mode_1p_vs_cpu() {
      ipc.send('play-vs',{online: false, cpu: [false,true]})
    }
    mode_improve() {
      game.state.start('mode_puzzle',true,false,{
        panels: PUZZLE.skill_chain_demo_2.demo_4,
        cpu: [false,null]
      })
    }
    mode_option() {
      ipc.send('settings','replay')
    }
  };

  return controller
}
