module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentMenu = require(APP.path.components('menu'))(game)

  class controller {
    constructor() {
      console.log('compiled states menu')
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)
      this.menu   = new ComponentMenu()
    }
    create() {
      game.stage.backgroundColor = '#ffffff'
      this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_blue')
      this.menu.create()
    }
    update() {
      game.controls.update()
      this.menu.update()
      this.bg.tilePosition.y += 0.5
      this.bg.tilePosition.x -= 0.5
    }
    shutdown(){
      game.controls.disable()
    }
  }
  return controller
}
