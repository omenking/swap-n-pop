import game    from 'core/game'
import filters from 'core/filters'

const {px} = filters

export default class ComponentPlayfieldCountdown {
  load(snapshot) {
    this.state   = snapshot[0]
    this.counter = snapshot[1]
  }

  get snap() {
    return [this.state, this.counter]
  }

  create(playfield) {
    this.playfield = playfield

    const x = this.playfield.x+px(16);
    const y = px(-38);
    this.sprite = game.add.sprite(x, y, 'playfield_countdown', 0)

    if(this.playfield.should_countdown){
      this.counter = 0
      this.state   = 'moving'
    } else {
      this.state   = 'skip'
    }
  }

  update() {
    if (this.state === 'skip') { this.start() }
    if (this.state === 'moving') {
      if (this.sprite.y < px(80)) {
        this.sprite.y += px(4);
      } else {
        this.sprite.frame = 1;
        this.state = 3;
        this.playfield.cursor.entrance()
        game.sounds.blip()
      }
    }
    if (this.state === 3) {
      this.counter++;
      if (this.counter > 60) {
        game.sounds.blip()
        this.sprite.frame = 2;
        this.counter = 0;
        this.state = 2;
      }
    }
    if (this.state === 2) {
      this.counter++;
      if (this.counter > 60) {
        game.sounds.blip()
        this.sprite.frame = 3;
        this.counter = 0;
        this.state = 1;
      }
    }
    if (this.state === 1) {
      this.counter++;
      if (this.counter > 60) {
        this.start()
      }
    }
  }

  start() {
    game.sounds.ding()
    this.sprite.visible         = false
    this.playfield.cursor.state = 'active'
    if (this.playfield.stage.cpu[0] === false ||
       (this.playfield.stage.online !== false &&
        this.playfield.pi == 0
       )){
      this.playfield.cursor.map_controls()
    }
    this.playfield.cursor.sprite.visible = true
    this.playfield.stage.state = 'running'
    if (this.playfield.stage.timer) {
      this.playfield.stage.timer.running = true
    }

    game.sounds.stage_music('active')
    this.state = null
  }

  render() {
  }
}
