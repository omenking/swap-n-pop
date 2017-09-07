module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const Server = require(APP.path.main('server'))
  const {ipcRenderer: ipc} = require('electron')

  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.listening = this.listening.bind(this)
      this.start      = this.start.bind(this)
    }
    create(){
      this.server = new Server()
      this.server.create(40400,'0.0.0.0',this.listening)
    }
    listening(){
      if (this.online === 'host') {
        this.server.connected(this.start)
      } else if(this.online === 'join') {
        this.server.connect(this.start)
      }
    }
    start(){
      ipc.send('play-vs',{online: this.server, cpu: false})
    }
  }

  return controller
}
