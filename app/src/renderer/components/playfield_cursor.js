module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    COLS,
    ROWS,
    UNIT,
    STARTPOS_PANELCURSOR_SPEED
  } = require(APP.path.core('data'))
  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.load = this.load.bind(this)
      this.entrance = this.entrance.bind(this)
      this.map_controls = this.map_controls.bind(this)
      this.pause = this.pause.bind(this)
      this.up = this.up.bind(this)
      this.down = this.down.bind(this)
      this.left = this.left.bind(this)
      this.right = this.right.bind(this)
      this.swap = this.swap.bind(this)
      this.can_push = this.can_push.bind(this)
    }

    create(playfield){
      this.playfield = playfield
      this.state      = 'hidden'

      this.counter_flicker = 0
      this.counter         = 0
      this.x = 2
      this.y = 6

      const diff = (UNIT / 16) * 3
      let x,y, visible
      if(this.playfield.should_countdown){
        x = (this.x * UNIT) - diff
        y = (this.y * UNIT) - diff
        visible = true
      } else {
        x = ((COLS-2)*UNIT)-diff
        y = 0-diff
        visible = false
        this.state = 'active'
        this.map_controls()
      }
      this.sprite = game.make.sprite(x, y, 'playfield_cursor', 0)
      this.sprite.animations.add('idle', [0,1])
      this.sprite.animations.play('idle', Math.round(game.time.desiredFps / 10), true)
      this.sprite.visible = visible

      this.playfield.layer_cursor.add(this.sprite)
    }

    get snap() {
      return [
        this.x,
        this.y,
        this.state,
        this.counter_flicker,
        this.counter
      ]
    }

    load(data){
      this.x               = data[0]
      this.y               = data[1]
      this.state           = data[2]
      this.counter_flicker = data[3]
      this.counter         = data[4]
    }

    entrance() {
      this.sprite.visible = true
      this.state = 'entering'
    }
    map_controls() {
      game.controls.map(this.playfield.pi, {
        up   : this.up,
        down : this.down,
        left : this.left,
        right: this.right,
        a    : this.swap,
        b    : this.swap,
        start: this.pause
      });
    }
    pause(tick) {
      if (tick > 0) { return }
      this.playfield.stage.pause(this.playfield.pi);
    }
    up(tick) {
      if (tick > 0) { return }
      console.log('MOVE',this.y)
      game.sounds.select()
      if (this.y > 0) { this.y--; }
    }
    down(tick) {
      if (tick > 0) { return }
      game.sounds.select()
      if (this.y < (ROWS - 1)) { this.y++; }
    }
    left(tick) {
      if (tick > 0) { return }
      game.sounds.select()
      if (this.x > 0) { this.x--; }
    }
    right(tick) {
      if (tick > 0) { return }
      game.sounds.select()
      if (this.x < (COLS - 2)) { this.x++; }
    }
    swap(tick) {
      if (tick > 0) { return }
      if (!this.playfield.running || (this.state !== 'active')) { return; }
      return this.playfield.swap(this.x, this.y);
    }
    can_push() {
      return (game.controls.is_down(this.playfield.pi,'l') ||
              game.controls.is_down(this.playfield.pi,'r')) &&
              this.playfield.running &&
              (this.state === 'active')
    }
    update() {
      // should check in a deterministic way for preactive
      let diff = (UNIT / 16) * 3
      let x = (this.x * UNIT) - diff
      let y = (this.y * UNIT) - diff

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
              this.map_controls()
            }
          }
          break
      }
    }

    render(){
      let diff = (UNIT / 16) * 3
      let x = (this.x * UNIT) - diff
      let y = (this.y * UNIT) - diff

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
          break
        case 'preactive': case 'active':
          this.sprite.x = x
          this.sprite.y = y
          break
      }
    }

    shutdown() {
    }
  }
  return controller
}
