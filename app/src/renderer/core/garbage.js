module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    GARBAGE
  } = require(APP.path.core('data'))
  class Garbage {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.push   = this.push.bind(this)
      this.shift  = this.shift.bind(this)
    }

    create(stage,pi){
      this.stage = stage
      this.pi    = pi
      this.queue = []
    }

    update(combo,chain){
      let ncombo = false
      let nchain = false
      if (combo > 3) { ncombo = combo }
      if (chain > 0) { nchain = chain }
      if (ncombo !== false || nchain !== false) {
        this.push(ncombo,nchain)
      }

      if (this.queue.length > 0) {
        this.queue[0].counter--
        if (this.queue[0].counter === 0){
          this.shift()
        }
      }
    }

    push(combo,chain){
      const delay = 20
      this.queue.push({
        counter: delay,
        combo  : combo,
        chain  : chain
      })
    }

    shift(){
      let playfield = null
      if (this.pi === 0) { playfield = this.stage.playfield2 }
      else               { playfield = this.stage.playfield1 }
      if (
        playfield.stack(0).empty &&
        playfield.stack(1).empty &&
        playfield.stack(2).empty &&
        playfield.stack(3).empty &&
        playfield.stack(4).empty &&
        playfield.stack(5).empty
      ) {
        const v = this.queue.shift()
        console.log('queue it up',v)
        playfield.stack(0).set_garbage(this.stage.tick)
        playfield.stack(1).set_garbage(this.stage.tick)
        playfield.stack(2).set_garbage(this.stage.tick)
      }
    }
  }
  return Garbage
}
