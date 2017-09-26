module.exports = function(game){
  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.render = this.render.bind(this)
    }
    create() {
      this.lbl = game.add.text(116, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})
    }

    render(i){
      this.lbl.setText(`F${i}`)
    }
  }
  return controller
}

