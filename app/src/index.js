function attach_state(klass){
  var state = new klass()
  return {
    init:     state.init,
    create:   state.create,
    update:   state.update,
    shutdown: state.shutdown
  }
}

const {WIN_WIDTH, WIN_HEIGHT} = require('./renderer/core/data')
const game         = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
const States       = require('./renderer/states')(game)
const CoreControls = require('./renderer/core/controls')(game)

game.controls = new CoreControls()
game.state.add('boot', attach_state(States.Boot))
game.state.add('menu', attach_state(States.Menu))
game.state.add('mode_vs', attach_state(States.ModeVs))
game.state.add('mode_puzzle', attach_state(States.ModePuzzle))
game.state.start('boot')
