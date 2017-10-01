module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    WALL_ROLLUP
  } = require(APP.path.core('data'))
  class PlayfieldWall {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
    }

    create(playfield,x,y){
      this.playfield = playfield
      this.sprite    = game.add.sprite(x, (y-1)+192, `playfield_wall${this.playfield.pi}`)
      this.counter   = 0
      console.log('playfield wall')
    }

    update() {
      if (this.counter < WALL_ROLLUP.length-1) {
        this.counter++
      }
    }

    render(){
      //frame animation offset from from the bottom of the wall
      this.sprite.y = (this.playfield.y-1)+(192-WALL_ROLLUP[this.counter])
    }
  }

  return PlayfieldWall
}
