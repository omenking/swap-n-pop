import * as seedrandom    from 'seedrandom'
import game               from 'core/game'
import State              from 'states/base'
import CountdownState     from 'core/countdown_state'
import ComponentTimer     from 'components/timer'
import ComponentMenuPause from 'components/menu_pause'
import ComponentPlayfield from 'components/playfield'
import CoreInputs         from 'core/inputs'
import CoreSnapshots      from 'core/snapshots'
import CoreControls       from 'core/controls'
import fade               from 'core/fade'
import {
  STARTING,
  RUNNING,
  PAUSE,
  GAMEOVER,
  DONE
} from 'core/data'

declare var window: any

export default abstract class Stage extends State {
  public    playfield0    : ComponentPlayfield
  public    playfield1    : ComponentPlayfield
  protected state         : string
  public    countdown     : CountdownState
  protected timer         : ComponentTimer
  protected menu_pause    : ComponentMenuPause
  protected step_mode     : boolean
  public    tick          : number
  public    seed          : string
  protected rng           : any
  protected bg            : Phaser.Sprite
  protected inputs        : CoreInputs
  protected snapshots     : CoreSnapshots
  protected controls      : any
  protected roll          : any
  public roll_log_heading : Array<any>
  public roll_log_data    : Array<any>
  protected playfield_cursor_entrance : any

  constructor(){
    super()
    this.playfield0   = new ComponentPlayfield(0)
    this.menu_pause   = new ComponentMenuPause()
    this.countdown    = new CountdownState()
  }

  public init(data) {
    this.step_mode = false
    this.tick = 0
    // had to do this to inject controls into for `integration/online.spec.ts`
    this.controls  = data.controls || CoreControls
    this.snapshots = new CoreSnapshots()
    this.roll = {
      ready : false,
      from  : null,
      to    : null
    }
  }

  create_enter(){
    this.rng = seedrandom(this.seed, {state: true})
    this.state = STARTING
    this.create_bg()
  }

  create_bg(){
  }

  create_exit(){
    this.controls.map_global({
      sim_forward : this.sim_forward.bind(this),
      sim_backward: this.sim_backward.bind(this),
      sim_toggle  : this.sim_toggle.bind(this)
    })
    this.snapshots.create(this)
    this.snapshots.snap(0)
    fade.in()
  }

  step(tick) {
    this.tick++
    this.update_playfields()
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
    this.menu_pause.update()
  }

  danger_check() {
  }

  protected start_execute(){
  }

  protected callback_countdown(){
    this.playfield0.cursor.entrance()
    if (this.playfield1) {
      this.playfield1.cursor.entrance()
    }
  }

  update_playfields(){
    this.playfield0.update()
    if (this.playfield1) { this.playfield1.update() }
  }


  /*
   * step forward only once, but if you're holding
   * long engough step forward as normal
   */
  sim_forward(tick){
    if (tick > 0 && tick < 30) { return }
    this.step(false)
    this.devtools_load()
  }

  sim_backward(tick){
    if (tick > 0 && tick < 30) { return } 
    this.snapshots.load(this.tick-1)
    this.render()
    this.devtools_load()
  }

  sim_toggle(tick){
    if (tick > 0) { return }
    this.step_mode = !this.step_mode
    if (this.step_mode) {
      window.stage = this
      this.devtools_load()
    } else {
      window.stage = null
      if (window.devtools_stage_clear) {
        window.devtools_stage_clear()
      }
    }
  }

  devtools_load(){
    if (window.devtools_stage_load) {
      window.devtools_stage_load()
    }
  }

  game_over(pi) {
  }

  roll_to(from,to) {
    if (from > to) { // rollback
    } else { //rollforward
      this.snapshots.load(from)
      //this.log_stack(from,'snap')
      // since we loaded a snapshot, maybe we don't need to step
      // throuh the frame we loaded the snapshot on.
      for (let i = from+1; i <= to; i++) {
        this.step(i)
        //this.log_stack(i)
      }
    }
    this.roll = {ready: false, from: null, to: null}
  }

  update() {
    if (this.step_mode === false){
      //this.log_stack_setup()
      this.step(false)
      //this.log_stack(this.tick,'end')
    }
    this.controls.update_global()
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
      game.sounds.stage_music('resume')
      this.state         = RUNNING
      this.timer.running = true
    }
    this.playfield0.cursor.map_controls()
    if (this.playfield1) {
      this.playfield1.cursor.map_controls()
    }
  }

  /** shuts down the playfields */
  shutdown() {
    game.sounds.stage_music('none')
    this.playfield0.shutdown()
    if (this.playfield1) {
      this.playfield1.shutdown()
    }
  }
}
