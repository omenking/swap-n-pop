module.exports = function(game) {
  const {px} = require('../core/filters')
  const {
    WALL_ROLLUP,
    UNIT,
    ROWS_VIS
  } = require('../core/data')
  
  return class PlayfieldWall {
    create(playfield,x,y){
      this.playfield = playfield
      this.sprite    = game.add.sprite(x, y, `playfield_wall${this.playfield.pi}`)
      this.counter   = 0
    }

    update() {
      if (this.counter < WALL_ROLLUP.length-1) {
        this.counter++
      }
    }

    render() {
      //frame animation offset from from the bottom of the wall
      this.sprite.y = px(this.playfield.y + 168 - WALL_ROLLUP[this.counter])
    }
  }
}
