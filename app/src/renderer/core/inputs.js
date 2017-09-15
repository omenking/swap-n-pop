module.exports = function(game){
  class controller {
    constructor(inputs,online) {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.pack   = this.pack.bind(this)
      this.unpack = this.unpack.bind(this)

      this.update_input = this.update_input.bind(this)
      this.replay_input = this.replay_input.bind(this)

      this.create(inputs,online)
    } //constructor

    create(inputs,online){
      if(inputs){
        this.replay    = true
        this.inputs    = inputs
      } else {
        this.online = online
        this.replay = false
        this.inputs = [[0x00],[0x00]]
        if (this.online){
          this.ack = [0,0]
          game.server.on('framedata',this.unpack)
        }
      }
    }

    get last_pack(){ return this._last_pack }
    set last_pack(v){ this._last_pack = v}

    get tick(){ return this._tick }
    set tick(v){ this._tick = v}

    get online(){ return this._online }
    set online(v){ this._online = v}

    get inputs(){ return this._inputs }
    set inputs(v){ this._inputs = v}

    get serialize(){
      return this.inputs
    }

    pack(){
      const data = []
      for (let i = this.ack[1]; this.tick >= i; i++){
        data.push(this.inputs[0][i])
      }
      return {
        frame_count: data.length,
        frames: data,
        ack0: this.ack[1],//local
        ack1: this.ack[0] //remote
      }
    }

    unpack(data){
      const offset = this.ack[0]-data.ack0
      for (let i = 0; data.frame_count-offset > i; i++) {
        let tick = this.ack[0]+i
        let byte = data.frames[i+offset]
        if( tick >= this.inputs[1].length) {
          this.inputs[1].push(byte)
        } else {
          this.inputs[1][tick] = byte
        }
      }
      this.ack[0] = this.ack[0]+(data.frame_count-offset)
      //this.ack[1] = data.ack1
    }

    update_input(pi,tick){
      const byte = game.controls.serialize(pi)
      this.inputs[pi].push(byte)
    }

    replay_input(pi,tick){
      game.controls.execute(pi,this.inputs[pi][tick])
    }

    update(tick) {
      this.tick = tick
      if (this.replay){
        this.replay_input(0,tick)
        this.replay_input(1,tick)
      } else {
        this.update_input(0,tick)
        if (this.online){
          this.replay_input(1,tick)
        } else {
          this.update_input(1,tick)
        }
      }
      if (this.online){
        this.last_pack = this.pack()
        game.server.send('framedata',this.last_pack)
      }
    }

  } //klass
  return controller
}
