module.exports = function(game){
  class PlayfieldWall {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.render = this.render.bind(this)
    }

    create(playfield,x,y){
      this.playfield = playfield
      this.sprite  = game.add.sprite(x, y+192, `playfield_wall${this.playfield.pi}`)
      console.log('playfield wall')
    }

    update() {
    }

    render(){
    }
  }

  return PlayfieldWall
}
