import electron from 'electron'
import game     from 'core/game'
import Replay   from 'common/replay'

const {ipcRenderer: ipc} = electron

export default class StatesConnect {
  init(data) {
    this.mode      = data.mode
    this.host_port = data.host_port
    this.join_host = data.join_host
    this.join_port = data.join_port
  }

  get mode(){      return this._mode      }
  get host_port(){ return this._host_port }
  get join_host(){ return this._join_host }
  get join_port(){ return this._join_port }

  set mode(v){      this._mode      = v}
  set host_port(v){ this._host_port = v}
  set join_host(v){ this._join_host = v}
  set join_port(v){ this._join_port = v}

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
        Replay.random_seed(), //hacky until we get a game setup screen
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
