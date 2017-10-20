module.exports = function(game) {
  const APP = require('../../../app')('../../../');
  const ComponentPlayfield = require(APP.path.components('playfield'))(game);
  const ComponentMenuPause = require(APP.path.components('menu_pause'))(game);
  const ComponentTimer     = require(APP.path.components('timer'));
  const ComponentStepCounter = require(APP.path.components('step_counter'))(game);
  
  const CoreInputs         = require(APP.path.core('inputs'))(game);
  const seedrandom         = require('seedrandom');
  
  const PuzzlesModule = require(APP.path.core('puzzles'));
  
  return class PuzzleMode {
    constructor() {
      this.playfield  = new ComponentPlayfield(0);
      this.menu_pause = new ComponentMenuPause();
      this.timer      = new ComponentTimer(game);
      this.step_display = new ComponentStepCounter();
      this.inputs     = new CoreInputs();
    }

    /** creates the playfield, menu_pause and timer objects
     *  with certain parameters
     */
    create() {
      game.add.sprite(0, 0, "mode_puzzle_bg");

      this.tick   = -1;
      this.seed   = 'puzzle';
      this.cpu    = [false, null];
      this.rng    = seedrandom(this.seed);

      // gathered from level puzzle data
      this.level_index = 0;
      this.asd = new PuzzlesModule();
      this.change_level(this.asd.puzzle_levels[this.level_index++]);

      this.playfield.create(this, {
        countdown: false,
        push  : false,
        x     : 88,
        y     : 40,
        panels: this.panels
      });

      this.playfield.create_after();
      this.playfield.cursor.mode = "puzzle";

      this.menu_pause.create(this);
      this.timer.create({x: 25, y: 30});
      this.step_display.create({ playfield: this.playfield, step_limit: this.steps_left });
    }

    /** updates all important objects, especially the inputs
     *  based on the interal tick counter thats increasing
     */
    update() {
      this.tick++;

      if (this.playfield.stack_is_empty()) {
        this.change_level(this.asd.puzzle_levels[this.level_index++]);      
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels, 0);  
      }

      // if over a limit overcrossed reset
      if (this.playfield.swap_counter > this.steps_left) {
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels, 0);
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

    change_level(lvl) {
      this.panels = lvl.panels;
      this.steps_left = lvl.steps;
      this.step_display.step_limit = lvl.steps;
    }

    pause() {
      game.sounds.stage_music('pause');
    
      this.state = "pause";
      this.timer.running = false;
      this.menu_pause.pause();
    }

    resume() {
      game.sounds.stage_music('resume');
    
      this.state = "running";
      this.timer.running = true;
      this.playfield.cursor.map_controls("puzzle");      
    }
  }
}
