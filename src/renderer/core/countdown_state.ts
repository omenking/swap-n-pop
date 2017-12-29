import game   from 'core/game'
import { px } from 'core/filters'
import {
  MOVING,
  COUNT3,
  COUNT2,
  COUNT1,
  DONE
} from 'core/data'

export default class CountdownState {
  public state   : string
  public counter : number
  public x       : number
  public y       : number
  public moving_exit : any

  create(should_countdown : boolean, moving_exit){
    this.moving_exit = moving_exit
    this.y = px(-38)
    this.x = 0
    if (should_countdown) {
      this.counter = 0
      this.state = MOVING
    } else {
      this.state = DONE
    }

  }

  get snap(){
    return [
      this.state,
      this.counter,
      this.x,
      this.y
    ]
  }

  public load(snapshot){
    this.state = snapshot[0]
    this.counter = snapshot[1]
    this.x = snapshot[2]
    this.y = snapshot[2]
  }

  update(){
    switch (this.state){
      case MOVING: { this.moving_execute(); break; }
      case COUNT3: { this.count3_execute(); break; }
      case COUNT2: { this.count2_execute(); break; }
      case COUNT1: { this.count1_execute(); break; }
      case DONE  : { this.done_execute()  ; break; }
    }
  }

  moving_execute(){
    if (this.y < px(80)) {
      this.y += px(4)
    } else {
      this.state = COUNT3
      this.moving_exit()
      game.sounds.blip()
    }
  }

  count3_execute(){
    this.counter++;
    if (this.counter > 60) {
      game.sounds.blip()
      this.counter = 0;
      this.state = COUNT2;
    }
  }

  count2_execute(){
    this.counter++;
    if (this.counter > 60) {
      game.sounds.blip()
      this.counter = 0;
      this.state = COUNT1;
    }
  }

  count1_execute(){
    this.counter++;
    if (this.counter > 60) {
      this.state = DONE
    }
  }

  done_execute(){
  }
}
