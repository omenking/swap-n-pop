function attach_state(klass){
  var state = new klass()
  return {
    init:     state.init,
    create:   state.create,
    update:   state.update,
    shutdown: state.shutdown
  }
}

const APP = require('swap-n-pop_app')
const {WIN_WIDTH, WIN_HEIGHT} = require(APP.path.core('data'))
const game         = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
const States       = require(APP.path.root('src','renderer','states'))(game)
const CoreControls = require(APP.path.core('controls'))(game)
const CoreSounds   = require(APP.path.core('sounds'))(game)

game.controls = new CoreControls()
game.sounds   = new CoreSounds()
game.state.add('boot', attach_state(States.Boot))
game.state.add('menu', attach_state(States.Menu))
game.state.add('mode_vs', attach_state(States.ModeVs))
game.state.add('mode_puzzle', attach_state(States.ModePuzzle))
game.state.start('boot')
