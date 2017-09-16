module.exports = function(game){
  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.start = this.start.bind(this)
    }

    create(playfield){
      this.playfield = playfield;

      const x = this.playfield.x+16;
      const y = -38;
      this.sprite = game.add.sprite(x, y, 'playfield_countdown', 0)

      if(this.playfield.should_countdown){
        this.counter = 0
        this.state   = 'moving'
      } else {
        this.state   = 'skip'
      }
    }

    update() {
      if (this.state === 'skip') { this.start() }
      if (this.state === 'moving') {
        if (this.sprite.y < 80) {
          this.sprite.y += 4;
        } else {
          this.sprite.frame = 1;
          this.state = 3;
          this.playfield.cursor.entrance()
          game.sounds.blip()
        }
      }
      if (this.state === 3) {
        this.counter++;
        if (this.counter > 60) {
          game.sounds.blip()
          this.sprite.frame = 2;
          this.counter = 0;
          this.state = 2;
        }
      }
      if (this.state === 2) {
        this.counter++;
        if (this.counter > 60) {
          game.sounds.blip()
          this.sprite.frame = 3;
          this.counter = 0;
          this.state = 1;
        }
      }
      if (this.state === 1) {
        this.counter++;
        if (this.counter > 60) {
          this.start()
        }
      }
    }
    start(){
      game.sounds.ding()
      this.sprite.visible         = false
      this.playfield.cursor.state = 'active'
      this.playfield.cursor.sprite.visible = true
      this.playfield.running = true
      game.sounds.stage_music('active')
      this.state = null
    }
    render(){
    }
  }

  return controller
}
