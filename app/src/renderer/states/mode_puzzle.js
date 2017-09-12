module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentPlayfield = require(APP.path.components('playfield'))(game)
  class controller {
    constructor() {
      this.init   = this.init.bind(this);
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.stage_music = this.stage_music.bind(this);
      this.playfield = new ComponentPlayfield(1);
    }
    init(data){
      this.panels = data
    }
    create() {
      game.stage.backgroundColor = 0xFFFFFF;
      this.playfield.create(this, {
        push  : false,
        x     : 40,
        y     : 8,
        panels: this.panels
      }
      );

      return this.playfield.create_after();
    }
    update() {
      game.controls.update()
      this.playfield.update();
      this.playfield.render();
    }
    stage_music(state){}
  }
  return controller
}
