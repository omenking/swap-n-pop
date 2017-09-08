module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const {VERSION_MAJOR, VERSION_MINOR, VERSION_PATCH} = require(APP.path.core('data'))
  const ComponentMenu = require(APP.path.components('menu'))(game)
  const {ipcRenderer: ipc} = require('electron')

  class controller {
    constructor() {
      console.log('compiled states menu')
      this.create = this.create.bind(this);
      this.ver    = this.ver.bind(this);
      this.update = this.update.bind(this);
      this.menu   = new ComponentMenu();
      return this
    }
    create() {
      game.stage.backgroundColor = '#ffffff';

      this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_blue');
      this.menu.create();

      return this.ver();
    }
    ver() {
      const v = `${VERSION_MAJOR}.${VERSION_MINOR}.${VERSION_PATCH}`;
      const t = `VER ${v}`;
      const build = game.add.text(16,16, t, {
        font: '10px Verdana',
        fill: '#999999',
        fontWeight: 'bold',
        align: 'center'
      }
      );
      return build.anchor.setTo(0, 1);
    }
    update() {
      game.controls.update()
      this.menu.update()
      this.bg.tilePosition.y += 0.5
      this.bg.tilePosition.x -= 0.5
    }
  }
  return controller
}
