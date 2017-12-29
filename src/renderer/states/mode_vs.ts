import * as electron        from 'electron'
import * as seedrandom      from 'seedrandom'
import game                 from 'core/game'
import CoreControls         from 'core/controls'
import CoreInputs           from 'core/inputs'
import CoreSnapshots        from 'core/snapshots'
import CoreStage            from 'core/stage'
import Stack                from 'core/stack'
import CountdownState       from 'core/countdown_state'
import ComponentPlayfield   from 'components/playfield'
import ComponentPing        from 'components/ping'
import ComponentDebugFrame  from 'components/debug_frame'
import ComponentTimer       from 'components/timer'
import ComponentMenuPause   from 'components/menu_pause'
import ComponentStarCounter from 'components/star_counter'
import fade                 from 'core/fade'
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


declare var window: any

const {ipcRenderer: ipc} = electron

export default class ModeVs extends CoreStage {
  get [Symbol.toStringTag](){ return 'ModeVs' }

  public playfield0       : ComponentPlayfield
  public playfield1       : ComponentPlayfield
  private ping            : ComponentPing
  private debug_frame     : ComponentDebugFrame
  private timer           : ComponentTimer
  private menu_pause      : ComponentMenuPause
  private star_counter    : ComponentStarCounter
  private inputs          : CoreInputs
  private snapshots       : CoreSnapshots
  private rng             : any
  private debug           : boolean
  private roll            : any
  public roll_log_heading : Array<any>
  public roll_log_data    : Array<any>
  public tick             : number
  private danger          : boolean
  private seed            : string
  private rounds_won      : Array<number>
  private bg              : Phaser.Sprite
  private _online         : any
  private _cpu            : Array<any>
  private frame           : Phaser.Sprite
  private controls        : any
  private _countdown      : CountdownState
  private step_mode       : boolean

  constructor() {
    super()
    this.playfield0   = new ComponentPlayfield(0)
    this.playfield1   = new ComponentPlayfield(1)
    this.ping         = new ComponentPing()
    this.debug_frame  = new ComponentDebugFrame()
    this.timer        = new ComponentTimer()

    this.menu_pause   = new ComponentMenuPause()
    this.star_counter = new ComponentStarCounter()
    this.countdown    = new CountdownState()
  }

  get name(): string {
    return 'mode_vs';
  }

  public init(data) {
    this.step_mode = false
    this.rounds_won = [2,1]
    this.tick   = 0
    this.seed   = data.seed
    this.cpu    = data.cpu
    this.online = data.online
    this.rng    = seedrandom(this.seed, {state: true})

    // had to do this to inject controls into for `integration/online.spec.ts`
    this.controls = data.controls || CoreControls

    this.inputs = new CoreInputs(data.inputs,data.online,this)
    this.snapshots = new CoreSnapshots()
    this.roll = {
      ready: false,
      from: null,
      to: null
    }
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

  /*
   * step forward only once, but if you're holding
   * long engough step forward as normal
   *
   */
  sim_forward(tick){
    if (tick > 0 && tick < 30)
      return;
    this.step(false)
    this.devtools_load()
  }

  sim_backward(tick){
    if (tick > 0 && tick < 30)
      return;
    this.snapshots.load(this.tick-1)
    this.render()
    this.devtools_load()
  }

  sim_toggle(tick){
    if (tick > 0)
      return;
    this.step_mode = !this.step_mode
    if (this.step_mode) {
      window.stage = this
      this.devtools_load()
    } else {
      window.stage = null
      if (window.devtools_send) {
        window.devtools_send({action: 'clear'})
      }
    }
  }

  devtools_load(){
    if (window.devtools_send) {
      window.devtools_send({
        action: 'load',
        stage: this.toString(),
        tick : this.tick,
        len  : this.snapshots.len,
        snapshot      : this.snapshots.snapshot_at(this.tick),
        snapshot_prev : this.snapshots.snapshot_at(this.tick-1)
      })
    }
  }


  get online (){  return this._online }
  set online (v) { this._online = v }

  get cpu (){  return this._cpu }
  set cpu (v){ this._cpu = v }

  get countdown (){  return this._countdown }
  set countdown (v) { this._countdown = v }

  create_bg() {
    this.bg = game.add.sprite(0,0, 'playfield_vs_bg');
  }
  create_frame(offset) {
    this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
  }
  create() {
    this.state = STARTING
    ipc.send('log',`VS ${this.seed} ------------------------------`)
    this.danger = false

    const offset = px(55)
    this.create_bg()

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
    this.countdown.create(true,this.playfield_cursor_entrance.bind(this))
    this.playfield0.create_after()
    this.playfield1.create_after()
    this.timer.create(offset+px(128),px(168));

    this.snapshots.create(this)
    this.snapshots.snap(0)

    if (this.online){
      this.ping.create()
    }
    this.debug_frame.create()

    this.menu_pause.create(this)
    this.star_counter.create(this,px(91),px(91))
    fade.in()
    this.controls.map_global({
      sim_forward: this.sim_forward.bind(this),
      sim_backward: this.sim_backward.bind(this),
      sim_toggle: this.sim_toggle.bind(this)
    })
    // expose for debugger
  }

  playfield_cursor_entrance(){
    this.playfield0.cursor.entrance()
    this.playfield1.cursor.entrance()
  }

  /** turns on the menu, changes it state, turns of the timer from counting */
  pause() {
    game.sounds.stage_music('pause');

    this.state = PAUSE;
    this.timer.running = false;
    this.menu_pause.pause();
  }

  /** called by the menu and reassigns control to both playfields, timer runs again */
  resume() {
    // only resumes the game if countdown's are over
    if (this.countdown.state === DONE){
      game.sounds.stage_music('resume');

      this.state = RUNNING;
      this.timer.running = true;
    }

    this.playfield0.cursor.map_controls();
    this.playfield1.cursor.map_controls();
  }

  game_over(pi) {
    console.log('gameover')
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
      if (this.danger === false) {
        game.sounds.stage_music('danger')
      }
      this.danger = true
    } else {
      if (this.danger === true) {
        game.sounds.stage_music('active')
      }
      this.danger = false
    }
  }
  roll_to(from,to) {
    if (from > to) { // rollback
    } else { //rollforward
      this.snapshots.load(from)
      this.log_stack(from,'snap')
      // since we loaded a snapshot, maybe we don't need to step
      // throuh the frame we loaded the snapshot on.
      for (let i = from+1; i <= to; i++) {
        this.step(i)
        this.log_stack(i)
      }
    }
    this.roll = {ready: false, from: null, to: null}
  }
  log_stack_setup(){
    this.roll_log_heading = []
    this.roll_log_data    = []
    this.log_stack(this.tick,'start')
    if (this.roll.ready){
      ipc.send(
        'log',
        `RL ${this.tick}: ${this.roll.from} ${this.roll.to}`
      )
      this.roll_to(this.roll.from,this.roll.to)
    }
  }
  update() {
    if (this.step_mode === false){
      //this.log_stack_setup()
      this.step(false)
      //this.log_stack(this.tick,'end')
    }
    this.controls.update_global()
  }

