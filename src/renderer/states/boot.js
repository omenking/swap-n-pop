module.exports = function(game) {
  return class controller {
    create() {
      game.stage.backgroundColor = '#282828'
      this.pixelate()
      game.state.start('load')
    }

    pixelate() {
      game.stage.disableVisibilityChange = true

      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;

      game.scale.setResizeCallback(function () {
        var height = window.innerHeight;
        var width = window.innerWidth;
       
        var resize_vertical_black_bars = () => {
          this.game.width = height;
          this.game.height = height;
        }
        
        var resize_fully = () => {
          this.game.width = width;
          this.game.height = height;
        }

        resize_fully();
      }, this);

      game.renderer.renderSession.roundPixels = true
      Phaser.Canvas.setImageRenderingCrisp(game.canvas)
    }
  }
}
