module.exports = function(game){

  class StepCounter {
    constructor() {
      this.create = this.create.bind(this);
      this.render = this.render.bind(this);
    }

    create({ step_limit = 0, playfield, x = 200, y = 50 }) {
      this.group = game.add.group();
      this.group.x = x; 
      this.group.y = y;

      this.sprite = game.make.sprite(0, 0, "ints_large", 0);
      this.group.add(this.sprite);

      // stop counting
      this.paused = false;

      // playfield reference
      this.playfield = playfield;
      this.step_limit = step_limit;
    }

    render() {
      if (this.paused)
        return;

      this.sprite.frame = this.step_limit - this.playfield.swap_counter;
    }
  }

  return StepCounter;
}