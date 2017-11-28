import game from '@/core/game'

export default ComponentPing {
  get ping(){  return this._ping }
  set ping(v){ this._ping = v }

  create() {
    this.ping = null
    this.lbl = game.add.text(6, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})

    game.server.on('pong',function(data){
      this.ping = Math.floor((new Date().getTime()-data) / 2)
    }.bind(this))

    game.server.ping()
    setInterval(function(){
      game.server.ping()
    }.bind(this),3000)
  }

  render() {
    if (this.ping === null) {return}
    this.lbl.setText(`${this.ping}ms`)
  }
}
