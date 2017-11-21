module.exports = function(game) {
  const APP = require('../../../app')('../../../');
  const ComponentPlayfield = require(APP.path.components('playfield'))(game);
  const ComponentMenuPause = require(APP.path.components('menu_pause'))(game);
  const ComponentTimer     = require(APP.path.components('timer'));
  const ComponentStepCounter = require(APP.path.components('step_counter'))(game);
  
  const CoreInputs         = require(APP.path.core('inputs'))(game);
  const seedrandom         = require('seedrandom');
  
  const { UNIT } = require(APP.path.core('data'));
  const PuzzlesModule = require(APP.path.core('puzzles'));
  
  class PuzzleSelectCursor {
    constructor() {
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.confirm = this.confirm.bind(this);
      this.cancel = this.cancel.bind(this);
      this.update = this.update.bind(this);
    }

    create(parent_sprite, x, y) {
      this.x = x;
      this.y = y;
      this.index  = 0;

      this.sprite = game.make.sprite(this.x, this.y + (this.index * UNIT), 'menu_cursor');
      parent_sprite.addChild(this.sprite);
      
      this.map_controls(0);
      this.map_controls(1);
    }

    map_controls(pi) {
      return game.controls.map(pi, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        b    : this.cancel,
        start: this.confirm
      });
    }

    up(tick) {
      if (tick > 0) 
        return;

      console.log(this.index, " should decrease index");
      --this.index;
    }

    down(tick) {
      if (tick > 0) 
        return;
      
      console.log(this.index, " should increase index until limit");
      ++this.index;
    }

    confirm(tick) {
      console.log("select level");
      game.state.start("mode_puzzle", true, false, { chosen_index: this.index });
    }

    cancel(tick) {
      if (tick > 0)
        return; 

      game.state.start("menu");
    }

    update() {
      this.sprite.y = this.y + (this.index * UNIT);
    }
  }

  class PuzzleSelect {
    constructor() {
      this.cursor = new PuzzleSelectCursor()
    }

    create() {
      this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green');
      
      this.sprite = game.add.sprite(10, 40, 'menu_puzzle');

      this.puzzles = new PuzzlesModule()
      this.cursor.create(this.sprite, 26, 39, this.puzzles.puzzle_levels);
    }
 
    update() {
      this.cursor.update()
      game.controls.update();
      this.bg.tilePosition.y -= 0.5;
      this.bg.tilePosition.x += 0.5;
    }

    /** stops controller support */
    shutdown() {
      game.controls.disable()
    }
  }

  class PuzzleMode {
    constructor() {
      this.playfield  = new ComponentPlayfield(0);
      this.menu_pause = new ComponentMenuPause();
      this.timer      = new ComponentTimer(game);
      this.step_display = new ComponentStepCounter();
      this.inputs     = new CoreInputs();
    }

    init(data) {
      this.level_index = data.chosen_index;
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
      this.puzzles = new PuzzlesModule();
      this.change_level(this.puzzles.puzzle_levels[this.level_index++]);

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
    
    /** shuts down the playfield */
    shutdown() {
      game.sounds.stage_music('none');
      this.playfield.shutdown();
    }

    /** changes the current level to the next one from the puzzle array - counters go up */
    change_level(lvl) {
      this.panels = lvl.panels;
      this.steps_left = lvl.steps;
      this.step_display.step_limit = lvl.steps;
    }

    /** stops all control - plays a sound and stops the timer */
    pause() {
      game.sounds.stage_music('pause');
    
      this.state = "pause";
      this.timer.running = false;
      this.menu_pause.pause();
    }

    /** regains control over playfield - plays a sound and timer runs again */
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
      if (this.playfield.stack_is_empty()) {
        if (this.puzzles.puzzle_levels.length === (this.level_index)) {
          game.state.start("menu");
          return;
        }

        this.change_level(this.puzzles.puzzle_levels[this.level_index++]);      
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels, 0);  
      }

      // if over a limit overcrossed reset
      if (this.playfield.swap_counter > this.steps_left) {
        this.playfield.cursor.cursor_swap_history = [];
        this.playfield.reset_stack(this.panels, 0);
      }

      this.tick++;

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
  }

  return {
    PuzzleSelect: PuzzleSelect,
    PuzzleMode: PuzzleMode
  }
}
