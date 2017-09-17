module.exports = function(game){
  class controller {
    constructor(){
      this.create  = this.create.bind(this)

      this.cindex      = this.cindex.bind(this)
      this.cindex_tick = this.cindex_tick.bind(this)

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
      console.log('sp0',this.index,this.index_tick,this.snapshot[this.index][0][1])
      this.index      = this.cindex(tick)
      this.index_tick = this.cindex_tick(tick)
      console.log('sp1',this.index,this.index_tick,this.snapshot[this.index][0][1])
      console.log('sp3',this.index,this.index_tick,this.snapshot[0][0][1])

      this.playfield0.load(this.snapshot[this.index][0])
      this.playfield1.load(this.snapshot[this.index][1])
    }

    cindex(tick){
      const offset = tick - this.index_tick
      if (offset >= 0){return offset}
      else            {return 120+offset}
    }

    cindex_tick(tick){
      const offset = tick - this.index_tick
      if (offset >= 0){return this.index_tick}
      else            {return this.index_tick-120}
    }

    snap(tick){
      if (this.index >= 119){
        this.index      = -1
        this.index_tick = tick
      }
      this.index++
      this.snapshot[this.index][0] = this.playfield0.snap
      this.snapshot[this.index][1] = this.playfield1.snap
      console.log('sss',tick,this.index,this.snapshot[this.index][0][1])
    }
  } //klass

  return controller
}
