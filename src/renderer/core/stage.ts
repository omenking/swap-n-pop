import State from '../states/base';
import CountdownState  from 'core/countdown_state'

export default abstract class Stage extends State {
  protected state    : string
  public countdown : CountdownState

  game_over(pi) {
  }


}
