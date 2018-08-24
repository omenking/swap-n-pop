import game from 'core/game'
import assets from 'core/assets'
import ComponentBauble        from 'components/bauble'
import ComponentPanelGarbage  from 'components/panel_garbage'
import ComponentParticleClear from 'components/particle_clear'
import ComponentPlayfield     from 'components/playfield'
import ComponentStateMachine from 'components/state_machine'
import * as ss from 'shuffle-seed'
import {
  GAMEOVER,
  UNIT,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  STATIC,
  HANG,
  FALL,
  LAND,
  GARBAGE,
  CLEAR,
  ROWS_INV,
  ROWS,
  TIME_SWAP,
  TIME_CLEAR,
  TIME_POP,
  COMBO,
} from 'common/data';

/**
 *
 */
export default class ComponentPanel {
  get [Symbol.toStringTag](){ return 'Panel' }

  private _kind         : number
  private _counter      : number
  private _chain        : number
  private bauble        : ComponentBauble
  public garbage        : ComponentPanelGarbage
  public playfield      : ComponentPlayfield
  public x              : number
  public y              : number
  private sprite        : Phaser.Sprite
  public group         : number
  public time_cur       : number
  public time_pop      : number
  public particles     : Array<ComponentParticleClear>
  public clear_i        : number
  public clear_len      : number

  public fsm            : ComponentStateMachine
  public neighbors : Map<String, any>

  get kind ()   { return this._kind }
  set kind (val){ this._kind = val }

  /**
   *  The panel's counter does two things
   *
   *  1. It keeps track of the index of a panel's animation in `animate()`
   *  2. It's the timer used to determine when to change a panel's state in `update()`
   *
   *  @type {number}
   */
  get counter()    {return this._counter }
  set counter(val) {       this._counter = val }

  get chain()    {return this._chain }
  set chain(val) { this._chain = val }

  get should_hang() { let under = this.neighbors["down"]; return under === undefined ? false : under.fsm.state === STATIC && under.kind === null; }

  get absolute_center_x(){
    let x = this.playfield.layer_block.x
    x += (this.x * UNIT)
    x += (UNIT / 2)
    return x
  }
  get absolute_center_y(){
    let y = this.playfield.layer_block.y
    y += (this.y * UNIT)
    y += (UNIT / 2)
    return y
  }

  /** */
  constructor() {
    this.bauble  = new ComponentBauble()
    this.garbage = new ComponentPanelGarbage()
    this.fsm = new ComponentStateMachine(this, STATIC)
    this.neighbors = new Map()

    this.particles = [
      new ComponentParticleClear(0),
      new ComponentParticleClear(1),
      new ComponentParticleClear(2),
      new ComponentParticleClear(3)
    ]
  }

  /** */
  get snap() {
    return [
      this.x,
      this.y,
      this.kind,
      this.fsm.state,
      this.counter,
      this.chain,
      this.garbage.snap,
      this.group,
      [
        this.particles[0].snap,
        this.particles[1].snap,
        this.particles[2].snap,
        this.particles[3].snap
      ],
      this.fsm.timer
    ]
  }

  /** */
  load(data) {
    this.x       = data[0]
    this.y       = data[1]
    this.kind    = data[2]
    this.fsm.state   = data[3]
    this.counter = data[4]
    this.chain   = data[5]
    this.garbage.load(data[6])
    this.group   = data[7]
    if (data[8]){
      this.particles[0].load(data[8][0])
      this.particles[1].load(data[8][1])
      this.particles[2].load(data[8][2])
      this.particles[3].load(data[8][3])
    }
    this.fsm.timer = data[9]
  }

  /** */
  create(playfield, x, y) {
    /************************************************
    * STATE MACHINE
    ************************************************/
    
    
    this.playfield = playfield
    this.x = x;
    this.y = y;

    this.sprite = game.make.sprite(this.x * UNIT, this.y * UNIT, 'panels',0);
    this.playfield.layer_block.add(this.sprite)
    // shouldn't have to call visible false
    // here as it should be taken care of in render
    // but without it here, it causes a flicker at
    // start of match. If we can find someone way to
    // move this in the render that would be ideal.

    this.garbage.create(this,this.playfield)
    this.bauble.create(this)
    this.particles[0].create(this,this.playfield.pi)
    this.particles[1].create(this,this.playfield.pi)
    this.particles[2].create(this,this.playfield.pi)
    this.particles[3].create(this,this.playfield.pi)

    this.reset()
  }

  public reset(){
    this.counter   = 0
    this.kind = null
    this.fsm.state = STATIC
    this.chain = 0
    this.sprite.visible = false
    this.garbage.reset()
  }

