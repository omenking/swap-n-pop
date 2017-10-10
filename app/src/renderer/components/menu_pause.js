module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentMenuPauseCursor = require(APP.path.components('menu_pause_cursor'))(game)

  /** A Menu_pause handles the pausing of a stage
   *  new controls are provided to move in the menu and use various options
   */
  class Menu_pause {
    /** bindings & new menu cursor created */
    constructor() {
      this.create = this.create.bind(this);
      this.cancel = this.cancel.bind(this);
      this.continue = this.continue.bind(this);
      this.pause = this.pause.bind(this);
      this.update = this.update.bind(this);
      
      this.cursor = new ComponentMenuPauseCursor();
    }

    /**
     * pausing turned of normally
     * add a sprite to this object but turn it off for now
     * create a cursor with no controls provided yet 
     * @param {mode_vs} stage reference to call both playfields 
     */
    create(stage){
      this.paused = false;

      this.stage = stage;

      // for now playfield.x changed to a value
      this.sprite = game.add.sprite(100 + 4, 100, 'menu_pause');
      this.sprite.visible = false;

      // create a controller with this menu given as a reference, push 2 methods of the menu
      return this.cursor.create(this, 8, 8, [
        this.continue,
        this.cancel
      ]);
    }

    /** leave the game */
    cancel() {
      game.state.start('menu');
    }

    /** called through cursor, unpauses the menu and turns of the sprite again
     * also calls the mode_vs||stage resume method which will return new cursor controls
     */
    continue() {
      this.paused         = false;
      this.sprite.visible = false;
      this.stage.resume();
    }

    /** unpauses update method of the menu, 
     * make this object visible and 
     * reassigns controls to both playfields registered players */
    pause(){
      this.paused = true;
      this.sprite.visible = true;

      if (this.stage.playfield1 !== undefined &&
          this.stage.playfield2 !== undefined) {
        // give player control
        this.cursor.map_controls(this.stage.playfield1.pi);
        // below possibly gives 2nd player controls of the menu (didnt test, but didnt break p1.pi control)
        this.cursor.map_controls(this.stage.playfield2.pi);
      }
      else {
        this.cursor.map_controls(this.stage.playfield.pi);
      }
    }

    /** once unpaused the menu will update its cursor */
    update() {
      if (!this.paused) 
        return; 

      // check for any Input and if any pressed - continue or cancel may be called here
      this.cursor.update();
    }
  }

  return Menu_pause;
}
