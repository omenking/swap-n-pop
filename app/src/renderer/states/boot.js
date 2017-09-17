module.exports = function(game){
  class controller {
    constructor() {
      this.create = this.create.bind(this)

      this.pixelate = this.pixelate.bind(this)
    }
    create() {
      game.stage.backgroundColor = '#282828'
      this.pixelate()
      game.state.start('load')
    }
    pixelate(){
      game.stage.disableVisibilityChange = true
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      game.renderer.renderSession.roundPixels = true
      Phaser.Canvas.setImageRenderingCrisp(game.canvas)
    }
  }
  return controller
}
