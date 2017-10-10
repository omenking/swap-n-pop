module.exports = function(game){
  const APP = require('../../../app')('../../../');
  const {
    COLS,
    ROWS,
    UNIT,
    STARTPOS_PANELCURSOR_SPEED,
    PANELCURSOR_CHECK_SPEED
  } = require(APP.path.core('data'));
  
  class Cursor {
    /** bindings only */
    constructor() {
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.render = this.render.bind(this);
      this.shutdown = this.shutdown.bind(this);

      this.load = this.load.bind(this);
      this.entrance = this.entrance.bind(this);
      this.map_controls = this.map_controls.bind(this);
      
      this.pressed_then_held = this.pressed_then_held.bind(this);
      this.pause = this.pause.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.left = this.left.bind(this);
      this.right = this.right.bind(this);
      this.swap = this.swap.bind(this);
      this.push = this.push.bind(this);
    }

    /**
     * Initialises the Cursor's position in x & y, counter, and its sprite
     * Also adds this sprite to a layer above the blocks
     * @param {object} playfield 
     */
    create(playfield){
      this.playfield = playfield;
      this.state      = 'hidden';

      this.counter_flicker = 0;
      this.counter         = 0;
      this.x = 2;
      this.y = 6;

      const diff = (UNIT / 16) * 3;
      let x,y, visible;
      if(this.playfield.should_countdown){
        x = (this.x * UNIT) - diff;
        y = (this.y * UNIT) - diff;
        visible = true;
      } else {
        x = ((COLS-2)*UNIT)-diff;
        y = 0-diff;
        visible = false;
        this.state = 'active';
        this.map_controls();
      }
      this.sprite = game.make.sprite(x, y, 'playfield_cursor', 0);
      this.sprite.animations.add('idle', [0,1]);
      this.sprite.animations.play('idle', Math.round(game.time.desiredFps / 10), true);
      this.sprite.visible = visible;

      this.playfield.layer_cursor.add(this.sprite);

      this.ignore = false;
    }

    get snap() {
      return [
        this.x,
        this.y,
        this.state,
        this.counter_flicker,
        this.counter
      ];
    }

    load(data){
      this.x               = data[0];
      this.y               = data[1];
      this.state           = data[2];
      this.counter_flicker = data[3];
      this.counter         = data[4];
    }

    entrance() {
      this.sprite.visible = true;
      this.state = 'entering';
    }

    map_controls() {
      game.controls.map(this.playfield.pi, {
        up   : this.up,
        down : this.down,
        left : this.left,
        right: this.right,
        a    : this.swap,
        b    : this.swap,
        l    : this.push,
        r    : this.push,
        start: this.pause
      });
    }

    /**
     * If tick was at 0 or tick is over a certain number return true
     * @param {integer} tick increasing counter
     * @returns bool
     */
    pressed_then_held(tick) {
      if (tick == 0) 
        this.ignore = false;

      if (tick > 15)
        this.ignore = true;

      return this.ignore || tick == 0;
    }

    /**
     * Moves the cursor up once if it isnt at the top of the playfield,
     * only when pressed_then_held returns true
     * @param {integer} tick increasing counter
     */
    up(tick) {
      if (this.pressed_then_held(tick)) 
        if (this.y > 0) {
          this.y--; 
          game.sounds.select();
        }
    }
    
    /**
     * Moves the cursor down once if it isnt at the bottom of the playfield,
     * only when pressed_then_held returns true
     * @param {integer} tick increasing counter
     */
    down(tick) {
      if (this.pressed_then_held(tick))        
        if (this.y < (ROWS - 1)) {
          this.y++; 
          game.sounds.select();
        }
    }

    /**
     * Moves the cursor down once if it isnt at the left of the playfield,
     * only when pressed_then_held returns true
     * @param {integer} tick increasing counter
     */
    left(tick) {
      if (this.pressed_then_held(tick)) 
        if (this.x > 0) { 
            this.x--; 
            game.sounds.select();
        }
    }

    /**
     * Moves the cursor down once if it isnt at the right of the playfield,
     * only when pressed_then_held returns true
     * @param {integer} tick increasing counter
     */
    right(tick) {
      if (this.pressed_then_held(tick)) 
        if (this.x < (COLS - 2)) { 
          this.x++; 
          game.sounds.select();
        }
    }

    /**
     * Calls the attached Playfield's swap method from where the Player hovers over
     * Only triggered when the key is pressed once, the playfields state is running and
     * the cursor's state is active
     * @param {integer} tick increasing counter
     */
    swap(tick) {
      if (tick > 0 || 
          this.playfield.stage.state !== 'running' || 
          this.state !== 'active') 
        return; 
      
      this.playfield.swap(this.x, this.y);
    }

    /**
     * Calls the Pause method of the stage when a button is pressed
     * @param {integer} tick acts as a timer - allows only keypresses
     */
    pause(tick) {
      if (tick > 0) 
        return; 

      this.playfield.stage.pause();
    }

    /**
     * Calls the attached Playfield's push method to move all the panels higher
     * Only triggered when the playfields state is running and the cursor's state is active
     * @param {integer} tick increasing counter
     */
    push(tick) {
      if (this.playfield.stage.state !== 'running' || 
          this.state !== 'active')  
        return;
      
      this.playfield.pushing = true;
    }

    update() {
      // should check in a deterministic way for preactive
      let diff = (UNIT / 16) * 3;
      let x = (this.x * UNIT) - diff;
      let y = (this.y * UNIT) - diff;

      if ((this.state === 'entering') ||
          (this.state === 'preactive')) {
        this.counter_flicker++;
        if (this.counter_flicker > 1) {
          this.counter_flicker = 0;
        }
      }
      switch (this.state) {
        case 'entering':

          if      (this.sprite.y < y){}
          else if (this.sprite.x > x){}
          else {
            this.state = 'preactive'
            if (this.playfield.stage.cpu[0] === false ||
               (this.playfield.stage.online !== false &&
                this.playfield.pi == 0
               )){
              this.map_controls();
            }
          }
          break;
      }
    }

    render(){
      let diff = (UNIT / 16) * 3;
      let x = (this.x * UNIT) - diff;
      let y = (this.y * UNIT) - diff;

      if ((this.state === 'entering') ||
          (this.state === 'preactive')) {
        if (this.counter_flicker > 1) {
          this.sprite.visible = !this.sprite.visible;
        }
      }
      switch (this.state) {
        case 'entering':
          if      (this.sprite.y < y) {this.sprite.y += STARTPOS_PANELCURSOR_SPEED}
          else if (this.sprite.x > x) {this.sprite.x -= STARTPOS_PANELCURSOR_SPEED}
          break;
        case 'preactive': case 'active':
          this.sprite.x = x;
          this.sprite.y = y;
          break;
      }
    }

    shutdown() {
    }
  }

  return Cursor;
}
