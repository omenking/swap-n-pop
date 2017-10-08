module.exports = function(game){
  const APP = require('../../../app')('../../../')
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
      const v = this.queue.shift()
    }
  }
  return Garbage
}
