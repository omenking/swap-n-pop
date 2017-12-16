import game from 'core/game'
import { 
  GARBAGE,
  CHAIN,
  COMBO
} from 'core/data';

export default class CoreGarbage {
  private stage     : any
  private pi        : number
  private queue     : Array<any>
  private alternate : Array<any>
  private left      : boolean

  create(stage, pi){
    this.stage = stage
    this.pi    = pi
    this.queue = []
    // 0 1 2 3 4 5
    this.alternate = [
      {index: 0, frame: [0,1,2,3,4,5]}, // 1 garbage wide
      {index: 0, frame: [0,4,2]},       // 2 garbage wide
      {index: 0, frame: [0,3,1,2]},     // 3 garbage wide
      {index: 0, frame: [0,2]},         // 4 garbage wide
      {index: 0, frame: [0,1]},         // 5 garbage wide
      {index: 0, frame: [0]}            // 6 garbage wide
    ]

  }

  alt(size) {
    const x   = this.alternate[size-1].frame[this.alternate[size-1].index]
    const len = this.alternate[size-1].frame.length
    this.alternate[size-1].index++
    if (this.alternate[size-1].index >= len){
      this.alternate[size-1].index = 0
    }
    return x
  }

  update(combo,chain) {
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

  push(combo,chain) {
    const delay = 20
    this.queue.push({
      counter: delay,
      combo  : combo,
      chain  : chain
    })

    // send out character animation before the 20frames delay
    if (combo > 3) {
      if (this.pi === 0)
        this.stage.playfield0.character.current_animation = "attack"
      else if (this.pi === 1)
        this.stage.playfield1.character.current_animation = "attack"
    }
  }

  shift() {
    let playfield = null
    if (this.pi === 0) { playfield = this.stage.playfield1 }
    else               { playfield = this.stage.playfield0 }
    if (
      playfield.stack_i(0).empty &&
      playfield.stack_i(1).empty &&
      playfield.stack_i(2).empty &&
      playfield.stack_i(3).empty &&
      playfield.stack_i(4).empty &&
      playfield.stack_i(5).empty
    ) {
      this.left  = !this.left
      const v = this.queue.shift()

      // if garbage sent after delay - play attacked on the playfield chosen
      if (v.combo > 3)
        playfield.character.current_animation = "attacked"

      let o
      if (v.combo === 4) {
        o = this.alt(3) //offset
        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
      } else if (v.combo === 5){
        o = this.alt(4) //offset
        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+3).set_garbage(this.stage.tick,COMBO)
      } else if (v.combo === 6){
        o = this.alt(5) //offset
        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+3).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+4).set_garbage(this.stage.tick,COMBO)
      } else if (v.combo === 7){
        o = this.alt(6) //offset
        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+3).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+4).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+5).set_garbage(this.stage.tick,COMBO)
      } else if (v.combo === 8){
        o = this.alt(7) //offset
        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+3).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+4).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+5).set_garbage(this.stage.tick,COMBO)

        playfield.stack_i(o+0).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+1).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+2).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+3).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+4).set_garbage(this.stage.tick,COMBO)
        playfield.stack_i(o+5).set_garbage(this.stage.tick,COMBO)
      } else if (v.combo === 9){
      } else if (v.combo === 10){
      } else if (v.combo === 11){
      } else if (v.combo === 12){
      } else if (v.combo === 13){
      }
    }
  }
}
