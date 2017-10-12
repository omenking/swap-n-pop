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
      this.alt    = this.alt.bind(this)
    }

    create(stage,pi){
      this.stage = stage
      this.pi    = pi
      this.queue = []
      this.alternate = [
        {index: 0, frame: [0,1,2,3,4,5]}, // 1 wide garbage
        {index: 0, frame: [0,2,4]},       // 2 wide garbage
        {index: 0, frame: [0,3]},         // 3 wide garbage
        {index: 0, frame: [0,1,2]},       // 4 wide garbage
        {index: 0, frame: [0,1]},         // 5 wide garbage
        {index: 0, frame: [0]}            // 6 wide garbage
      ]

    }

    alt(combo){
      this.alternate[combo].frame[
        this.alternate[combo].index
      ]
      this.alternate[combo].index++
      if (this.alternate[combo].index === this.alternate[combo].frame.length){
        this.alternate[combo].index = 0
      }
      return this.alternate[combo].index
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
        this.left  = !this.left
        const v = this.queue.shift()
        const o = this.alt(v.combo) //offset
        if (v.combo === 4) {
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
        } else if (v.combo === 5){
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
        } else if (v.combo === 6){
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
        } else if (v.combo === 7){
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)
        } else if (v.combo === 8){
          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)

          playfield.stack(o+0).set_garbage(this.stage.tick)
          playfield.stack(o+1).set_garbage(this.stage.tick)
          playfield.stack(o+2).set_garbage(this.stage.tick)
          playfield.stack(o+3).set_garbage(this.stage.tick)
          playfield.stack(o+4).set_garbage(this.stage.tick)
          playfield.stack(o+5).set_garbage(this.stage.tick)
        } else if (v.combo === 9){
        } else if (v.combo === 10){
        } else if (v.combo === 11){
        } else if (v.combo === 12){
        } else if (v.combo === 13){
        }
      }
    }
  }
  return Garbage
}
