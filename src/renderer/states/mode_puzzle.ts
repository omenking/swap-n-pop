import seedrandom           from 'seedrandom'
import game                 from 'core/game'
import CoreInputs           from 'core/inputs'
import Puzzles              from 'core/puzzles'
import ComponentPlayfield   from 'components/playfield'
import ComponentMenuPause   from 'components/menu_pause'
import ComponentTimer       from 'components/timer'
import ComponentStepCounter from 'components/step_counter'
import data                 from 'core/data'
import filters              from 'core/filters'

const { UNIT } = data
const { px }   = filters


/* run by phaser state.start */
export default class ModePuzzle {
  private playfield    : ComponentPlayfield
  private menu_pause   : ComponentMenuPause
  private timer        : ComponentTimer
  private step_display : ComponentStepCounter
  private inputs       : CoreInputs
  private puzzles      : Puzzles
  private tick         : number
  private seed         : string
  private cpu          : Array<boolean>
  private rng          : any
  private steps        : number
  private panels       : Array<number>
  private level_index  : number
  private steps_left   : number
  private state        : string
  constructor() {
    this.playfield    = new ComponentPlayfield(0)
    this.menu_pause   = new ComponentMenuPause()
    this.timer        = new ComponentTimer(game)
    this.step_display = new ComponentStepCounter()
    this.inputs       = new CoreInputs()
  }

  init(data) {
    this.level_index = data.chosen_index;
  }

  /** creates the playfield, menu_pause and timer objects
   *  with certain parameters
   */
  create() {
    game.add.sprite(0, 0, "mode_puzzle_bg")

    this.tick   = -1
    this.seed   = 'puzzle'
    this.cpu    = [false, null]
    this.rng    = seedrandom(this.seed)

    // gathered from level puzzle data
    this.puzzles = new Puzzles()
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
    this.timer.create(25,30);
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
