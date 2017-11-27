module.exports = function(game){
  return class controller {
    create() {
      this.lbl = game.add.text(116, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})
    }

    render(i){
      this.lbl.setText(`F${i}`)
    }
  }
}

