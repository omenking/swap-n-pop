import game from 'core/game'
import { 
  GARBAGE,
  CHAIN,
  COMBO,
  TIME_PARTICLE_GARAGE,
  TIME_CLEAR
} from 'common/data';

export default class CoreGarbage {
  private stage     : any
  private pi        : number
  private queue     : Array<any>
  private alternate : Array<any>
  private left      : boolean

  /*
   * We store in here the garbage group when it first
   * gets shifted off the queue. When a garbage panel with that
   * garbage group  lands  for the first time we can then
   * remove it from falling and play the sound once via the
   * playfield
   */
  public falling   : Array<number>

  create(stage, pi){
    this.stage = stage
    this.pi    = pi
    this.queue = []
    this.falling = []
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

  get snap(){
    return [
      this.queue,
      this.alternate
    ]
  }

  load(snapshot){
    this.queue     = snapshot[0]
    this.alternate = snapshot[1]
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
    const delay = TIME_CLEAR + TIME_PARTICLE_GARAGE
    if (chain >= 2) { this.queue.push({kind: CHAIN, size: chain, counter: delay}) }
    if (combo >= 4) { this.queue.push({kind: COMBO, size: combo, counter: delay}) }
    // send out character animation before the TIME_PARTICLE_GARAGE delay
    if (chain >= 2 || combo >= 4) {
    console.log('pushing')
    this.my_playfield.character.current_animation = "attack"
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


  get my_playfield(){
    if (this.pi === 0) { return this.stage.playfield0 }
    else               { return this.stage.playfield1 }
  }
  get other_playfield(){
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
  generate(playfield,height : number ,width : number ,kind : string ,size : number){
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
    const pl = this.other_playfield
    if (!this.empty_row(pl)) { return }
    this.left = !this.left
    const v = this.queue.shift()

    this.falling.push(this.stage.tick)
    console.log('falling shift', this.falling, this.stage.tick)

    // if garbage sent after delay - play attacked on the playfield chosen
    if (v.kind === COMBO){
      if (v.size >= 4)
        pl.character.current_animation = "attacked"

      if (v.size >= 4 && v.size <= 7) {
        this.generate(pl,1,v.size-1,COMBO,v.size) // 1xCOMBO
      } else if (v.size === 8){
        this.generate(pl,1,3,COMBO,v.size)
        this.generate(pl,1,4,COMBO,v.size)
      } else if (v.size === 9){
        this.generate(pl,1,4,COMBO,v.size)
        this.generate(pl,1,5,COMBO,v.size)
      } else if (v.size === 10){
        this.generate(pl,1,5,COMBO,v.size)
        this.generate(pl,1,5,COMBO,v.size)
      } else if (v.size === 11){
        this.generate(pl,1,6,COMBO,v.size)
        this.generate(pl,1,6,COMBO,v.size)
      } else if (v.size >= 12){
        this.generate(pl,1,6,COMBO,v.size)
        this.generate(pl,1,6,COMBO,v.size)
        this.generate(pl,1,6,COMBO,v.size)
      }

    } else if (v.kind === CHAIN){
      if (v.size >= 2)
        pl.character.current_animation = "attacked"

      if (v.size >= 2) {
        const height =  Math.min(v.size-1,12)
        this.generate(pl,height,6,CHAIN,v.size) // CHAINx6
      }
    }
  } // shift


}