  create_after(){
    this.garbage.face.create(this.garbage)
  }

  /*
   * particle garbage is the particle that flies from
   * the bauble to where the garbage thumbnail will appear
   * it represents an incoming garbage payload.
   *
   */
  set_particle_garbage(){
    if (!this.playfield.stage.flag_garbage) { return }
    if (!this.first_pop)                    { return }
    if (!this.sending_payload)              { return }
    this.bauble.particle_garbage.set_counter(COMBO,this.clear_len)
  }

  /*
   * these are your standard popping particles
   */
  set_particles_clear(){
    if (this.time_cur === this.time_pop) {
      // Score 10 per pop
      this.playfield.add_score(10)  
        
      this.particles[0].set_counter()
      this.particles[1].set_counter()
      this.particles[2].set_counter()
      this.particles[3].set_counter()
      game.sounds.pop(this.clear_i, this.clear_len)
    }
  }

  set_garbage(group: number, kind: string){
    this.fsm.state = GARBAGE
    this.garbage.group = group
    this.garbage.state = FALL
    this.garbage.kind  = kind
  }

  /** resets this panel to a normal state - stops animation usefull for stack resets */
  soft_reset() {
    this.counter = 0;
    this.fsm.state = STATIC;
  }

  /*
   * In order for this panel to be swappable it must:
   *   * not have a panel hanging over above
   *   * swapping_panel isnt empty and current state is fall
   *   * this panel needs to be static 
   *   * during a land as long as 1 frame of land has been played out
   *   * if its empty you can swap
   *   * if swapping_panel isnt empty it can be switched while in switching states
   * */
  swappable(swapping_panel) {
    // if above is not stable, you can't swap
    if (this.neighbors["up"] !== undefined && this.neighbors["up"].state === HANG) { return false }
    
    // only let swappable while falling be able when the swapping panel isnt empty
    if (!swapping_panel.empty && this.fsm.state === FALL) { return true }

    // if static let this be swappable
    if (this.fsm.state === STATIC) { return true }
        
    if (this.fsm.state === LAND && this.counter < assets.spritesheets.panels.animations.land.length) { return true }
    if (this.empty) { return true }
   
    // swapping_panel should never be null, swapping panel can be static so !empty doesnt work
    if (swapping_panel.kind !== null)
      if (this.fsm.state === SWAP_L || this.fsm.state === SWAP_R || this.fsm.state === SWAPPING_L || this.fsm.state === SWAPPING_R) 
        return true 
    
    return false
  }
  /**
   * In order for this panel to be valid for use in a combo it must:
   *   1. have support underneath (not falling, static visible panel, or static garbage)
   *   2. be swappable or...
   *   3. already have been marked for being cleared on first frame
   *
   * */
  get comboable() {
    let down = this.neighbors["down"]

    // 1. check for support
    if (down !== undefined) {
      if (down.state === FALL) {return false}
      if (down.empty) { return false }
      if (down.state === GARBAGE && down.garbage.state !== STATIC) { return false }
    }

    // 2. be comboable
    if (this.fsm.state === STATIC && this.kind !== null) { return true }
    if (this.fsm.state === LAND && this.counter < assets.spritesheets.panels.animations.land.length) { return true }
    // 3 already have been marked for being cleared on first frame
    if (this.fsm.state === CLEAR && this.playfield.clearing.indexOf(this) !== -1 && this.fsm.timer === 0) { return true }
      return false
  }

  /** 
   *  A panel is only considered static stable if it is STATIC and has a kind assigned
   * */
  get static_stable() { return  this.fsm.state === STATIC && this.kind !== null }

  /** 
   *  A panel is only considered empty if it is STATIC, SWAP_
   *  and has no kind assigned
   * */
  get empty() {
    return this.kind === null && this.fsm.state === STATIC
  }

  get hidden_during_garbage_static(){
    return this.fsm.state === GARBAGE &&
           this.garbage.state === STATIC
  }

  get empty_when_swapping() {
    return (this.fsm.state === SWAP_R     ||
            this.fsm.state === SWAP_L     ||
            this.fsm.state === SWAPPING_L ||
            this.fsm.state === SWAPPING_R) && this.kind === null
  }
  /**
   * A panel can be hidden but not empty this only happens in the case
   * when panels are clearing and are temporarily invisible
   * */
  get hidden_during_clear() { return this.fsm.state === CLEAR && this.time_cur >= this.time_pop  }

