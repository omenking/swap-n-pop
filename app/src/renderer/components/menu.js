module.exports = function(game) {
  const APP = require('../../../app')('../../../')
  const ComponentMenuCursor = require(APP.path.components('menu_cursor'))(game)
  const {ipcRenderer: ipc} = require('electron')
  
  /** Class representing a menu. */
  return class Menu_Component {
    constructor() {
      this.cursor = new ComponentMenuCursor()
    }
    
    create() {
      this.sprite = game.add.sprite(40*2, 40*2, 'menu');
      this.cursor.create(this, 26*2, 39*2, [
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

    /** starts the mode_puzzle state */
    mode_improve() {
      game.state.start('mode_puzzle',true,false);
    }
    
    mode_option() {
      ipc.send('settings','replay')
    }
  }
}
