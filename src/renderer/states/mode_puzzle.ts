import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import controls             from 'core/controls'
import CountdownState       from 'core/countdown_state'
import CoreInputs           from 'core/inputs'
import CoreStage            from 'core/stage'
import puzzles              from 'core/puzzles'
import ComponentStepCounter from 'components/step_counter'

import {
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'common/data';

/* run by phaser state.start */
export default class ModePuzzle extends CoreStage {
  get [Symbol.toStringTag](){ return 'ModePuzzle' }
  get name(): string { return 'mode_puzzle' }

  private step_display : ComponentStepCounter
  private steps        : number
  private panels       : Array<number>
  private level_index  : number
  private steps_left   : number

  constructor() {
    super()
    this.step_display = new ComponentStepCounter()
  }

  public init(data) {
    this.seed        = 'puzzle'
    this.inputs      = new CoreInputs(undefined,undefined,undefined)
    this.level_index = data.chosen_index
    super.init(data)
  }

  /** creates the playfield, menu_pause and timer objects
   *  with certain parameters
   */
  create() {
    super.create_enter()
    // gathered from level puzzle data
    this.change_level(puzzles[this.level_index++]);
    this.playfield0.create(this, {
      push  : false,
      x     : 320,
      y     : 80,
      panels: this.panels
    });

    this.countdown.create(true,this.callback_countdown.bind(this))
    this.playfield0.create_after()
    this.playfield0.cursor.mode = "puzzle"
    this.playfield0.character.sprite.visible = false
    this.timer.create(this,180, 60)
    this.step_display.create({ playfield: this.playfield0, step_limit: this.steps_left, x: 575, y: 85 });
    super.create_exit()
  }

  create_bg() {
    this.bg = game.add.sprite(0, 0, "mode_puzzle_bg")
    this.bg.anchor.setTo(0.5, 0)
    this.bg.x = game.world.centerX
  }

  protected callback_countdown(){
    super.callback_countdown()
  }

  protected start_execute(){
    this.countdown.update()
    if (this.countdown.state === DONE){ 
      if (this.timer)
        this.timer.running = true
      this.state = RUNNING
      game.sounds.ding()
      game.sounds.stage_music('active')
    }
  }

  /** changes the current level to the next one from the puzzle array - counters go up */
  change_level(lvl) {
    this.panels = lvl.panels;
    this.steps_left = lvl.steps;
    this.step_display.step_limit = lvl.steps;
  }

  step(tick) {
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
    super.step(tick)
    this.countdown.update()
  }

  render() {
    this.timer.render()
    if (this.playfield0) { this.playfield0.render() }
    this.step_display.render()
  }
}
