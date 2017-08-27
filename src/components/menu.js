module.exports = function(game){
  const {PUZZLE} = require('./../core/data')
  const ComponentMenuCursor = require('./menu_cursor')(game)
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
    }
    create() {
      this.sprite = game.add.sprite(40, 40, 'menu');
      console.log('Cursor',this.cursor)
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
      return game.state.start('mode_1p_vs_2p_local');
    }
    mode_1p_vs_2p_online() {
      return game.state.start('mode_1p_vs_2p_online');
    }
    mode_1p_vs_cpu() {
      return game.state.start('mode_1p_vs_cpu');
    }
    mode_improve() {
      return game.state.start('mode_puzzle',true,false,
        PUZZLE.skill_chain_demo_2.demo_4
      );
    }
    mode_option() {}
  };

  return controller
}
