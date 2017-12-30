import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import controls             from 'core/controls'
import CountdownState       from 'core/countdown_state'
import CoreInputs           from 'core/inputs'
import CoreStage            from 'core/stage'
import puzzles              from 'core/puzzles'
import ComponentPlayfield   from 'components/playfield'
import ComponentMenuPause   from 'components/menu_pause'
import ComponentTimer       from 'components/timer'
import ComponentStepCounter from 'components/step_counter'

import {
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'core/data';

/* run by phaser state.start */
export default class ModePuzzle extends CoreStage {
  private playfield0    : ComponentPlayfield
  private menu_pause   : ComponentMenuPause
  private timer        : ComponentTimer
  private step_display : ComponentStepCounter
  private inputs       : CoreInputs
  private tick         : number
  private seed         : string
  private cpu          : Array<boolean>
  private rng          : any
  private steps        : number
  private panels       : Array<number>
  private level_index  : number
  private steps_left   : number
  private bg           : Phaser.Sprite

  constructor() {
    super()
    this.playfield0    = new ComponentPlayfield(0)
    this.menu_pause   = new ComponentMenuPause()
    this.timer        = new ComponentTimer()
    this.step_display = new ComponentStepCounter()
    this.inputs       = new CoreInputs(undefined,undefined,undefined)
    this.countdown    = new CountdownState()
  }

  get name(): string {
    return 'mode_puzzle';
  }

  init(data) {
    this.level_index = data.chosen_index;
  }

  /** creates the playfield, menu_pause and timer objects
   *  with certain parameters
   */
  create() {
    this.bg = game.add.sprite(0, 0, "mode_puzzle_bg")
    this.bg.anchor.setTo(0.5, 0);

    this.tick   = -1
    this.seed   = 'puzzle'
    this.cpu    = [false, null]
    this.rng    = seedrandom(this.seed)

    // gathered from level puzzle data
    this.change_level(puzzles[this.level_index++]);

    this.playfield0.create(this, {
      countdown: false,
      push  : false,
      x     : 320,
      y     : 80,
      panels: this.panels
    });

    this.countdown.create(true,this.playfield_cursor_entrance.bind(this))
    this.playfield0.create_after()
    this.playfield0.cursor.mode = "puzzle"
    this.playfield0.character.sprite.visible = false

    this.menu_pause.create(this);
    this.timer.create(this,180, 60);
    this.step_display.create({ playfield: this.playfield0, step_limit: this.steps_left, x: 575, y: 85 });
  }

  playfield_cursor_entrance(){
    this.playfield0.cursor.entrance()
  }

  /** shuts down the playfield0 */
  shutdown() {
    game.sounds.stage_music('none');
    this.playfield0.shutdown();
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

    this.state = PAUSE;
    this.timer.running = false;
    this.menu_pause.pause();
  }

  /** regains control over playfield0 - plays a sound and timer runs again */
  resume() {
    if (this.countdown.state === DONE){
      game.sounds.stage_music('resume');
      this.state = RUNNING
      this.timer.running = true;
    }
    this.playfield0.cursor.map_controls()
  }

  /** updates all important objects, especially the inputs
   *  based on the interal tick counter thats increasing
   */
  update() {
    if (this.playfield0.stack_is_empty()) {
      if (puzzles.length === (this.level_index)) {
        game.state.start("menu");
        return;
      }

      this.change_level(puzzles[this.level_index++]);
      this.playfield0.cursor.cursor_swap_history = [];
      this.playfield0.reset_stack(this.panels, 0);
    }

    // if over a limit overcrossed reset
    if (this.playfield0.swap_counter > this.steps_left) {
      this.playfield0.cursor.cursor_swap_history = [];
      this.playfield0.reset_stack(this.panels, 0);
    }

    this.tick++;

    this.countdown.update()
    controls.update()
    this.playfield0.update()
    this.inputs.update(this.tick,undefined)
    this.menu_pause.update()
  }

  /** calls the render functions of the timer and playfield0 */
  render() {
    this.bg.x = game.world.centerX
    this.timer.render()
    this.step_display.render()

    if (this.playfield0)
      this.playfield0.render()
  }
}
