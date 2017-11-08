/** Counts up the actively played Game Time and displays 
 *  the Time through Sprite Digits
 */
module.exports = function Timer(game) {
  /** get snapshot of the timer, get only to not let this be modifyable */
  this.snap = function get() {
    return [
      this.d0.frame,
      this.d1.frame,
      this.d2.frame
    ];
  }
  
  /** set all Digit Counters to the snapshots Data
   * @param {Array} snapshot to get data from if packet loss
   */
  this.load = function(snapshot) {
    this.d0.frame = snapshot[0];
    this.d0.frame = snapshot[1];
    this.d0.frame = snapshot[2];
  }

  /** A Sprite group is created with its position
   *  Each Time Digit gets added as a Sprite
   *  Internal tick counter and a bool to stop everything
   */
  this.create = function(x,y) {
    this.group = game.add.group();
    this.group.x = x;
    this.group.y = y;
    this.d0 = game.make.sprite(0 , 0, 'ints_large',0);
    this.d1 = game.make.sprite(16, 0, 'ints_large',0);
    this.d2 = game.make.sprite(24, 0, 'ints_large',0);
    this.group.add(this.d0);
    this.group.add(this.d1);
    this.group.add(this.d2);

    this.tick = 0;
    this.running = false;
  }
  
  /** Sets the Sprite Frames of each Digit to a Counter,
   *  Each counter goes up determined by the time passed etc.
   *  everything is stoppable through this.running
   */
  this.render = function() {
    if (!this.running) 
      return;

    const time = Math.floor(this.tick / 60);
    
    if (time > 0){
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;

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

    this.tick++;
  }
}
