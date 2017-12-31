import * as electron        from 'electron'
import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import CountdownState       from 'core/countdown_state'
import CoreStage            from 'core/stage'
import Stack                from 'core/stack'
import ComponentPlayfield   from 'components/playfield'
import ComponentPing        from 'components/ping'
import ComponentDebugFrame  from 'components/debug_frame'
import ComponentTimer       from 'components/timer'
import ComponentMenuPause   from 'components/menu_pause'
import ComponentStarCounter from 'components/star_counter'
import ComponentLevel       from 'components/level'
import { px } from 'core/filters'
import {
  COLS,
  ROWS,
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'core/data'

const {ipcRenderer: ipc} = electron

export default class ModeVs extends CoreStage {
  get [Symbol.toStringTag](){ return 'ModeVs' }

  private ping         : ComponentPing
  private star_counter : ComponentStarCounter
  private danger       : boolean
  private rounds_won   : Array<number>
  public  online       : any
  public  cpu          : Array<any>
  private frame        : Phaser.Sprite
  public  levels       : Array<ComponentLevel>

  public flag_garbage : boolean
  public flag_timer   : boolean

  constructor() {
    super()
    this.playfield0   = new ComponentPlayfield(0)
    this.playfield1   = new ComponentPlayfield(1)
    this.ping         = new ComponentPing()
    this.timer        = new ComponentTimer()

    this.menu_pause   = new ComponentMenuPause()
    this.star_counter = new ComponentStarCounter()
    this.countdown    = new CountdownState()
    this.levels = [
      new ComponentLevel(0),
      new ComponentLevel(1)
    ]
  }

  get name(): string { return 'mode_vs' }

  public init(data) {
    this.flag_garbage = data.garbage
    this.flag_timer   = data.timer
    this.step_mode    = false
    this.rounds_won = [2,1]
    this.seed       = data.seed
    this.cpu        = data.cpu
    this.online     = data.online
    super.init(data)
  }

  get snap() {
    return [
      this.state,
      this.playfield0.snap,
      this.playfield1.snap,
      this.timer.snap,
      this.controls.snap,
      this.tick,
      this.rng.state(),
      this.countdown.snap
    ];
  }

  /*
   * load is reserved for staes so needed another name
   */
  load_snaphot(snapshot) {
    this.state = snapshot[0]
    // all objects - subobjects to load with a snapshot
    this.playfield0.load(snapshot[1])
    this.playfield1.load(snapshot[2])
    this.controls.load(snapshot[3])
    this.timer.load(snapshot[4])
    this.tick = snapshot[5]
    this.rng = seedrandom(this.seed, {state: snapshot[6]})
    this.countdown.load(snapshot[7])
  }

  create_bg() {
    this.bg = game.add.sprite(0,0, 'playfield_vs_bg');
  }
  create_frame(offset) {
    this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
  }
  create() {
    super.create_enter()
    this.danger = false
    const offset = px(55)
    const stack = new Stack(this.rng);
    stack.create(6,2,"average","many");

    if (this.online && game.server.pos === 1) {
      this.playfield1.create(this, {countdown: true, push: true, x: offset+px(184), y: px(24), panels: stack.panels})
      this.playfield0.create(this, {countdown: true, push: true, x: offset+px(8  ), y: px(24), panels: stack.panels})
    } else {
      this.playfield0.create(this, {countdown: true, push: true, x: offset+px(8  ), y: px(24), panels: stack.panels})
      this.playfield1.create(this, {countdown: true, push: true, x: offset+px(184), y: px(24), panels: stack.panels})
    }

    this.create_frame(offset)
    this.countdown.create(true,this.callback_countdown.bind(this))
    this.playfield0.create_after()
    this.playfield1.create_after()
    this.timer.create(this,offset+px(128),px(168))
    if (this.online){ this.ping.create() }
    this.menu_pause.create(this)
    this.star_counter.create(this,px(91),px(91))
    this.levels[0].create(px(175)   ,px(134),1)
    this.levels[1].create(px(175+34),px(134),1)
    super.create_exit()
  }

  protected callback_countdown(){
    super.callback_countdown()
  }

  game_over(pi) {
    if(!this.inputs.replay){
      ipc.send('replay-save', {seed: this.seed, inputs: this.inputs.serialize});
    }
    game.sounds.stage_music('results')
    this.timer.running = false
    this.playfield0.game_over()
    this.playfield1.game_over()

    if (pi === 0) {
      this.playfield0.character.current_animation = "lost"
      this.playfield1.character.current_animation = "won"
    }
    else if (pi === 1) {
      this.playfield0.character.current_animation = "won"
      this.playfield1.character.current_animation = "lost"
    }
  }
  danger_check() {
    const d1 = this.playfield0.danger(1)
    const d2 = this.playfield1.danger(2)

    if (d1 || d2) {
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
      if (this.cpu[1] === true || this.online === false){
        this.playfield0.cursor.map_controls()
      }
      game.sounds.stage_music('active')
    }
  }

  step(tick) {
    super.step(tick)
    this.timer.update()
    this.star_counter.update()
  }

  update_playfields(){
    // we need to swap the playfield update order for
    // one of the players otherwise in multipalyer it will
    // generate the panels on the wrong side.
    if (this.online && game.server.pos === 1) {
      this.playfield1.update()
      this.playfield0.update()
    } else {
      this.playfield0.update()
      this.playfield1.update()
    }
  }

  render() {
    this.timer.render()
    if (this.playfield0) { this.playfield0.render() }
    if (this.playfield1) { this.playfield1.render() }
    if (this.online){
      this.ping.render()
    }
    this.star_counter.render()
    this.levels[0].render()
    this.levels[1].render()
  }
}
