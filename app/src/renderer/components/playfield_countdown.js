module.exports = function(game){
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
    }

    create(playfield){
      this.playfield = playfield;
      this.sfx_blip  = game.add.audio('sfx_countdown_blip');
      this.sfx_ding  = game.add.audio('sfx_countdown_ding');

      this.counter = 0;
      this.state   = 'moving';
      const x = this.playfield.x+16;
      const y = -38;
      return this.sprite = game.add.sprite(x, y, 'playfield_countdown', 0);
    }

    update() {
      if (this.state === 'moving') {
        if (this.sprite.y < 80) {
          this.sprite.y += 4;
        } else {
          this.sprite.frame = 1;
          this.state = 3;
          this.playfield.cursor.entrance();
          this.sfx_blip.play();
        }
      }
      if (this.state === 3) {
        this.counter++;
        if (this.counter > 60) {
          this.sfx_blip.play();
          this.sprite.frame = 2;
          this.counter = 0;
          this.state = 2;
        }
      }
      if (this.state === 2) {
        this.counter++;
        if (this.counter > 60) {
          this.sfx_blip.play();
          this.sprite.frame = 3;
          this.counter = 0;
          this.state = 1;
        }
      }
      if (this.state === 1) {
        this.counter++;
        if (this.counter > 60) {
          this.sfx_ding.play();
          this.sprite.visible         = false;
          this.playfield.cursor.state = 'active';
          this.playfield.cursor.sprite.visible = true;
          this.playfield.running = true;
          this.playfield.stage.stage_music('active');
          return this.state = null;
        }
      }
    }
    render(){
    }
  }

  return controller
}