  /*
   * In order to determine danger is true we need a panel that is considered
   * stable. A stable panel is one that is not falling, landing or clearing, hanging
   * So a static panel is
   *   * swapping with a kind
   *   * static with a kind
   *   * garbage thats static
   */
  get stable() {
    if (this.fsm.state === STATIC     && this.kind !== null) { return true }
    if (this.fsm.state === SWAP_R     && this.kind !== null) { return true }
    if (this.fsm.state === SWAPPING_R && this.kind !== null) { return true }
    if (this.fsm.state === SWAPPING_L && this.kind !== null) { return true }
    if (this.fsm.state === GARBAGE    && this.garbage.state === STATIC) { return true }
    return false
  }


  log() {
    const k = (this.kind === null) ? 'N' : this.kind
    return `${k}`
  }

  matched_pair(match_kind, n1, n2) {
    if (this.neighbors[n1] !== undefined && this.neighbors[n2] !== undefined) 
      if (this.neighbors[n1].kind === match_kind && this.neighbors[n2].kind === match_kind)
        return true

    return false
  }

  /** */
  matched(kind) {
    return (
      this.matched_pair(kind, "left", "right") ||
      this.matched_pair(kind, "up", "down") ||
      this.matched_pair(kind, "up", "up2") ||
      this.matched_pair(kind, "down", "down2") ||
      this.matched_pair(kind, "left", "left2") ||
      this.matched_pair(kind, "right", "right2")
    )
  }
  /** */
  get frame() { return this.sprite.frame }
  /**
   * Sets the current frame based on panel kind
   *
   * We use a spritesheet for all the panels graphics.
   * Each panel kind eg. green, red, blue takes up one row in the spritespeet.
   *
   */
  set frame(i : any) {
    // should not have to parseInt, something is passing in string
    this.sprite.frame = (this.kind * 8) + parseInt(i)
  }

  /** */
  set_kind(i) {
    switch (i) {
      case 'unique':
        this.kind = this.nocombo();
        break;
      default:
        this.kind = i;
        break;
    }
  }

  /**
   * `update(i)` handles the states and its transition to other states.
   * A panel's state will usually change when the panel's `counter`
   * reaches zero.
   *
   */
  update() {
    this.bauble.update()
    this.particles[0].update()
    this.particles[1].update()
    this.particles[2].update()
    this.particles[3].update()

    if (this.fsm.state === GARBAGE) {
      //this.garbage.update()
    } else {
      if (this.newline){ return; }
      if (this.counter > 0) { this.counter--}

      this.fsm.update()
    }
    ++this.fsm.timer
  }

  /**
   * Determines whether a panel should be visible or not
   * at the time of render
   */
  render_visible() {
    this.sprite.visible =  !(
      this.empty               ||
      this.hidden_during_clear ||
      this.empty_when_swapping ||
      this.hidden_during_garbage_static
    )
  }

  /**
   * Swaps the this panel with the panel to it's right.
   */
  swap() {
    if (this.empty && this.neighbors["right"].empty) { return }

    this.counter        = 0
    this.neighbors["right"].counter  = 0

    this.fsm.change_state(SWAP_L)
    this.neighbors["right"].fsm.change_state(SWAP_R)

    game.sounds.swap()
  }

  /**
    Calculates and set the counter for the panel to pop
    @param {{number}} i
  */
  popping(i) {
    this.counter = TIME_CLEAR + (TIME_POP[this.playfield.level]*(i-1))
  }

  /**
   * `nocombo()` will return a number that represents a kind of panel
   * that will not result in a combo or the same number above.
   *
   *  eg. Lets say we have the following stack
   * ```js
   *  // 2 0 2
   *  // 1 3 1
   *  // 4 4 *
   * ```
   * Then we expect `nocombo()` to
   * * return either `0,2,3`
   * * and it should not return `4` because that would result in a match
   * * and it should not return `1` because above it there is a `1` above
   *
   * @returns {number} new kind to be set to!
  */
  // TODO: fix
  nocombo() {
    const arr = [0, 1, 2, 3, 4]
    if (this.neighbors["up"] !== undefined && this.neighbors["up"].kind){ arr.splice(arr.indexOf(this.neighbors["up"].kind), 1)}
    let values = ss.shuffle(arr,this.playfield.stage.rng())
    return this.kind = values.find((i)=> {
      return this.matched(i) === false
    })
  }

  get sending_payload(){
    return this.chain >= 2 || this.clear_len >= 4
  }

  /*
   * if this is the first panel to have popped in a chain
   */
  get first_pop(){
    return this.time_cur === this.time_pop && this.clear_i === 0
  }

  /**
  * `danger()` will check if the this panel's column
  *  contains any active panel's a few panels from the top.
  *  and if it does it should return true, because this column
  *  in the stack is in danger.
  */
  get danger() {
    return this.playfield.stack_xy(this.x,1+ROWS_INV).stable
  }

