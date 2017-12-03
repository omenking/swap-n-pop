import game from 'core/game'
export default class StatesBoot {
  create =()=> {
    game.stage.backgroundColor = '#282828'
    this.pixelate()
    game.state.start('load')
  }

  pixelate =()=> {
    game.stage.disableVisibilityChange = true

    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.scale.setResizeCallback(this.resize)

    game.renderer.renderSession.roundPixels = true
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)
  }
  resize =()=> {
    // need to find a solution in typescript for window
    // maybe this should be done in electron-main
    // https://ourcodeworld.com/articles/read/285/how-to-get-the-screen-width-and-height-in-electron-framework
    let height = 224 * 3// window.innerHeight
    let width  = 398 * 3// window.innerWidth
    game.width  = width
    game.height = height
  }
}
