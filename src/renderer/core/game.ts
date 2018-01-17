import CoreSounds   from 'core/sounds'
import Server       from 'common/server' // should be moved to common
import { WIN_HEIGHT, WIN_WIDTH } from 'common/data';

let game : any  = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game')
game.sounds   = new CoreSounds()
game.server   = new Server()
export default game
