module.exports = function(game) {
  const APP = require('../../../app')('../../../');
  const ComponentPlayfield = require(APP.path.components('playfield'))(game);
  const ComponentMenuPause = require(APP.path.components('menu_pause'))(game);
  const ComponentTimer     = require(APP.path.components('timer'))(game);
  const ComponentStepCounter = require(APP.path.components('step_counter'))(game);

  const CoreInputs         = require(APP.path.core('inputs'))(game);
  const {all_levels}       = require(APP.path.core('puzzles'));
  
  const seedrandom         = require('seedrandom');

  class puzzle_stage {
    /** bindings and object creation of components */
    constructor() {
      this.create    = this.create.bind(this);
      this.update    = this.update.bind(this);
      this.render    = this.render.bind(this);
      this.shutdown  = this.shutdown.bind(this);

      this.pause     = this.pause.bind(this);
      this.resume    = this.resume.bind(this);
      this.change_level = this.change_level.bind(this);

      this.playfield  = new ComponentPlayfield(0);
      this.menu_pause = new ComponentMenuPause();
      this.timer      = new ComponentTimer();
      this.step_display = new ComponentStepCounter();
      this.inputs     = new CoreInputs();
    }

    static initClass() {
      this.prototype.rng = null;
      this.prototype.debug = false;
    }

    /**
     * changes the panels and steps according to a given level
     * @param {object} lvl contains an array of panels and the amt of steps the puzzle has 
     */
    change_level(lvl) {
      this.panels = lvl.panels;
      this.steps_left = lvl.steps;
      this.step_display.step_limit = lvl.steps;
    }

    /** creates the playfield, menu_pause and timer objects
     *  with certain parameters
     */
    create() {
      this.tick   = -1;
      this.seed   = 'puzzle';
      this.cpu    = [false, null];
      this.rng    = seedrandom(this.seed);

      // gathered from level puzzle data
      this.change_level(all_levels.level1);

      this.playfield.create(this, {
        countdown: false,
        push  : false,
        x     : 100,
        y     : 8,
        panels: this.panels
      });

      this.playfield.create_after();
      this.playfield.cursor.mode = "puzzle";

      this.menu_pause.create(this);
      this.timer.create({x: 50, y: 50});
      this.step_display.create({ playfield: this.playfield, step_limit: this.steps_left });
    }

    /** turns on the menu, changes it state, turns of the timer from counting */
    pause() {
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
      this.playfield.cursor.map_controls("puzzle");      
    }

    /** updates all important objects, especially the inputs
     *  based on the interal tick counter thats increasing
     */
    update() {
      this.tick++;

      if (this.playfield.stack_is_empty()) {
        this.change_level(all_levels.level2);      
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels);  
      }

      // if over a limit overcrossed reset
      if (this.playfield.swap_counter > this.steps_left) {
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels);
      }

      game.controls.update();
      this.playfield.update();
      this.inputs.update(this.tick);

      this.menu_pause.update();
    }

    /** calls the render functions of the timer and playfield */
    render() {
      this.timer.render();
      this.step_display.render();

      if (this.playfield) 
        this.playfield.render();
    }

    /** shuts down the playfield */
    shutdown() {
      game.sounds.stage_music('none');
      this.playfield.shutdown();
    }
  }
  puzzle_stage.initClass();

  return puzzle_stage;
}
