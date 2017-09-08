module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const Stack  = require(APP.path.core('stack'))(game)
  const ComponentPlayfield = require(APP.path.components('playfield'))(game)
  const CoreInputs         = require(APP.path.core('inputs'))(game)
  const {ipcRenderer: ipc} = require('electron')
  const seedrandom         = require('seedrandom')

  class controller {
    constructor() {
      this.init     = this.init.bind(this)
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.create_bg = this.create_bg.bind(this);
      this.create_frame = this.create_frame.bind(this);
      this.pause = this.pause.bind(this);
      this.resume = this.resume.bind(this);
      this.game_over = this.game_over.bind(this);
      this.danger_check = this.danger_check.bind(this);
      this.playfield1 = new ComponentPlayfield(0);
      this.playfield2 = new ComponentPlayfield(1);
    }

    static initClass() {
      this.prototype.rng = null
      this.prototype.debug = false
    }
    init(data){
      this.tick   = -1
      this.seed   = data.seed
      this.online = data.online
      this.rng    = seedrandom(this.seed)
      this.inputs = new CoreInputs(data.inputs)
    }
    create_bg() {
      this.bg = game.add.sprite(-89,0, 'playfield_vs_bg');
    }
    create_frame(offset){
      this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
    }
    create() {
      game.stage.backgroundColor = 0x000000

      this.danger = false

      const offset = 0;
      this.create_bg()

      const stack = new Stack(this.rng)
      stack.create()

      this.playfield1.create(this, {push: true, x: offset+8  , y: 24, panels: stack.panels});
      this.playfield2.create(this, {push: true, x: offset+152, y: 24, panels: stack.panels});
      this.create_frame(offset);
      this.playfield1.create_after();
      this.playfield2.create_after();
    }

    pause(pi){
      game.sounds.stage_music('pause')
      this.playfield1.pause(pi)
      this.playfield2.pause(pi)
    }
    resume() {
      game.sounds.stage_music('resume')
      this.playfield1.resume()
      this.playfield2.resume()
    }
    game_over() {
      ipc.send('replay-save', {seed: this.seed, inputs: this.inputs.serialize});
      game.sounds.stage_music('results')
      this.playfield1.game_over()
      this.playfield2.game_over()
    }
    danger_check() {
      const d1 = this.playfield1.is_danger(1);
      const d2 = this.playfield2.is_danger(2);

      if (d1 || d2) {
        if (this.danger === false) {
          game.sounds.stage_music('danger');
        }
        return this.danger = true;
      } else {
        if (this.danger === true) {
          game.sounds.stage_music('active');
        }
        return this.danger = false
      }
    }
    update() {
      this.tick++
      game.controls.update()
      this.playfield1.update()
      this.playfield2.update()
      this.danger_check()
      this.inputs.update(this.tick)
    }
    render(){
      if(this.debug){
        debugger
      }
      if (this.playfield1) { this.playfield1.render() }
      if (this.playfield2) { this.playfield2.render() }
    }
    shutdown() {
      game.sounds.stage_music('none')
      this.playfield1.shutdown()
    }
  }
  controller.initClass()

  return controller
}
