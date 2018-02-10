import game   from 'core/game'
import { px } from 'core/filters'
import { WALL_ROLLUP, TIME_WALL_WAIT, ROLLUP, ROLLDOWN, WAIT, DONE } from 'common/data';

export default class WallState {
  public  y       : number
  private counter : number
  public  state   : string
  private state_timer   : number
  private state_enter   : any
  private state_execute : any
  private state_exit    : any
  public callback_wall_rollup_exit : any
  public callback_rolldown_done : any

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

  create(callback_wall_rollup_exit, callback_rolldown_done){
    this.callback_wall_rollup_exit = callback_wall_rollup_exit
    this.callback_rolldown_done = callback_rolldown_done
    this.state = ROLLUP
    this.state_timer = 0
    this.state_enter   = new Map()
    this.state_execute = new Map()
    this.state_exit    = new Map()

    this.state_execute.set(ROLLUP  , this.rollup_execute.bind(this))
    this.state_exit.set(ROLLUP     , this.rollup_exit.bind(this))
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

  rollup_exit(){
    this.callback_wall_rollup_exit()
  }

  rolldown_execute(){
    if (this.state_timer >= WALL_ROLLUP.length-1) {
      this.change_state(DONE)
    }
  }
  done_execute(){
    this.callback_rolldown_done()
    this.state = ROLLUP
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
}
