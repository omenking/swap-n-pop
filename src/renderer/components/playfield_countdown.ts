import game    from 'core/game'
import filters from 'core/filters'
import ComponentPlayfield from 'components/playfield'

const {px} = filters

// states
const MOVING = Symbol('moving')
const SKIP   = Symbol('skip')
const COUNT3 = Symbol('3')
const COUNT2 = Symbol('2')
const COUNT1 = Symbol('1')

export default class ComponentPlayfieldCountdown {
  public  state      : Symbol
  private counter    : number
  private sprite     : Phaser.Sprite
  private playfield  : ComponentPlayfield

  private states = []

  load =(snapshot)=> {
    this.state   = snapshot[0]
    this.counter = snapshot[1]
  }

  get snap() {
    return [this.state, this.counter]
  }

  create =(playfield)=> {
    this.playfield = playfield

    const x = this.playfield.x+px(16);
    const y = px(-38);
    this.sprite = game.add.sprite(x, y, 'playfield_countdown', 0)

    if(this.playfield.should_countdown){
      this.counter = 0
      this.state = MOVING
    } else {
      this.state = SKIP
    }
  }

  update =()=> {
    if (this.state === SKIP) { this.start() }
    if (this.state === MOVING) {
      if (this.sprite.y < px(80)) {
        this.sprite.y += px(4);
      } else {
        this.sprite.frame = 1;
        this.state = COUNT3
        this.playfield.cursor.entrance()
        game.sounds.blip()
      }
    }
    if (this.state === COUNT3) {
      this.counter++;
      if (this.counter > 60) {
        game.sounds.blip()
        this.sprite.frame = 2;
        this.counter = 0;
        this.state = COUNT2;
      }
    }
    if (this.state === COUNT2) {
      this.counter++;
      if (this.counter > 60) {
        game.sounds.blip()
        this.sprite.frame = 3;
        this.counter = 0;
        this.state = COUNT1;
      }
    }
    if (this.state === COUNT1) {
      this.counter++;
      if (this.counter > 60) {
        this.start()
      }
    }
  }

  start =()=> {
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

  render =()=> {
  }
}
