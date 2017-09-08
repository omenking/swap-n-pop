module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const Server = require(APP.path.main('server'))
  const {ipcRenderer: ipc} = require('electron')

  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.listening = this.listening.bind(this)
      this.start     = this.start.bind(this)
    }
    init(data){
      console.log('connect-data',data)
      this.mode      = data.mode
      this.host_port = data.host_port
      this.join_host = data.join_host
      this.join_port = data.join_port
    }
    create(){
      this.server = new Server()
      this.server.create(this.host_port,'0.0.0.0',this.listening)
    }
    listening(){
      if (this.mode === 'host') {
        this.server.connected(this.start)
      } else if(this.mode === 'join') {
        this.server.connect(this.join_port,this.join_host,this.start)
      }
    }
    start(){
      ipc.send('play-vs',{online: this.server, cpu: false})
    }
    update(){
    }
  }

  return controller
}
