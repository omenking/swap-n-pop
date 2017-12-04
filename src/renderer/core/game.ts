import data         from 'core/data'
import CoreSounds   from 'core/sounds'
import Server       from 'common/server' // should be moved to common

const {WIN_WIDTH, WIN_HEIGHT} = data

let game : any  = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
game.sounds   = new CoreSounds()
game.server   = new Server()
export default game
