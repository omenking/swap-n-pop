module.exports = function(game){
  /** Counts up the actively played Game Time and displays 
   *  the Time through Sprite Digits
   */
  class Timer {
    constructor() {
      this.create = this.create.bind(this);
      this.render = this.render.bind(this);
    }

    // starting tick
    get tick(){ return this._tick }
    set tick(v){ this._tick = v }

    get running(){ return this._running }
    set running(v){ this._running = v }

    /** get snapshot of the timer, get only to not let this be modifyable */
    get snap() {
      return [
        this.d0.frame,
        this.d1.frame,
        this.d2.frame
      ];
    }

    /** set all Digit Counters to the snapshots Data
     * @param {Array} snapshot to get data from if packet loss
     */
    load(snapshot) {
      this.d0.frame = snapshot[0];
      this.d0.frame = snapshot[1];
      this.d0.frame = snapshot[2];
    }

    /** A Sprite group is created with its position
     *  Each Time Digit gets added as a Sprite
     *  Internal tick counter and a bool to stop everything
     */
    create({x = 112, y = 168}) {
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
    render(){
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

  return Timer;
}
