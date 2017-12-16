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
      {index: 0, frame: [0,3]},         // 3 garbage wide
      {index: 0, frame: [0,2]},         // 4 garbage wide
      {index: 0, frame: [0,1]},         // 5 garbage wide
      {index: 0, frame: [0]}            // 6 garbage wide
    ]

  }

  /*
   * alternates garbage panels based on the size of garbage
   */
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

  /*
   * ensure there is one visible row to ensure there is
   * room to drop garbage
   */
 empty_row(playfield){
    return playfield.stack_i(0).empty &&
           playfield.stack_i(1).empty &&
           playfield.stack_i(2).empty &&
           playfield.stack_i(3).empty &&
           playfield.stack_i(4).empty &&
           playfield.stack_i(5).empty
  }

  get playfield(){
    if (this.pi === 0) { return this.stage.playfield1 }
    else               { return this.stage.playfield0 }
  }

  /*
   *
   * @param height - the height of the garbage, max being 12
   * @param width  - the length of the garbage, max being 6
   * @param kind   - COMBO or CHAIN
   * @param size   - The original size of the CHAIN or COMBO
   */
  generate(playfield,height : number ,width : number ,kind : Symbol ,size : number){
    let o = 0
    if (kind === COMBO)
      o = this.alt(width) //offset

    for(let w = 0; w < width; w++){
      for(let h = 0; h < height; h++){
        playfield.stack_xy(w+o,h).set_garbage(this.stage.tick,kind)
      }
    }
  }

  shift() {
    const pl = this.playfield
    if (!this.empty_row(pl)) { return }
    this.left = !this.left
    const v   = this.queue.shift()

    // if garbage sent after delay - play attacked on the playfield chosen
    if (v.combo > 3)
      pl.character.current_animation = "attacked"

    if (v.chain >= 2) {
      const height =  Math.min(v.chain-1,12)
      this.generate(pl,1,height,CHAIN,v.chain) // CHAINx6
    }

    if (v.combo >= 4 && v.combo <= 7) {
      this.generate(pl,1,v.combo-1,COMBO,v.combo) // 1xCOMBO
    } else if (v.combo === 8){
      this.generate(pl,1,3,COMBO,7)
      this.generate(pl,1,4,COMBO,7)
    } else if (v.combo === 9){
      this.generate(pl,1,4,COMBO,9)
      this.generate(pl,1,5,COMBO,9)
    } else if (v.combo === 10){
      this.generate(pl,1,5,COMBO,10)
      this.generate(pl,1,5,COMBO,10)
    } else if (v.combo === 11){
      this.generate(pl,1,6,COMBO,11)
      this.generate(pl,1,6,COMBO,11)
    } else if (v.combo >= 12){
      this.generate(pl,1,6,COMBO,11)
      this.generate(pl,1,6,COMBO,11)
      this.generate(pl,1,6,COMBO,11)
    }
  }
}
