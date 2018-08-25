import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import CoreStage            from 'core/stage'
import PanelGenerator       from 'core/panel_generator'
import WallState            from 'core/wall_state'
import ComponentPlayfield   from 'components/playfield'
import ComponentPing        from 'components/ping'
import ComponentDebugFrame  from 'components/debug_frame'
import CoreInputs           from 'core/inputs'
import ComponentStarCounter from 'components/star_counter'
import ComponentLevel       from 'components/level'
import {px} from 'core/filters'
import {
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'common/data'

export default class ModeVs extends CoreStage {
  get [Symbol.toStringTag](){ return 'ModeVs' }
  get name(): string { return 'mode_vs' }

  private ping         : ComponentPing
  private star_counter : ComponentStarCounter
  private danger       : boolean
  private rounds_won   : Array<number>
  public  online       : any
  public  cpu          : Array<any>
  private frame        : Phaser.Sprite
  public  levels       : Array<ComponentLevel>
  public  wall         : WallState

  public flag_garbage   : boolean
  public flag_timer     : boolean
  public flag_countdown : boolean

  constructor() {
    super()
    this.playfield1   = new ComponentPlayfield(1)
    this.ping         = new ComponentPing()
    this.star_counter = new ComponentStarCounter()
    this.wall         = new WallState()
    this.levels = [
      new ComponentLevel(0),
      new ComponentLevel(1)
    ]
  }

  public init(data) {
    this.seed      = data.seed
    this.inputs    = new CoreInputs(data.inputs,data.online,this)
    this.flag_garbage = data.garbage
    this.flag_timer   = data.timer
    this.rounds_won = [0,0]
    this.cpu        = data.cpu
    this.online     = data.online
    console.log('data',data.countdown)
    this.flag_countdown = (data.countdown || false)
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
    const panel_gen = new PanelGenerator();
    panel_gen.create(this.rng)
    let new_panels = panel_gen.create_stack();

    if (this.online && game.server.pos === 1) {
      this.playfield1.create(this, {push: true, x: offset+px(184), y: px(24), panels: new_panels})
      this.playfield0.create(this, {push: true, x: offset+px(8  ), y: px(24), panels: new_panels})
    } else {
      this.playfield0.create(this, {push: true, x: offset+px(8  ), y: px(24), panels: new_panels})
      this.playfield1.create(this, {push: true, x: offset+px(184), y: px(24), panels: new_panels})
    }

    this.create_frame(offset)
    this.wall.create(
      this.callback_wall_rollup_exit.bind(this),
      this.callback_wall_done.bind(this)
    )
    this.countdown.create(this.flag_countdown,this.callback_countdown.bind(this))
    this.playfield0.create_after()
    this.playfield1.create_after()
    this.timer.create(this,offset+px(128),px(168))
    if (this.online){ this.ping.create() }
    this.star_counter.create(this,px(91),px(91))
    this.levels[0].create(px(175)   ,px(134),1)
    this.levels[1].create(px(175+34),px(134),1)
    super.create_exit()
  }

  protected callback_countdown(){
    super.callback_countdown()
  }

  protected callback_wall_rollup_exit(){
    const panel_gen = new PanelGenerator();
    panel_gen.create(this.rng)
    let new_panels = panel_gen.create_stack();
    this.playfield0.reset()
    this.playfield1.reset()
    this.playfield0.fill_panels(new_panels)
    this.playfield1.fill_panels(new_panels)
  }

  protected callback_wall_done(){
    this.countdown.reset()
    this.timer.reset()
    this.state = STARTING
  }

  game_over(pi) {
    super.game_over(pi)
    if (pi === 0) {
      this.rounds_won[1]++
      this.playfield0.character.current_animation = "lost"
      this.playfield1.character.current_animation = "won"
    }
    else if (pi === 1) {
      this.rounds_won[0]++
      this.playfield0.character.current_animation = "won"
      this.playfield1.character.current_animation = "lost"
    }
  }

  danger_check() {
    if (this.state !== RUNNING) {return}
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
    game.sounds.mode_vs.step()
    this.timer.update()
    if (this.state == GAMEOVER) {
      this.wall.update()
    }
    this.star_counter.update()
  }

  update_playfields(){
    // we need to swap the playfield update order for
    // one of the players otherwise in multipalyer it will
    // generate the panels on the wrong side because of the ordering
    // of the RNG.
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
