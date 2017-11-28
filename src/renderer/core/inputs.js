import game     from '@/core/game'
import electron from 'electron'

const {ipcRenderer: ipc} = electron

export default class CoreInputs {
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
    const frame_start = this.ack[0]
    const frame_end   = data.ack0+data.frame_count-1

    ipc.send(
      'log',
      `UN ${this.tick}: ${data.ack0} ${data.ack1} ${data.frames.join(',')}`
    )
    //console.log('unpack__:',frame_start,frame_end,'|',this.ack[0])
    //console.log('unpack__:',data.frames)
    for (let tick = frame_start; frame_end >= tick; tick++) {
      let byte = data.frames[tick-data.ack0]
      if(typeof this.inputs[1][tick] === 'undefined') {
        if (byte === 0x01){ console.log('+',this.tick,tick) }
        this.inputs[1].push(byte)
      } else {
        if (byte === 0x01){ console.log('=',this.tick,tick) }
        this.inputs[1][tick] = byte
      }
    }
    // Tell the stage (mode_vs) that we want to roll from..to
    // the next time update is called.
    this.stage.roll.ready = true
    if (this.stage.roll.from === null){
      this.stage.roll.from = this.ack[0]
    } else {
      this.stage.roll.from = Math.min(this.ack[0],this.stage.roll.from)
    }

    this.stage.roll.to = this.tick
    this.ack[0] = Math.max(frame_end,this.ack[0])
    this.ack[1] = Math.max(this.ack[1],data.ack1)
  }

  update_input(pi,tick){
    const byte = game.controls.serialize(pi)
    this.inputs[pi].push(byte)
  }

  replay_input(pi,tick){
    const byte = this.inputs[pi][tick]
    game.controls.execute(pi,byte)
  }

  update(tick,send) {
    this.tick = tick
    if (this.replay || send === false){
      this.replay_input(0,tick)
      this.replay_input(1,tick)
    } else {
      this.update_input(0,tick)
      if (this.online && (typeof this.inputs[1][tick] !== 'undefined') ){
        this.replay_input(1,tick)
      } else {
        this.update_input(1,tick)
      }
    }
    if (this.online && send){
      this.last_pack = this.pack()
      ipc.send(
        'log',
        `PK ${tick}: ${this.last_pack.ack0} ${this.last_pack.ack1} ${this.last_pack.frames.join(',')}`
      )
      game.server.send('framedata',this.last_pack)
    }
  }

} //klass
