import game    from 'core/game'
import ComponentPlayfield from 'components/playfield'
import { WALL_ROLLUP, TIME_WALL_WAIT, ROLLUP, ROLLDOWN, WAIT, DONE } from 'common/data';
import { px } from 'core/filters';

export default class ComponentPlayfieldWall {
  private playfield : ComponentPlayfield
  private x         : number
  private y         : number
  private sprite    : Phaser.Sprite
  private counter   : number
  public state : string
  private state_timer   : number
  private state_enter   : any
  private state_execute : any
  private state_exit    : any

  create(playfield,x,y) {
    this.playfield = playfield
    this.sprite    = game.add.sprite(x, y, `playfield_wall${this.playfield.pi}`)
    this.state     = ROLLUP
    this.state_timer = 0
    this.state_enter   = new Map()
    this.state_execute = new Map()
    this.state_exit    = new Map()

    this.state_execute.set(ROLLUP  , this.rollup_execute.bind(this))
    this.state_execute.set(ROLLDOWN, this.rolldown_execute.bind(this))
    this.state_execute.set(WAIT    , this.wait_execute.bind(this))
    this.state_execute.set(DONE    , this.done_execute.bind(this))
  }

  rollup_execute(){
    if (this.state_timer >= WALL_ROLLUP.length-1) {
      this.change_state(WAIT)
    }
  }
  wait_execute(){
    if (this.state_timer >= TIME_WALL_WAIT) {
      this.change_state(ROLLDOWN)
    }
  }
  rolldown_execute(){
    if (this.state_timer >= WALL_ROLLUP.length-1) {
      this.change_state(DONE)
    }
  }
  done_execute(){

  }


  get snap(){
    return [
      this.state,
      this.state_timer
    ]
  }

  load(snapshot){
    this.state       = snapshot[0]
    this.state_timer = snapshot[1]
  }

  change_state(state) {
    if (this.state === state) { return; }
    this.state_timer = 0
    if (this.state_exit.has(this.state))
      this.state_exit.get(this.state)()
    this.state = state
    if (this.state_enter.has(this.state))
      this.state_enter.get(this.state)()
  }

  update() {
    this.state_execute.get(this.state)()
    ++this.state_timer
  }

  render() {
    const y_offset = 168
    const len      = WALL_ROLLUP.length-1
    switch (this.state){
      case ROLLUP:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[this.state_timer])
        )
        break;
      case WAIT:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[len])
        )
        break;
      case ROLLDOWN:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[len-this.state_timer])
        )
        break;
      case DONE:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[0])
        )
        break;
    }
  }
}
