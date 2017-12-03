import game               from 'core/game'
import ComponentPlayfield from 'components/playfield'

/**
 * A StepCounter is used in the Puzzle Mode to show the current amount of steps you have left.
 * The internal step_limit always has to get updated to the next room change.
 */
export default class StepCounter {
  private group     : Phaser.Group
  private d1        : Phaser.Sprite
  private d2        : Phaser.Sprite
  private steps     : number
  private playfield : ComponentPlayfield
  public  step_limit : number
  /**
   * Add a Sprite group set the parent pos and create sprites on a relative position.
   * @param {object} mulitple vars defaulted - playfield reference is expected.  
   */
  create =({ step_limit = 0, playfield, x = 200, y = 50})=> {
    this.group = game.add.group();
    this.group.x = x; 
    this.group.y = y;

    this.d1 = game.make.sprite(24, 0, "ints_large", 0);
    this.d2 = game.make.sprite(0, 0, "ints_large", 0);
    this.group.add(this.d1);
    this.group.add(this.d2);

    this.steps = 0;
    
    // playfield reference
    this.playfield = playfield;
    this.step_limit = step_limit;
  }

  /** update the sprites each frame */
  render() {
    this.steps = this.step_limit - this.playfield.swap_counter;
    
    if (this.steps >= 10) {
      let d1_count = this.getDigit(this.steps, 0);
      let d2_count = this.getDigit(this.steps, 1);
      
      this.d1.frame = d1_count;
      this.d2.frame = d2_count;
    }
    else {
      this.d1.frame = this.steps;
      this.d2.frame = 0;
    }
  }

  /**
   * Gets a digit from a number and returns it
   * @param {integer} number real num
   * @param {integer} n which digit you want to get
   * @returns integer below 10
   */
  getDigit =(number, n)=> {
    return Math.floor((number / Math.pow(10, n - 1)) % 10);
  }
}
