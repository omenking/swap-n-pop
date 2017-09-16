module.exports = function(game){
  class controller {
    constructor(){
      this.create  = this.create.bind(this)

      this.cindex = this.cindex.bind(this)
      this.load   = this.load.bind(this)
      this.snap   = this.snap.bind(this)
    }
    create(p0,p1){
      this.playfield0 = p0
      this.playfield1 = p1
      this.index      = -1
      this.index_tick = 0
      this.snapshot   = new Array(120).fill([[],[]])
    }
    get playfield0(){ return this._playfield0 }
    set playfield0(v){ this._playfield0 = v}

    get playfield1(){ return this._playfield1 }
    set playfield1(v){ this._playfield1 = v}

    load(tick){
      let i = this.cindex(tick)
      this.playfield0.load(this.snapshot[i][0])
      this.playfield1.load(this.snapshot[i][1])
    }

    cindex(tick){
      const offset = tick - this.index_tick
      let index    = null
      if (offset >= 0){return offset}
      else            {return 120+offset}
    }

    snap(tick){
      if (this.index >= 119){
        this.index      = -1
        this.index_tick = tick
      }
      this.index++
      this.snapshot[this.index][0] = this.playfield0.snap
      this.snapshot[this.index][1] = this.playfield1.snap
    }
  } //klass

  return controller
}
