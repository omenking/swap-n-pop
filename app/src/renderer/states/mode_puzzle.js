module.exports = function(game){
  const APP = require('../../../app')('../../../');
  const ComponentPlayfield = require(APP.path.components('playfield'))(game);
  const ComponentMenuPause = require(APP.path.components('menu_pause'))(game);
  const ComponentTimer     = require(APP.path.components('timer'))(game)
  
  const CoreInputs         = require(APP.path.core('inputs'))(game);

  const seedrandom         = require('seedrandom');

  class puzzle_stage {
    /** bindings and object creation of components */
    constructor() {
      this.init      = this.init.bind(this);
      this.create    = this.create.bind(this);
      this.update    = this.update.bind(this);
      this.render    = this.render.bind(this);
      this.shutdown  = this.shutdown.bind(this);

      this.pause     = this.pause.bind(this);
      this.resume    = this.resume.bind(this);

      this.playfield  = new ComponentPlayfield(0);
      this.menu_pause = new ComponentMenuPause();
      this.timer      = new ComponentTimer();
      this.inputs     = new CoreInputs();
    }

    static initClass() {
      this.prototype.rng = null;
      this.prototype.debug = false;
    }

    /**
     * initialises variables, tick counter
     * @param {Array} data all panels assigned for the first stage 
     */
    init(data){
      this.tick   = -1;
      this.seed   = 'puzzle';
      this.cpu    = [false, null];
      this.rng    = seedrandom(this.seed);

      this.level = data.panels;

      // gathered from data
      this.panels = data.panels;
      this.steps_left = 3;

      // exclusive conditions

    }

    /** creates the playfield, menu_pause and timer objects
     *  with certain parameters
     */
    create() {
      this.playfield.create(this, {
        countdown: false,
        push  : false,
        x     : 100,
        y     : 8,
        panels: this.panels
      });

      this.playfield.create_after();

      this.menu_pause.create(this);
      this.timer.create({x: 50, y: 50});
    }

    /** turns on the menu, changes it state, turns of the timer from counting */
    pause(){
      game.sounds.stage_music('pause');

      this.state = "pause";
      this.timer.running = false;
      this.menu_pause.pause();
    }

    /** called by the menu and reassigns control to this playfield, timer runs again */
    resume() {
      game.sounds.stage_music('resume');

      this.state = "running";
      this.timer.running = true;
      this.playfield.cursor.map_controls();      
    }

    /** updates all important objects, especially the inputs
     *  based on the interal tick counter thats increasing
     */
    update() {
      this.tick++;

      if (this.playfield.swap_counter >= this.steps_left || 
          this.playfield.stack_is_empty()) 
        this.playfield.reset_stack(this.panels);

      game.controls.update();
      this.playfield.update();
      this.inputs.update(this.tick);

      this.menu_pause.update();
    }

    /** calls the render functions of the timer and playfield */
    render() {
      this.timer.render();

      if (this.playfield) 
        this.playfield.render();
    }

    /** shuts down the playfield */
    shutdown(){
      game.sounds.stage_music('none');
      this.playfield.shutdown();
    }
  }
  puzzle_stage.initClass();

  return puzzle_stage;
}
