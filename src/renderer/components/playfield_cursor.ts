import game     from 'core/game'
import controls from 'core/controls'
import ComponentPlayfield from 'components/playfield'

import {
  COLS,
  ROWS_INV,
  ROWS_VIS,
  ROWS,
  UNIT,
  STARTPOS_PANELCURSOR_SPEED,
  RUNNING,
  STARTING,
  MOVING,
  PLAYFIELD_CURSOR_SPEED
} from 'core/data';

export default class ComponentPlayfieldCursor {
  public cursor_swap_history : Array<any>
  private playfield       : ComponentPlayfield
  public  state           : string
  private counter_flicker : number
  private counter         : number
  private ignore          : boolean

  // sprite should never be private, something must be using it externally
  public sprite          : Phaser.Sprite

  public  mode            : string
  public  x               : number
  public  y               : number
  private  visible        : boolean
  /**
   * Initialises the Cursor's position in x & y, counter, and its sprite
   * Also adds this sprite to a layer above the blocks
   * @param {object} playfield
   * @param {string} mode B button changes methods depending on the stage
   */
  create(playfield, modetype = "vs") {
    this.playfield  = playfield
    this.state      = 'hidden'

    this.counter_flicker = 0
    this.counter         = 0

    // this is the starting position of the
    // cursor. We have to offset using ROWS_INV
    // to get its correct position for visible porition
    // of the playfield
    this.x = 2
    this.y = 6 + ROWS_INV

    let x,y, visible

    if(this.playfield.stage.countdown.state === MOVING){
      x = ((COLS-2)*UNIT) - this.offset
      y = 0               - this.offset
      visible = false
    } else {
      x = (this.x * UNIT) - this.offset
      y = (this.y * UNIT) - this.offset
      visible = true
      this.state = 'active'
      this.map_controls()
    }
    this.sprite = game.make.sprite(x, y, 'playfield_cursor', 0);
    this.sprite.visible = visible;

    this.playfield.layer_cursor.add(this.sprite);

    this.ignore = false;

    this.mode = modetype;
    this.cursor_swap_history = [];
  }

  /**
   * This is the offset for the cursor so it appears
   * perfectly over the panel
   */
  get offset() {
    return (UNIT / 16) * 3
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

  load(data) {
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

  /**
   * defines the game controls and links the callsbacks to this cursors methods
   */
  map_controls() {
    controls.map(this.playfield.pi, {
      up   : this.up.bind(this),
      down : this.down.bind(this),
      left : this.left.bind(this),
      right: this.right.bind(this),
      a    : this.swap.bind(this),
      b    : this.mode === "vs" ? this.swap.bind(this) : this.undo_swap.bind(this),
      l    : this.push.bind(this),
      r    : this.push.bind(this),
      start: this.pause.bind(this)
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

    if (tick > PLAYFIELD_CURSOR_SPEED)
      this.ignore = true;

    return this.ignore || tick == 0;
  }

  /**
   * Moves the cursor up once if it isnt at the top of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
   */
  up(tick) {
    if (this.pressed_then_held(tick))
      if (this.y > ROWS_VIS) {
        this.y--;
        game.sounds.select();
      }
  }

  /**
   * Moves the cursor down once if it isnt at the bottom of the playfield,
   * only when pressed_then_held returns true
   * @param {integer} tick increasing counter
   * @returns true if actually moved
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
   * @returns true if actually moved
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
   * @returns true if actually moved
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
   *
   * puzzle mode - saves the panel positions of all blocks after each swap
   *
   * @param {integer} tick increasing counter
   */
  swap(tick) {
    if (tick > 0 || this.playfield.stage.state !== RUNNING)
      return;

    if (this.playfield.swap(this.x, this.y))
      if (this.mode === "puzzle") {
        let kinds = [];
        this.playfield.stack.forEach((panel, i) => {
          kinds[i] = panel.kind;
        });
        this.cursor_swap_history.push(kinds);
      }
  }

  /**
   * undoes the latest swap - up to the beginning before swapping started
   * @param {integer} tick acts as a timer - allows only keypresses
   */
  undo_swap(tick) {
    if (tick > 0)
      return;

    // reset stack, decrease counter by one!
    if (this.cursor_swap_history.length !== 0)
      this.playfield.reset_stack(this.cursor_swap_history.pop(), --this.playfield.swap_counter);
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
    if (this.playfield.stage.state !== RUNNING)
      return;
    this.playfield.pushing = true;
  }

  /** updates the internal x & y pos, animation for flickers, setting controls once entered */
  update() {
    // should check in a deterministic way for preactive
    let x = (this.x * UNIT) - this.offset;
    let y = (ROWS_INV * UNIT) + (this.y * UNIT) - this.offset;

    if (['entering','preactive'].includes(this.state)) {
      this.counter_flicker++;
      if (this.counter_flicker > 1)
        this.counter_flicker = 0;
    }
  }

  get stage(){
    return this.playfield.stage
  }

  get frame(){
    return Math.floor(this.playfield.stage.tick / 12) % 2
  }

  render_visible(){
    if (this.stage.state === STARTING) {
      this.sprite.visible = this.counter_flicker === 1
    } else {
      this.sprite.visible = true
    }
  }
  /** updates the actual sprite position, almost the same as update() */
  render() {
    let x = (this.x * UNIT) - this.offset
    let y = (this.y * UNIT) - this.offset

    this.render_visible()
    switch (this.state) {
      case 'entering':
        // increases by STARTPOS_PANELCURSOR_SPEED until y is reached, then sets it to y
        this.sprite.y = this.sprite.y < y ? this.sprite.y + STARTPOS_PANELCURSOR_SPEED : y;

        // once sprite.y has reached its goal position move x the same way
        if (this.sprite.y === y)
          this.sprite.x = this.sprite.x > x ? this.sprite.x - STARTPOS_PANELCURSOR_SPEED : x;

        if (this.sprite.x === x && this.sprite.y === y) {
          this.map_controls();
          this.state = "preactive";
        }

        break;
      case 'preactive':
        this.sprite.x = x;
        this.sprite.y = y;
        break;
      case 'active':
        this.sprite.x = x;
        this.sprite.y = y;
        break;
    }
    this.sprite.frame = this.frame
  }

  /** empty */
  shutdown() {
  }
}
