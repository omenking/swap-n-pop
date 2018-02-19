import game      from 'core/game'
import * as electron from 'electron'

const {ipcRenderer: ipc} = electron

export default class CoreInputs {
  public replay      : boolean
  private ack         : Array<any>
  public tick       : number
  public stage      : any
  public online     : any
  public inputs     : Array<any>
  public last_pack : any

  constructor(inputs,online,stage) {
    this.create(inputs,online,stage)
  } //constructor

  create =(inputs,online,stage)=> {
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

  get serialize(){
    return this.inputs
  }

  pack =()=> {
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

  unpack =(data)=> {
    const frame_start = this.ack[0]
    const frame_end   = data.ack0+data.frame_count-1

    ipc.send(
      'log_to', `${this.stage.seed}_UN`,
      `UN ${this.tick}: ${data.ack0} ${data.ack1} ${data.frames.join(',')}`
    )
    console.log('UN: unpack data', data)
    console.log('UN: frame_start', frame_start)
    console.log('UN: frame_end'  , frame_end)
    for (let tick = frame_start; frame_end >= tick; tick++) {
      let byte = data.frames[tick-data.ack0]
      if(typeof this.inputs[1][tick] === 'undefined') {
        this.inputs[1].push(byte)
      } else {
        this.inputs[1][tick] = byte
      }
      console.log("UN IN:",tick,this.inputs[1])
    }
    // Tell the stage (mode_vs) that we want to roll from..to
    // the next time update is called.
    this.stage.roll.ready = true
    if (this.stage.roll.from === null){
      this.stage.roll.from = this.ack[0]
    } else {
      this.stage.roll.from = Math.min(this.ack[0],this.stage.roll.from)
    }

    this.stage.roll.to = this.stage.tick
    console.log('UN ROLL',this.stage.roll.from, this.stage.roll.to)
    this.ack[0] = Math.max(frame_end,this.ack[0])
    this.ack[1] = Math.max(this.ack[1],data.ack1)
  }

  update_input =(pi,tick)=> {
    const byte = stage.controls.serialize(pi)
    this.inputs[pi].push(byte)
  }

  replay_input =(pi,tick)=> {
    const byte = this.inputs[pi][tick]
    stage.controls.execute(pi,byte)
  }

  update =(tick,send)=> {
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
        'log_to', `${this.stage.seed}_PK`,
        `PK ${tick}: ${this.last_pack.ack0} ${this.last_pack.ack1} ${this.last_pack.frames.join(',')}`
      )
      game.server.send('framedata',this.last_pack)
    }
  }

} //klass
