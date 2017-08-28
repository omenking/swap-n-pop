module.exports = function(game){
  const {PUZZLE} = require('./../core/data')
  const ComponentMenuCursor = require('./menu_cursor')(game)
  const {ipcRenderer: ipc} = require('electron')
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.mode_1p_vs_2p_local = this.mode_1p_vs_2p_local.bind(this);
      this.mode_1p_vs_2p_online = this.mode_1p_vs_2p_online.bind(this);
      this.mode_1p_vs_cpu = this.mode_1p_vs_cpu.bind(this);
      this.mode_improve = this.mode_improve.bind(this);
      this.mode_option = this.mode_option.bind(this);
      this.cursor = new ComponentMenuCursor();
      ipc.on('play-vs', (event, {seed}) => {
        return game.state.start('mode_vs',true,false, {seed: seed})
      })
      ipc.on('replay-load', (event, {seed,inputs}) => {
        return game.state.start('mode_vs',true,false, {seed: seed, inputs: inputs})
      })
    }
    create() {
      this.sprite = game.add.sprite(40, 40, 'menu');
      return this.cursor.create(this, 26, 39, [
        this.mode_1p_vs_2p_local,
        this.mode_1p_vs_2p_online,
        this.mode_1p_vs_cpu,
        this.mode_improve,
        this.mode_option
      ]);
    }
    update() {
      return this.cursor.update();
    }
    mode_1p_vs_2p_local() {
      ipc.send('play-vs');
    }
    mode_1p_vs_2p_online() {
      ipc.send('play-vs');
    }
    mode_1p_vs_cpu() {
      ipc.send('play-vs');
    }
    mode_improve() {
      return game.state.start('mode_puzzle',true,false,
        PUZZLE.skill_chain_demo_2.demo_4
      );
    }
    mode_option() {
      ipc.send('replay-load')
    }
  };

  return controller
}
