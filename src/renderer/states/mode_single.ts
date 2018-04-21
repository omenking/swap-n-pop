import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import controls             from 'core/controls'
import WallState            from 'core/wall_state'
import CountdownState       from 'core/countdown_state'
import CoreInputs           from 'core/inputs'
import CoreStage            from 'core/stage'
import Stack                from 'core/stack'
import {px} from 'core/filters'

import {
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'common/data';

/* run by phaser state.start */
export default class ModePuzzle extends CoreStage {
  get [Symbol.toStringTag](){ return 'ModeSingle' }
  get name(): string { return 'mode_single' }

  private steps        : number
  private panels       : Array<number>
  public  flag_timer   : boolean
  private danger       : boolean
  public  wall         : WallState

  constructor() {
    super()
    this.wall         = new WallState()
  }

  public init(data) {
    this.seed        = 'puzzle'
    this.inputs      = new CoreInputs(undefined,undefined,this)
    this.flag_timer  = data.timer
    super.init(data)
  }

  /** creates the playfield, menu_pause and timer objects
   *  with certain parameters
   */
  create() {
    super.create_enter()
    this.danger = false
    const stack = new Stack(this.rng);
    stack.create(6,2,"average","many");
    this.playfield0.create(this, {
      push: true,
      x     : px(151),
      y     : px(22),
      panels: stack.panels
    })
    this.wall.create(
      this.callback_wall_rollup_exit.bind(this),
      this.callback_wall_done.bind(this)
    )
    this.countdown.create(true,this.callback_countdown.bind(this))
    this.playfield0.create_after()
    this.timer.create(this,180, 60)
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

  protected callback_wall_rollup_exit(){
    const stack = new Stack(this.rng)
    stack.create(6,2,"average","many")
    this.playfield0.reset()
    this.playfield0.fill_panels(stack.panels)
  }

  protected callback_wall_done(){
    this.countdown.reset()
    this.timer.reset()
    this.state = STARTING
  }

  game_over(pi) {
    super.game_over(pi)
  }

  danger_check() {
    if (this.playfield0.danger(1)) {
      if (this.danger === false) { game.sounds.stage_music('danger') }
      this.danger = true
    } else {
      if (this.danger === true) { game.sounds.stage_music('active') }
      this.danger = false
    }
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

  step(tick) {
    super.step(tick)
    this.timer.update()
    if (this.state == GAMEOVER) {
      this.wall.update()
    }
  }

  render() {
    this.timer.render()
    if (this.playfield0) { this.playfield0.render() }
  }
}