  /**
  * `dead()` will check if the this panel's column contains
  * an active panel in the first row. If this is the case
  * then the this panel should be considered dead.
  */
  get dead() {
    return this.playfield.stack_xy(this.x,0+ROWS_INV).stable
  }

  /**
  * `newline()` checks if this panel is a newline.
  *  A panel is considered a newline when its the last
  *  row in the stack and the playfield should push panels,
  *  When a playfield should push panels it will add an extra
  *  row to the end of stack which for newline.
  */
  get newline() {
    return this.playfield.should_push && this.y === ROWS
  }

  /**
  * `clear()` will change a panel's state to clear.
  * it will also on the same tick push this panel to
  * an array called `clearing`. This clearing array is used
  * to help set the counter time for the entire duration of the clear.
  * You can see this in `Playfield.chain_and_combo` where it will then
  * call `Panel.popping` to set the counter.
  */
  clear() {
    this.fsm.change_state(CLEAR)
  }

  /**
   * Checks above and under and then left and right from the current panel.
   * Panels will be added to playfield.clearing to determine combo and chain
   *
   * */
  chain_and_combo() {
    if (!this.comboable) { return }

    if (this.neighbors["left"] !== undefined && this.neighbors["left"].comboable_with( this.kind) &&
        this.neighbors["right"] !== undefined && this.neighbors["right"].comboable_with(this.kind)) {
      this.neighbors["left"].clear()
      this.clear()
      this.neighbors["right"].clear()
    }

    if (this.neighbors["up"] !== undefined && this.neighbors["up"].comboable_with( this.kind) &&
        this.neighbors["down"] !== undefined && this.neighbors["down"].comboable_with( this.kind)) {
      this.neighbors["up"].clear()
      this.clear()
      this.neighbors["down"].clear()
    }
  }

  comboable_with(kind){
    return this.comboable && kind !== null && this.kind === kind
  }

  /**
   *
   Returns the index of the current panel clearing and amount of panels clearing
   @returns {array} - [index,length]
   */
  get clear_index(){
    if (this.fsm.state !== CLEAR) {
      throw(new Error('clear_index called on none CLEAR panel'))
    }
    let panels = []
    for (let p of this.playfield.stack){
      if (p.group === this.group &&
          p.fsm.state === CLEAR) {
        panels.push(p)
      }
    }
    return [panels.indexOf(this),panels.length]
  }

  /**
   * `animate()` is responsible for setting the panel's current sprite frame
   *  and in the case of swapping adjusting the sprite's `x` and `y`
   *
   * * newline  - when a panel is on a new line and appears greyed out
   * * dead     - when a panel shows a dead face
   * * danger   - when a panel is in danger it bounces
   * * clear    - when a panel is clearing it flashes and then vanishes
   * * land     - when a panel lands
   * * swapping - when two panels swap
   * * live     - the panel's normal state
   *
   */
  animate(){
    if (this.newline) {
      this.frame = assets.spritesheets.panels.animations.newline
    } else if (this.dead === true && this.playfield.stage.state === GAMEOVER){
      this.frame = assets.spritesheets.panels.animations.dead
    } else if (this.fsm.state === CLEAR){
      const frames = assets.spritesheets.panels.animations.clear
      const len = frames.length
      if (len > this.time_cur){
        this.frame = frames[this.time_cur]
      }
    } else if (this.fsm.state === LAND){
      const frames = assets.spritesheets.panels.animations.land
      const len    = frames.length
      this.frame = frames[len-this.counter]
    } else if (this.fsm.state === SWAPPING_L || this.fsm.state === SWAPPING_R){
      let v = (UNIT / TIME_SWAP) * this.counter
      switch (this.fsm.state) {
        case SWAPPING_L:
          this.sprite.x += v
          break
        case SWAPPING_R:
          this.sprite.x -= v
          break
      }
      this.frame = assets.spritesheets.panels.animations.live
    } else if (this.danger){
      const frames = assets.spritesheets.panels.animations.danger
      const len    = frames.length
      const i      = frames[len - this.counter+1]
      this.frame = i
    } else {
      this.frame = assets.spritesheets.panels.animations.live
    }
  }
  /** */
  render(){
    this.particles[0].render()
    this.particles[1].render()
    this.particles[2].render()
    this.particles[3].render()

    this.sprite.x = this.x * UNIT
    this.sprite.y = this.y * UNIT
    this.animate()
    this.render_visible()
    this.bauble.render()
    //this.garbage.render()
  }
  /** */
  shutdown(){}
} // klass