  start_execute(){
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

  log_stack(tick,format=null) {
    this.roll_log_heading.push({tick: tick, format: format})
    for (let i = 0; i < ROWS; i++){
      let line = ''
      line += this.playfield0._stack[0+(i*COLS)].log()
      line += this.playfield0._stack[1+(i*COLS)].log()
      line += this.playfield0._stack[2+(i*COLS)].log()
      line += ' '
      line += this.playfield0._stack[3+(i*COLS)].log()
      line += this.playfield0._stack[4+(i*COLS)].log()
      line += this.playfield0._stack[5+(i*COLS)].log()
      line += '  '
      line += this.playfield1._stack[0+(i*COLS)].log()
      line += this.playfield1._stack[1+(i*COLS)].log()
      line += this.playfield1._stack[2+(i*COLS)].log()
      line += ' '
      line += this.playfield1._stack[3+(i*COLS)].log()
      line += this.playfield1._stack[4+(i*COLS)].log()
      line += this.playfield1._stack[5+(i*COLS)].log()
      if (this.roll_log_data[i] === undefined){
        this.roll_log_data[i] = []
      }
      this.roll_log_data[i].push(line)
    }
  }

  log_roll() {
    let str    = ""
    let format = null
    let tick   = null

    str   += "\n"
    for (let i = 0; i < this.roll_log_heading.length; i++){
      tick   = `${this.roll_log_heading[i].tick}`
      tick   = tick.substr(0,22)
      format = this.roll_log_heading[i].format
      str += tick
    }

    for (let i = 0; i < ROWS; i++){
      str   += "\n"

      if (Math.floor(ROWS/2) === i) {
        for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
          format = this.roll_log_heading[ii].format
          str += this.roll_log_data[i][ii]
          if (ii < this.roll_log_data[i].length-1){
             if (format === 'start' ||
                 format === 'end') {
               str += ' -|-> '
             } else {
               str += ' ---> '
             }
          }
        }
      } else {
        for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
          format = this.roll_log_heading[ii].format
          str += this.roll_log_data[i][ii]
          if (ii < this.roll_log_data[i].length-1){
             if (format === 'start' ||
                 format === 'end') {
               str += '  |   '
             } else {
               str += '      '
             }
          }
        }
      }
    }
    return str
  }

  step(tick) {
    this.tick++
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
    this.danger_check()
    if (tick === false) {
      this.inputs.update(this.tick,true)
      this.controls.update()
      this.snapshots.snap(this.tick)
    } else {
      this.inputs.update(tick,false)
      this.controls.update(false,true)
      this.snapshots.snap(tick)
    }

    switch (this.state){
      case STARTING:
        this.start_execute()
        break;
      case RUNNING:
        break;
      case PAUSE:
        break;
      case GAMEOVER:
        break;
    }
    this.timer.update()
    this.menu_pause.update()
    this.star_counter.update()
  }
  render() {
    if(this.debug){
      console.log('debugger triggered')
      debugger
    }
    this.timer.render()
    if (this.playfield0) { this.playfield0.render() }
    if (this.playfield1) { this.playfield1.render() }
    if (this.online){
      this.ping.render()
    }
    //this.debug_frame.render(this.tick)
    this.star_counter.render()
  }
  shutdown() {
    game.sounds.stage_music('none')
    this.playfield0.shutdown()
    this.playfield1.shutdown()
  }
}
