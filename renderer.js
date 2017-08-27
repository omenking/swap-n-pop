function attach_state(klass){
  var state = new klass()
  return {
    create: state.create,
    update: state.update,
    init:   state.init
  }
}

const {WIN_WIDTH, WIN_HEIGHT} = require('./src/renderer/core/data')
const game         = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
const States       = require('./src/renderer/states')(game)
const CoreControls = require('./src/renderer/core/controls')(game)

game.controls = new CoreControls()
game.state.add('boot', attach_state(States.Boot))
game.state.add('menu', attach_state(States.Menu))
game.state.add('mode_vs', attach_state(States.ModeVs))
game.state.add('mode_puzzle', attach_state(States.ModePuzzle))
game.state.start('boot')
