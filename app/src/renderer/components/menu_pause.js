module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentMenuPauseCursor = require(APP.path.components('menu_pause_cursor'))(game)

  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.cancel = this.cancel.bind(this);
      this.continue = this.continue.bind(this);
      this.pause = this.pause.bind(this);
      this.update = this.update.bind(this);
      
      this.cursor = new ComponentMenuPauseCursor();
    }

    create(stage){
      this.paused = false;
      this.stage = stage;

      // for now playfield.x changed to a value
      this.sprite = game.add.sprite(100 + 4, 100, 'menu_pause');
      this.sprite.visible = false;
      return this.cursor.create(this, 8, 8, [
        this.continue,
        this.cancel
      ]);
    }

    cancel() {
      this.paused = false
      game.state.start('menu')
    }

    continue() {
      this.paused         = false;
      this.sprite.visible = false;

      console.log("testing stage resume call inside menu");
      
      // fill with no player control
      this.cursor.map_controls();
    }

    pause(){
      this.paused = true;
      this.sprite.visible = true;
      
      // give player control
      this.cursor.map_controls(this.stage.playfield1);
    }

    update() {
      if (!this.paused) 
        return; 

      this.cursor.update();
    }
  }

  return controller
}
