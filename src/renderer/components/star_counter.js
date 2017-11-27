module.exports = function(game) {
  const {px} = require('../core/filters')
  const {
    FRAME_STAR
  } = require('../core/data')

  return class StarCounter {
    create(stage,x,y){
      this.stage = stage
      this.group = game.add.group()
      this.group.x = x
      this.group.y = y
      this.sprites = []
      this.sprites[0] = game.make.sprite(x       , y       , `star_counter`,0)
      this.sprites[1] = game.make.sprite(x+px(18), y       , `star_counter`,6)
      this.sprites[2] = game.make.sprite(x       , y+px(17), `star_counter`,0)
      this.sprites[3] = game.make.sprite(x+px(18), y+px(17), `star_counter`,6)

      this.group.add(this.sprites[0])
      this.group.add(this.sprites[1])
      this.group.add(this.sprites[2])
      this.group.add(this.sprites[3])

      this.counter = 0
    }

    update() {
      if (this.counter > FRAME_STAR.length){
        this.counter = 0
      } else {
        this.counter++
      }
    }

    render() {
      if (this.stage.rounds_won[0] > 0) {
        this.sprites[0].frame = FRAME_STAR[this.counter]
      } else {
        this.sprites[0].frame = 0
      }

      if (this.stage.rounds_won[0] > 1) {
        this.sprites[2].frame = FRAME_STAR[this.counter]
      } else {
        this.sprites[2].frame = 0
      }


      if (this.stage.rounds_won[1] > 0) {
        this.sprites[1].frame = FRAME_STAR[this.counter] + 6
      } else {
        this.sprites[1].frame = 6
      }

      if (this.stage.rounds_won[1] > 1) {
        this.sprites[3].frame = FRAME_STAR[this.counter] + 6
      } else {
        this.sprites[3].frame = 6
      }
    }
  }
}
