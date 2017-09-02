module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const {
    UNIT,
    SWAP,
    STATIC,
    HANG,
    FALL,
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

  class controller {
    constructor() {
      this.serialize = this.serialize.bind(this);
      this.deserialize = this.deserialize.bind(this);
      this.create = this.create.bind(this);
      this.set_blank = this.set_blank.bind(this);
      this.is_swappable = this.is_swappable.bind(this);
      this.is_support = this.is_support.bind(this);
      this.is_clearable = this.is_clearable.bind(this);
      this.is_comboable = this.is_comboable.bind(this);
      this.is_empty = this.is_empty.bind(this);
      this.set_state = this.set_state.bind(this);
      this.set_i = this.set_i.bind(this);
      this.set_counter = this.set_counter.bind(this);
      this.set_chain = this.set_chain.bind(this);
      this.matched = this.matched.bind(this);
      this.frames = this.frames.bind(this);
      this.frame = this.frame.bind(this);
      this.play_land = this.play_land.bind(this);
      this.play_clear = this.play_clear.bind(this);
      this.play_live = this.play_live.bind(this);
      this.play_dead = this.play_dead.bind(this);
      this.play_danger = this.play_danger.bind(this);
      this.play_newline = this.play_newline.bind(this);
      this.set_animation = this.set_animation.bind(this);
      this.set = this.set.bind(this);
      this.update_state = this.update_state.bind(this);
      this.render = this.render.bind(this);
      this.render_visible = this.render_visible.bind(this);
      this.fall = this.fall.bind(this);
      this.swap = this.swap.bind(this);
      this.erase = this.erase.bind(this);
      this.popping = this.popping.bind(this);
      this.clear = this.clear.bind(this);
      this.nocombo = this.nocombo.bind(this);
      this.chain_and_combo = this.chain_and_combo.bind(this);
      this.check_neighbours = this.check_neighbours.bind(this);
      this.check_dead = this.check_dead.bind(this);
      this.update_neighbours = this.update_neighbours.bind(this);
      this.update = this.update.bind(this);
    }

    static initClass() {
      this.prototype.playfield          = null;
      this.prototype.x                  = null;
      this.prototype.y                  = null;
      this.prototype.state              = null;
      this.prototype.above              = null;
      this.prototype.under              = null;
      this.prototype.left               = null;
      this.prototype.right              = null;
      this.prototype.counter            = 0; //counter ie exclusivly used to count down time until clear.
      this.prototype.animation_state    = null;
      this.prototype.animation_counter  = 0;
      this.prototype.chain              = null;
      this.prototype.sprite             = null;
      this.prototype.i                  = null;
    }
    serialize() {
      return [
        this.x,
        this.y,
        this.i,
        this.state,
        this.chain,
        this.counter,
        this.counter_popping,
        this.animation_state,
        this.animation_counter
      ];
    }
    deserialize(data){
      this.x                 = data[0]
      this.y                 = data[1]
      this.i                 = data[2]
      this.state             = data[3]
      this.chain             = data[4]
      this.counter           = data[5]
      // maybe we can infer these 3 if we reorganize our code
      this.counter_popping   = data[6]
      this.animation_state   = data[7]
      this.animation_counter = data[8]

      //we need to infer these
      //this.sprite.frame      = data[4]
      //this.sprite.visible    = data[5]
      //this.danger            = data[10]
    }
    create(playfield, x, y, blank){
      this.playfield = playfield;
      this.x = x;
      this.y = y;
      if (blank == null) { blank = false; }
      this.danger = false;
      this.set_state(STATIC);
      this.set_chain(false);
      if (blank) { this.set_blank(); }

      this.sprite = game.make.sprite(0, 0, 'panels', this.frame(0));
      this.playfield.layer_block.add(this.sprite);
    }

    // A blank block will see itself as its neighbors.
    // It is never supposed to have a sprite and should always have a state
    // of STATIC.
    // The blank is used on the outer edges of the grid.
    set_blank() {
      this.blank             = true
      this.x                 = null
      this.y                 = null
      this.under             = this
      this.above             = this
      this.left              = this
      this.right             = this
      this.set_state(STATIC)
      this.set_counter(0)
      this.animation_state   = null
      this.animation_counter = 0
    }
    is_swappable() {  return (this.above.state !== HANG) && (this.counter === 0); }
    is_support() {   return (this.state !== FALL) && ((this.i !== null) || (this.playfield.blank === this)); }
    is_clearable() {  return this.is_swappable() && this.under.is_support() && (this.i !== null); }
    is_comboable() {  return this.is_clearable() || ((this.state === CLEAR) && this.clearing); }
    is_empty() {      return (this.counter === 0) && (this.i === null) && (this !== this.playfield.blank); }
    set_state(v){
      //this.playfield.track_panel(this, 'state', v);
      return this.state = v;
    }
    set_i(v){
      //this.playfield.track_panel(this, 'i', v);
      return this.i = v;
    }
    set_counter(v){
      //this.playfield.track_panel(this, 'counter', v);
      return this.counter = v;
    }
    set_chain(v){
      //this.playfield.track_panel(this, 'chain', v);
      return this.chain = v;
    }
    matched(i){
      const pos = _f.xy_2_i(this.x, this.y);

      const left  = this.playfield.panel_i(pos-1);
      const right = this.playfield.panel_i(pos+1);
      const under = this.playfield.panel_i(pos+(1*COLS));
      const above = this.playfield.panel_i(pos-(1*COLS));

      const left2  = this.playfield.panel_i(pos-2);
      const right2 = this.playfield.panel_i(pos+2);
      const under2 = this.playfield.panel_i(pos+(2*COLS));
      const above2 = this.playfield.panel_i(pos-(2*COLS));

      return ((left  === i) && (right  === i)) ||
      ((above === i) && (under  === i)) ||
      ((above === i) && (above2 === i)) ||
      ((under === i) && (under2 === i)) ||
      ((left  === i) && (left2  === i)) ||
      ((right === i) && (right2 === i));
    }

    frames(arr){
      const frames = [];
      for (let f of Array.from(arr)) { frames.push(this.frame(f)); }
      return frames;
    }
    frame(i){
      return (this.i * 8) + i;
    }
    play_land() {    return this.sprite.animations.play('land' , game.time.desiredFps, false); }
    play_clear() {   return this.sprite.animations.play('clear', game.time.desiredFps, false); }
    play_live() {    return this.sprite.animations.play('live'); }
    play_dead() {    return this.sprite.animations.play('dead'); }
    play_danger() {  return this.sprite.animations.play('danger', game.time.desiredFps/3, true); }
    play_newline() { return this.sprite.animations.play('newline'); }

    set_animation() {
      this.sprite.frame = this.frame(0);
      this.sprite.animations.add('land'   , this.frames(FRAME_LAND));
      this.sprite.animations.add('clear'  , this.frames(FRAME_CLEAR));
      this.sprite.animations.add('live'   , this.frames(FRAME_LIVE));
      this.sprite.animations.add('danger' , this.frames(FRAME_DANGER));
      this.sprite.animations.add('dead'   , this.frames(FRAME_DEAD));
      this.sprite.animations.add('newline', this.frames(FRAME_NEWLINE));
    }
    set(i){
      switch (i) {
        case 'unique':
          this.nocombo();
          break;
        default:
          this.set_i(i);
      }
      return this.set_animation();
    }
    update_state(i){
      if (this.blank)      { return; } //blank sprite
      if (this.i === null) { return; }
      if (this.newline())    { return; }
      if (this.counter_popping > 0) {
        this.counter_popping--;
      } else if (this.counter_popping === 0) {
        this.counter_popping = null;
      }

      if (this.counter > 0) {
        //if @x is 2 && @y is 9
          //console.log "counter--", i
        this.counter--;
        if (this.counter > 0) { return; }
      }
      /* Run through the state switch to determine behaviour */
      switch (this.state) {
        case STATIC: case SWAP:
          if (this.under === this.playfield.blank) {
            this.set_state(STATIC);
            this.set_chain(false);
          } else if (this.under.state === HANG) {
            this.set_state(HANG);
            this.set_counter(this.under.counter);
            this.set_chain(this.under.chain);
          } else if (this.under.is_empty()) {
            this.set_state(HANG);
          } else {
            this.set_chain(false);
          }
          break;
        case HANG:
          this.set_state(FALL);
          break;
        case FALL:
          if (this.under.is_empty()) {
            this.fall();
          } else if (this.under.state === CLEAR) {
            this.state = STATIC;
          } else {
            this.set_state(this.under.state);
            this.set_counter(this.under.counter);
            this.set_chain(this.under.chain);
          }
          if (((this.state === STATIC) || (this.state === SWAP)) && this.sprite) {
            this.play_land();
            this.playfield.land = true;
          }
          break;
        case CLEAR:
          this.erase();
          break;
        default:
          console.log("Unknown block state");
      }
    }

    render(){
      if (!this.sprite) { return; }
      this.sprite.x = this.x * UNIT;
      if (this.newline()) {
        return this.sprite.y = ROWS * UNIT;
      } else {
        const y = this.playfield.should_push ? this.y : this.y+1;
        this.sprite.y = y * UNIT;
        if (this.animation_counter <= 0) { this.animation_state = null; }
        if (this.animation_counter > 0) { this.animation_counter--; }
        switch (this.animation_state) {
          case ANIM_SWAP_LEFT:
            var step = UNIT / TIME_SWAP;
            return this.sprite.x += step * this.animation_counter;
          case ANIM_SWAP_RIGHT:
            return this.sprite.x -= step * this.animation_counter;
        }
      }

      this.render_visible()
    }
    render_visible(){
      if (this.i === null || this.counter_popping === 0){
        this.sprite.visible = false
      } else {
        this.sprite.visible = true
      }
    }
    fall() {
      this.under.set_state(this.state)
      this.under.set_counter(this.counter)
      this.under.set_chain(this.chain)
      this.under.set_i(this.i)
      this.under.set_animation()
      this.under.sprite.frame   = this.sprite.frame

      this.set_state(STATIC)
      this.set_counter(0)
      this.set_chain(false)
      this.set_i(null)
    }
    // Swap this block with its right neighbour.
    swap() {
      //swap i
      const i1 = this.i;
      const i2 = this.right.i;
      this.set_i(i2);
      this.right.set_i(i1);

      //swap danger
      const d1 = this.danger;
      const d2 = this.right.danger;
      this.danger       = d2;
      this.right.danger = d1;

      this.set_animation();
      this.right.set_animation();

      this.right.set_chain(false);
      this.set_chain(false);

      if ((this.i !== null) || (this.right.i !== null)) {
        this.playfield.sfx_swap.play();
      }

      if (this.i === null) {
        this.set_state(SWAP);
        this.set_counter(0);
      } else {
        this.set_state(SWAP);
        this.set_counter(TIME_SWAP);
        this.animation_state   = ANIM_SWAP_LEFT;
        this.animation_counter = TIME_SWAP;
      }

      if (this.right.i === null) {
        this.right.set_state(SWAP);
        //@right.counter = 0
        return this.right.set_counter(0);
      } else {
        this.right.set_state(SWAP);
        this.right.set_counter(TIME_SWAP);
        this.right.animation_state   = ANIM_SWAP_RIGHT;
        return this.right.animation_counter = TIME_SWAP;
      }
    }
    // Erase the contents of this block and start a chain in
    // its upper neighbour.
    erase() {
      this.playfield.track_tick();
      this.set_i(null);
      this.set_state(STATIC);
      this.set_counter(0);
      this.set_chain(false);
      if (this.above && (this.above.i !== null)) {
        this.above.set_chain(true);
        //return console.log('above', this.above.x, this.above.y, this.above.chain);
      }
    }
    popping(i){
      const time = TIME_CLEAR + (TIME_POP*this.playfield.panels_clearing.length) + TIME_FALL;
      this.set_counter(time);
      this.clearing = false;
      return this.counter_popping = TIME_CLEAR + (TIME_POP*(i+1));
    }
      //@playfield.track_tick()
    clear() {
      if (this.state === CLEAR) { return [0, this.chain]; }
      this.clearing = true;
      this.set_state(CLEAR);
      this.playfield.panels_clearing.push(this);
      this.play_clear();
      return [1, this.chain];
    }
    nocombo() {
      let values = ss.shuffle([0, 1, 2, 3, 4],this.playfield.stage.rng());
      return this.i = values.find((i)=> {
        return this.matched(i) === false
      })
    }
    newline(){
      return this.should_push && this.x === 0
    }
    chain_and_combo() {
      let combo = 0;
      let chain = false;
      if (!this.is_comboable()) { return [combo,chain]; }
      [combo,chain] = Array.from(this.check_neighbours(this.left , this.right, combo, chain));
      [combo,chain] = Array.from(this.check_neighbours(this.above, this.under, combo, chain));
      return [combo,chain];
    }
    check_neighbours(p1,p2,combo,chain){
      if (!p1.is_comboable() || (p1.i !== this.i)  ||
                                  !p2.is_comboable() || (p2.i !== this.i)) { return [combo,chain]; }
      const panel1  = p1.clear();
      const middle  = this.clear();
      const panel2  = p2.clear();

      combo  += panel1[0];
      combo  += middle[0];
      combo  += panel2[0];
      if (middle[1] || panel1[1] || panel2[1]) { chain   = true; }
      return [combo,chain];
    }
    check_dead(i,is_dead){
      const [x,y] = Array.from(_f.i_2_xy(i));
      if (is_dead && (is_dead.indexOf(x) !== -1)) {
        return this.play_dead();
      } else {
        return this.play_live();
      }
    }
    update_neighbours(i){
      this.left  = ((i+1) % COLS) === 1   ? this.playfield.blank : this.playfield.stack[i-1]
      this.right = ((i+1) % COLS) === 0   ? this.playfield.blank : this.playfield.stack[i+1]
      this.under = (i+1) >= (PANELS-COLS) ? this.playfield.blank : this.playfield.stack[i+COLS]
      this.above = (i+1) <= COLS          ? this.playfield.blank : this.playfield.stack[i-COLS]
    }
    update(i,is_danger){
      if (!this.playfield.running) { return; }
      const [x,y] = Array.from(_f.i_2_xy(i));
      if (is_danger && (is_danger.indexOf(x) !== -1)) {
        if (this.danger === false) {
          this.play_danger();
        }
        this.danger = true;
      } else {
        if (this.danger === true) {
          this.play_live();
        }
        this.danger = false;
      }

      console.log("BLANK",this.playfield.blank)
      this.update_neighbours(i)
      this.update_state(i)
      this.x = x
      this.y = y
    }
  }
  controller.initClass();

  return controller
}
