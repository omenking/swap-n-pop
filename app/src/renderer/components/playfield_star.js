module.exports = function(game){
  const APP = require('../../../app')('../../../')
  class PlayfieldStar {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
    }

    create(playfield,x,y){
      this.playfield = playfield
      this.sprite    = game.add.sprite(x, (y-1)+192, `playfield_star`,0+(playfield.pi*6))
      this.counter   = 0
    }

    update() {
      //if (this.counter < WALL_ROLLUP.length-1) {
        //this.counter++
      //}
    }

    render(){
      //frame animation offset from from the bottom of the wall
    }
  }

  return PlayfieldStar
}
