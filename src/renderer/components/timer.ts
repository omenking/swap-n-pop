import game    from 'core/game'
import { px } from 'core/filters';

/** Counts up the actively played Game Time and displays
 *  the Time through Sprite Digits
 */

export default class ComponentTimer {
  private stage : any
  private d0      : Phaser.Sprite
  private d1      : Phaser.Sprite
  private d2      : Phaser.Sprite
  private group   : Phaser.Group
  public tick    : number
  public countdown : number
  public running : boolean

  /** get snapshot of the timer, get only to not let this be modifyable */
  get snap() {
    return [
      this.tick,
      this.countdown,
      this.running
    ];
  }

  /** set all Digit Counters to the snapshots Data
   * @param {Array} snapshot to get data from if packet loss
   */
  load(snapshot) {
    this.tick      = snapshot[0]
    this.countdown = snapshot[1]
    this.running   = snapshot[2]
  }

  public reset(){
    this.tick = 0
    if (this.stage.flag_timer === true)
      this.countdown = 120
    else
      this.countdown = 0
    this.running = false
  }

  /** A Sprite group is created with its position
   *  Each Time Digit gets added as a Sprite
   *  Internal tick counter and a bool to stop everything
   */
  create(stage,x,y) {
    this.stage = stage
    this.group = game.add.group();
    this.group.x = x;
    this.group.y = y;
    this.d0 = game.make.sprite(px(0) , 0, 'ints_large',0);
    this.d1 = game.make.sprite(px(16), 0, 'ints_large',0);
    this.d2 = game.make.sprite(px(24), 0, 'ints_large',0);
    this.group.add(this.d0);
    this.group.add(this.d1);
    this.group.add(this.d2);

    this.reset()
    this.render()
  }

  get time(){
    if(this.stage.flag_timer === true)
      return this.countdown
    else
      return Math.floor(this.tick / 60)
  }

  update(){
    if (!this.running)
      return;
    if(this.stage.flag_timer === true) {
      if (this.tick >= 60){
        this.tick = 0
        this.countdown--
      } else {
        this.tick++
      }
    } else {
      this.tick++
    }
  }
  /** Sets the Sprite Frames of each Digit to a Counter,
   *  Each counter goes up determined by the time passed etc.
   *  everything is stoppable through this.running
   */
  render() {
    const minutes = Math.floor(this.time / 60)
    const seconds = this.time - minutes * 60

    if (minutes > 9){
      this.d0.frame = 9;
    } else {
      this.d0.frame = minutes;
    }
    if (seconds <= 9){
      this.d1.frame = 0;
      this.d2.frame = seconds;
    } else {
      this.d1.frame = parseInt(`${seconds}`.charAt(0));
      this.d2.frame = parseInt(`${seconds}`.charAt(1));
    }
  }

}
