import data         from '@/core/data'
import CoreControls from '@/core/controls'
import CoreSounds   from '@/core/sounds'
import Server       from 'common/server' // should be moved to common

const {WIN_WIDTH, WIN_HEIGHT} = data

let game = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
game.controls = new CoreControls()
game.sounds   = new CoreSounds()
game.server   = new Server()
export default game
