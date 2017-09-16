module.exports = function(game){
  class controller {
    constructor(inputs,online,stage) {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.pack   = this.pack.bind(this)
      this.unpack = this.unpack.bind(this)

      this.update_input = this.update_input.bind(this)
      this.replay_input = this.replay_input.bind(this)

      this.create(inputs,online,stage)
    } //constructor

    create(inputs,online,stage){
      this.stage = stage
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
    get stage(){ return this._stage }
    set stage(v){ this._stage = v}

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
          if (byte !== 0x00) { console.log(this.tick,tick,'+',byte) }
          this.inputs[1].push(byte)
        } else {
          if (byte !== 0x00) { console.log(this.tick,tick,'=',byte) }
          this.inputs[1][tick] = byte
        }
      }
      // Tell the stage (mode_vs) that we want to roll from..to
      // the next time update is called.
      this.stage.roll = {
        ready: true,
        from:  this.ack[0],
        to:    this.tick
      }
      this.ack[0] = this.ack[0]+(data.frame_count-offset)
      this.ack[1] = Math.max(this.ack[1],data.ack1)
    }

    update_input(pi,tick){
      const byte = game.controls.serialize(pi)
      this.inputs[pi].push(byte)
    }

    replay_input(pi,tick){
      game.controls.execute(pi,this.inputs[pi][tick])
    }

    update(tick,send) {
      this.tick = tick
      if (this.replay){
        this.replay_input(0,tick)
        this.replay_input(1,tick)
      } else {
        this.update_input(0,tick)
        if (this.online && (typeof this.inputs[tick] !== 'undefined') ){
          this.replay_input(1,tick)
        } else {
          this.update_input(1,tick)
        }
      }
      if (this.online && send){
        this.last_pack = this.pack()
        game.server.send('framedata',this.last_pack)
      }
    }

  } //klass
  return controller
}
