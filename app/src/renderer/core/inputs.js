module.exports = function(game){
  class controller {
    constructor(inputs,online) {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.pack   = this.pack.bind(this)
      this.unpack = this.unpack.bind(this)

      this.update_input = this.update_input.bind(this)
      this.replay_input = this.replay_input.bind(this)
      this.at   = this.at.bind(this)

      this.create(inputs,online)
    } //constructor

    create(inputs,online){
      if(inputs){
        this.replay    = true
        this.replaying = [null,null] // the current input being replayed
        this.inputs    = inputs
      } else {
        this.online = online
        this.replay = false
        this.inputs = [
          [[-1,0,0x00]], // frame, times, inputs
          [[-1,0,0x00]]
        ]
        if (this.online){
          this.acked = [-1,-1]
          game.server.on('framedata',this.unpack)
        }
      }
    }

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
      for (let i = this.acked[1]; this.tick >= i; i++){
        data.push(this.at(i))
      }
      return data
    }

    unpack(data){
      let len = null
      for (let d of data) {
        len = this.inputs[1].length-1
        if (this.inputs[1][len][2] === d){//is same
          this.inputs[1][len][1]++
        } else {
          this.inputs[1].push([
            this.inputs[1][len][0]+this.inputs[1][len][1]+1,0,d
          ])
        }
      }
    }

    // needs to be optimized
    at(tick){
      let tick_min
      let tick_max
      let byte
      for(let i = 0; this.inputs[0].length > i; i++){
        tick_min = this.inputs[0][i][0]
        tick_max = this.inputs[0][i][0]+this.inputs[0][i][1]
        if (tick >= tick_min && tick <= tick_max){
          byte = this.inputs[0][i][2]
          break
        }
      }
      return byte
    }

    update_input(pi,tick){
      const bitset = game.controls.serialize(pi)
      if (bitset === this.inputs[pi][this.inputs[pi].length-1][2]) { // inputs did not change
        this.inputs[pi][this.inputs[pi].length-1][1]++
      } else { // inputs changed
        this.inputs[pi].push([tick,0,bitset])
      }
    }
    replay_input(pi,tick){
      if (this.replaying[pi] === 'done') { return }
      if (this.replaying[pi] === null) {
        this.replaying[pi] = this.inputs[pi].shift()
      }

      if (this.replaying[pi][0]+this.replaying[pi][1] < tick){
        if(this.inputs[pi].length === 0){
          this.replaying[pi] = 'done'
        } else {
          while(this.replaying[pi][0]+this.replaying[pi][1] < tick){
            this.replaying[pi] = this.inputs[pi].shift()
          }
          game.controls.execute(pi,this.replaying[pi][2])
        }
        //console.log(tick,this.replaying[pi][0]+this.replaying[pi][1],this.replaying[pi][2])
      }
    }

    update(tick) {
      this.tick = tick
      if (this.replay){
        this.replay_input(0,tick)
        this.replay_input(1,tick)
      } else {
        this.update_input(0,tick)
        this.update_input(1,tick)
      }
      if (this.online){
        //game.server.send('framedata',this.pack)
      }
    }

  } //klass
  return controller
}
