class controller {
  constructor(data) {
    this.update = this.update.bind(this)

    this.reconcile   = this.reconcile.bind(this)

    this.update_input = this.update_input.bind(this)
    this.replay_input = this.replay_input.bind(this)
    this.last_input   = this.last_input.bind(this)

    if(data){
      this.replay    = true
      this.replaying = [null,null]
      this.inputs = data
    } else {
      this.replay = false
      this.inputs = [
        [[-1,0,'000000']],
        [[-1,0,'000000']]
      ]
    }

  } //constructor

  get serialize(){
    return this.inputs
  }

  get send(){
    return
  }

  last_input(pl){
    this.inputs[pl][this.inputs[pl].length]
  }

  update_input(pi,tick){
    const bitset = game.controls.seralize(pi)
    if (bitset === this.inputs[pi][this.inputs[pi].length-1][2]) { // inputs did not change
      this.inputs[pi][this.inputs[pi].length-1][1]++
    } else { // inputs changed
      this.inputs[pi].push([tick,0,bitset])
    }
  }
  replay_input(pi,tick){
    if (this.replaying[pi] === null) {
      this.replaying[pi] = this.inputs[pi].shift()
    }

    const tick_old = this.replaying[pi][0]
    const times    = this.replaying[pi][1]
    const inputs   = this.replaying[pi][2]

    if ((tick_old+times) < tick){
      while((tick_old+times) < tick){
        this.replaying[pi] = this.inputs[pi].shift()
      }
      console.log('+',tick,tick_old,times,inputs)
      game.controls.execute(pi,inputs)
    } else {
      //console.log('~',this.tick,this.replaying[pi][0],this.replaying[pi][1],this.replaying[pi][2])
    }
  }

  update(tick) {
    if (this.replay){
      this.replay_input(0,tick)
      this.replay_input(1,tick)
    } else {
      this.update_input(0,tick)
      this.update_input(1,tick)
    }
  }

} //klass

module.exports = controller
