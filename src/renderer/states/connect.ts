import * as electron from 'electron'
import game     from 'core/game'
import Replay   from 'common/replay'
import State from './base';

const {ipcRenderer: ipc} = electron

export default class ConnectState extends State {
  public mode      : string
  public host_port : string
  public join_host : string
  public join_port : number
  private bg         : Phaser.TileSprite

  get name(): string {
    return 'connect';
  }

  init(data) {
    this.mode      = data.mode
    this.host_port = data.host_port
    this.join_host = data.join_host
    this.join_port = data.join_port
  }

  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')
    game.server.create(this.host_port,'0.0.0.0',this.listening)
  }

  listening() {
    if (this.mode === 'host') {
      game.server.connected(this.start)
      game.server.pos = 0
    } else if(this.mode === 'join') {
      game.server.pos = 1
      game.server.connect(
        this.join_port,
        this.join_host,
        Replay.random_seed(16, undefined), //hacky until we get a game setup screen
        this.start
      )
    }
  }

  start() {
    ipc.send('play-vs',{
      seed  : game.server.seed,
      online: true,
      cpu   : [false,false]
    })
  }

  update() {
    this.bg.tilePosition.y += 0.5
    this.bg.tilePosition.x -= 0.5
  }
}
