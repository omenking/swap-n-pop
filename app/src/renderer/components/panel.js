module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const blank = require(APP.path.components('panel_blank'))(game)
  const {
    UNIT,
    SWAP_L,
    SWAP_R,
    SWAPPING_L,
    SWAPPING_R,
    STATIC,
    HANG,
    FALL,
    LAND,
    CLEAR,
    PANELS,
    COLS,
    ROWS,
    FRAME_LAND,
    FRAME_CLEAR,
    FRAME_LIVE,
    FRAME_DANGER,
    FRAME_DEAD,
    FRAME_NEWLINE,
    ANIM_SWAP_LEFT,
    ANIM_SWAP_RIGHT,
    TIME_SWAP,
    TIME_CLEAR,
    TIME_POP,
    TIME_FALL
  } = require(APP.path.core('data'))

  const _f = require(APP.path.core('filters'))
  const ss = require('shuffle-seed')
  /** 
   *
   */
  class Panel {
    get [Symbol.toStringTag](){ return 'Panel' }
    get kind()    { return this.i }
    set kind(val) {        this.i = val }

    /**
     *  The panel's counter does two things
     *
     *  1. It keeps track of the index of a panel's animation in `animate()`
     *  2. It's the timer used to determine when to change a panel's state in `update()`
     *
     *  @type {number}
     */
    get counter()    {return this.attr_counter }
    set counter(val) {       this.attr_counter = val }

    get state()    {return this.attr_state }
    set state(val) {       this.attr_state = val }

    get chain()    {return this.attr_chain }
    set chain(val) {       this.attr_chain = val }

    get  left(){ return _f.out_of_bounds(this.x-1,this.y)   ? blank : this.playfield.stack(this.x-1,this.y)   }
    get right(){ return _f.out_of_bounds(this.x+1,this.y)   ? blank : this.playfield.stack(this.x+1,this.y)   }
    get under(){ return _f.out_of_bounds(this.x  ,this.y+1) ? blank : this.playfield.stack(this.x  ,this.y+1) }
    get above(){ return _f.out_of_bounds(this.x  ,this.y-1) ? blank : this.playfield.stack(this.x  ,this.y-1) }

    get  left2(){ return _f.out_of_bounds(this.x-2,this.y) ? blank : this.playfield.stack(this.x-2,this.y)  }
    get right2(){ return _f.out_of_bounds(this.x+2,this.y) ? blank : this.playfield.stack(this.x+2,this.y)  }
    get under2(){ return _f.out_of_bounds(this.x,this.y+2) ? blank : this.playfield.stack(this.x  ,this.y+2)}
    get above2(){ return _f.out_of_bounds(this.x,this.y-2) ? blank : this.playfield.stack(this.x  ,this.y-2)}

    /** */
    constructor() {
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.load = this.load.bind(this)

      this.log              = this.log.bind(this);
      this.matched          = this.matched.bind(this);
      this.set              = this.set.bind(this)
      this.render_visible   = this.render_visible.bind(this)
      this.swap             = this.swap.bind(this)
      this.popping          = this.popping.bind(this)
      this.clear            = this.clear.bind(this)
      this.nocombo          = this.nocombo.bind(this)
      this.chain_and_combo  = this.chain_and_combo.bind(this)
      this.check_neighbours = this.check_neighbours.bind(this)
    }

    /** */
    static initClass() {
      this.prototype.playfield          = null;
      this.prototype.x                  = null;
      this.prototype.y                  = null;
      this.prototype.chain              = null;
      this.prototype.sprite             = null;
      this.prototype.i                  = null;
    }

    /** */
    get snap() {
      return [
        this.x,
        this.y,
        this.kind,
        this.state,
        this.counter,
        this.chain,
      ];
    }

    /** */
    load(data){
      this.x       = data[0]
      this.y       = data[1]
      this.kind    = data[2]
      this.state   = data[3]
      this.counter = data[4]
      this.chain   = data[5]
    }

    /** */
    create(playfield, x, y){
      this.playfield = playfield
      this.counter   = 0
      this.i = null
      this.x = x;
      this.y = y;
      this.state = STATIC
      this.chain = false

      this.sprite = game.make.sprite(this.x * UNIT, this.y * UNIT, 'panels',0);
      this.playfield.layer_block.add(this.sprite)
      // shouldn't have to call visible false
      // here as it should be taken care of in render
      // but without it here, it causes a flicker at
      // start of match. If we can find someone way to
      // move this in the render that would be ideal.
      this.sprite.visible = false
    }

    /** */
    get swappable() {
      return  this.above.state !== HANG &&
              (this.state === STATIC ||
              // LAND will swap but will play must at play least 1 frame.
              (this.state === LAND && this.counter < FRAME_LAND.length)  
      )
    }
    /** */
    get support()   {  return this.state !== FALL && !this.hidden }
    /** */
    get clearable() {  return this.swappable && this.under.support && !this.hidden }
    /** */
    get comboable() {  return this.clearable || (this.state === CLEAR && this.playfield.clearing.indexOf(this)) }
    /** */
    get empty() {      return  this.state === STATIC && this.hidden }
    /** */
    get hidden(){      return (this.kind === null) }

    log(){
      const k = (this.kind === null) ? 'N' : this.kind
      return `${k}`
    }

    /** */
    matched(kind){
      return ((this.left.kind  === kind) && (this.right.kind  === kind)) ||
             ((this.above.kind === kind) && (this.under.kind  === kind)) ||
             ((this.above.kind === kind) && (this.above2.kind === kind)) ||
             ((this.under.kind === kind) && (this.under2.kind === kind)) ||
             ((this.left.kind  === kind) && (this.left2.kind  === kind)) ||
             ((this.right.kind === kind) && (this.right2.kind === kind))
    }
    /** */
    get frame(){ return this.sprite.frame }
    /**
     * Sets the current frame based on panel kind
     *
     * We use a spritesheet for all the panels graphics.
     * Each panel kind eg. green, red, blue takes up one row in the spritespeet.
     *
     */
    set frame(i){ this.sprite.frame = (this.kind * 8) + i}
    /** */
    set(i){
      switch (i) {
        case 'unique':
          this.nocombo()
          break;
        default:
          this.kind = i
      }
    }
    /** 
     * `update(i)` handles the states and its transition to other states.
     * A panel's state will usually change when the panel's `counter`
     * reaches zero.
     *
     */
    update(){
      if (this.newline){ return; }
      if (this.counter > 0) { this.counter--}

      switch (this.state) {
        case SWAP_L:
          if (this.counter > 0) { return }
          const i1 = this.kind
          const i2 = this.right.kind
          this.kind       = i2
          this.right.kind = i1

          this.state   = SWAPPING_L
          this.counter = TIME_SWAP
          break
        case SWAP_R:
          if (this.counter > 0) { return }
          this.state   = SWAPPING_R
          this.counter = TIME_SWAP
          break
        case SWAPPING_L:
          if (this.counter > 0) { return }
          this.state = STATIC
          break
        case SWAPPING_R:
          if (this.counter > 0) { return }
          this.state = STATIC
          break
        case STATIC:
          if ((this.under.empty && !this.empty) || this.under.state === HANG) {
            this.state   = HANG
            this.counter = 0
          } else if (this.danger && this.counter === 0) {
            // we add 1 otherwise we will miss out on one frame
            // since counter can never really hit zero and render
            this.counter = FRAME_DANGER.length+1
          }
          //if (this.under === blank) {
            //this.chain = false
          //} else if (this.under.state === HANG) {
            //this.state = HANG
            //this.counter =  this.under.counter
            //this.chain   = this.under.chain
          //} else if (this.under.empty && !this.empty) {
            //this.state = HANG
          //} else {
            //this.chain = false
          //}
          break;
        case HANG:
          if (this.counter > 0) { return }
          this.state = FALL
          break;
        case FALL:
          console.log(this.under.empty)
          if (this.counter > 0) { return }
          //console.log(this.under.empty)
          if (this.under.empty) {
            this.under.kind    = this.kind
            this.under.state   = this.state
            this.under.counter = this.counter
            this.under.chain   = this.chain

            this.kind    = null
            this.state   = STATIC
            this.counter = 0
            this.chain   = false
          } else {
            this.state   = LAND
            this.counter = FRAME_LAND.length
          }
          //} else if (this.under.state === CLEAR) {
            //this.state = STATIC
          //} else {
            //this.state   = this.under.state
            //this.counter = this.under.counter
            //this.chain   = this.under.chain
          //}
            //this.state   = LAND
            //this.counter = FRAME_LAND.length
          break;
        case CLEAR:
          if (this.counter > 0) { return }
          this.state   = STATIC
          this.kind    = null
          this.counter = 0
          this.chain   = false
          if (this.above && (!this.above.hidden)) {
            this.above.chain = true
          }
          break;
        case LAND:
          if (this.counter > 0) { return }
          this.state = STATIC
          break;
        default:
          throw(new Error('unknown panel state'))
      }
    }

    /**
     * Determines whether a panel should be visible or not
     * at the time of render
     */
    render_visible(){
      if (this.hidden){
        this.sprite.visible = false
      } else if (this.state === CLEAR && this.time_cur >= this.time_pop) {
        this.sprite.visible = false
      } else {
        this.sprite.visible = true
      }
    }
    /**
     * Swaps the this panel with the panel to it's right.
     */
    swap() {
      if (this.hidden && this.right.hidden) { return }

      this.counter        = 0
      this.right.counter  = 0

      this.chain       = false
      this.right.chain = false

      this.state       = SWAP_L
      this.right.state = SWAP_R

      game.sounds.swap()
    }
    /**
      Calculates and set the counter for the panel to pop
      @param {{number}} i
    */
    popping(i){
      this.counter = TIME_CLEAR + (TIME_POP*i) + TIME_FALL
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
     * @returns {number}
    */
    nocombo() {
      const arr = [0, 1, 2, 3, 4]
      if (this.above.kind){ arr.splice(arr.indexOf(this.above.kind), 1)}
      let values = ss.shuffle(arr,this.playfield.stage.rng())
      return this.i = values.find((i)=> {
        return this.matched(i) === false
      })
    }
    /** 
    * `danger()` will check if the this panel's column
    *  contains any active panel's a few panels from the top.
    *  and if it does it should return true, because this column
    *  in the stack is in danger.
    */
    get danger(){
      return !this.playfield.stack(this.x,1).hidden
    }
    /** 
    * `dead()` will check if the this panel's column contains
    * an active panel in the first row. If this is the case
    * then the this panel should be considered dead.
    */
    get dead(){
      return !this.playfield.stack(this.x,0).hidden
    }
    /** 
    * `newline()` checks if this panel is a newline.
    *  A panel is considered a newline when its the last
    *  row in the stack and the playfield should push panels,
    *  When a playfield should push panels it will add an extra
    *  row to the end of stack which for newline.
    */
    get newline(){
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
      if (this.state === CLEAR) { return [0, this.chain]; }
      this.state = CLEAR
      this.playfield.clearing.push(this)
      return [1, this.chain]
    }
    /**
     * Checks above and under and then left and right from the current panel
     * and returns if there  combo count and if there is chain
     *
     * @returns {{array}} [chain,combo]
     * */
    chain_and_combo() {
      let combo = 0
      let chain = false
      if (!this.comboable) { return [combo,chain] }
      [combo,chain] = Array.from(this.check_neighbours(this.left , this.right, combo, chain));
      [combo,chain] = Array.from(this.check_neighbours(this.above, this.under, combo, chain));
      return [combo,chain]
    }
    /**
     * Checks to see if the given panels form a combo with the current panel.
     *
     * @param {Object} panel1
     * @param {Object} panel2
     * @param {{number}} combo
     * @param {{boolean}} chain
     * @returns {{array}} [chain,combo]
     * */
    check_neighbours(p1,p2,combo,chain){
      if (
        !p1.comboable          || !p2.comboable ||
         p1.kind !== this.kind || p2.kind !== this.kind
      ) { return [combo,chain]; }
      const panel1  = p1.clear()
      const middle  = this.clear()
      const panel2  = p2.clear()

      combo  += panel1[0]
      combo  += middle[0]
      combo  += panel2[0]
      if (middle[1] || panel1[1] || panel2[1]) { chain = true; }
      return [combo,chain]
    }
    /**
     Returns the index of the current panel clearing and amount of panels clearing
     @returns {array} - [index,length]
     */
    get clear_index(){
      if (this.state !== CLEAR) {
        throw(new Error('clear_index called on none CLEAR panel'))
      }
      let panels = []
      for (let p of this.playfield.stack()){
        if (p.counter === this.counter &&
            p.state   === CLEAR) {
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
        this.frame = FRAME_NEWLINE
      } else if (this.dead === true && this.playfield.stage.state === 'gameover'){
        this.frame = FRAME_DEAD
      } else if (this.state === CLEAR){
        let [i,len] = this.clear_index
        let time_max = TIME_CLEAR + (TIME_POP*len) + TIME_FALL
        this.time_pop = TIME_CLEAR + (TIME_POP*i)
        this.time_cur = time_max - this.counter
        if (FRAME_CLEAR.length > this.time_cur){
          //if(i === 0){ console.log(time_cur,FRAME_CLEAR[time_cur])}
          this.frame = FRAME_CLEAR[this.time_cur]
        }
      } else if (this.state === LAND){
        this.frame = FRAME_LAND[FRAME_LAND.length-this.counter]
      } else if (this.state === SWAPPING_L || this.state === SWAPPING_R){
        let v = (UNIT / TIME_SWAP) * this.counter
        switch (this.state) {
          case SWAPPING_L:
            this.sprite.x += v
            break
          case SWAPPING_R:
            this.sprite.x -= v
            break
        }
        this.frame = FRAME_LIVE
      } else if (this.danger){
        const i = FRAME_DANGER[FRAME_DANGER.length - this.counter+1]
        this.frame = i
      } else {
        this.frame = FRAME_LIVE
      }
    }
    /** */
    render(){
      this.sprite.x = this.x * UNIT
      this.sprite.y = this.y * UNIT
      this.animate()
      this.render_visible()
    }
    /** */
    shutdown(){}
  } // klass
  Panel.initClass()
  return Panel
}
