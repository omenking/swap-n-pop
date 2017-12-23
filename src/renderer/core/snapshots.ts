import controls           from 'core/controls'
import ComponentPlayfield from 'components/playfield'

/**
 * Snapshots will save up to 120 frames/ticks worth of objects
 * states that we can reload at any given time.
 *
 * When the snapshot array fills up, it starts overriding at
 * back at the beginging of the array so we have logic to handle
 * that dealing with the looping reading and writing array
 */
export default class Snapshots {
  private _stage : any
  private _playfield0 : ComponentPlayfield
  private _playfield1 : ComponentPlayfield
  private timer : any
  private index : number
  private index_tick : number
  private snapshot : Array<any>
  /** Saves stage which need to get snapped or loaded
   * @param {mode} stage chosen mode to play in
   */
  create(stage){
    // to snap / load
    this.stage = stage
    // counter for each Frame
    this.index      = -1
    this.index_tick = 0
    // snapshot size limit 120 saved Frames
    this.snapshot   = new Array(120).fill(null)
  }
  
  get stage(){ return this._stage }
  set stage(v){ this._stage = v}

  /** indexes get updated through methods 
   *  each saved variable gets loaded with a snapshot provided through the new index
   * @param {integer} tick possibly from networking 
   */
  load(tick : number){
    this.index      = this.capture_index(tick)
    this.index_tick = this.capture_index_tick(tick)
    this.stage.load_snaphot(this.snapshot[this.index])

  }

  /*
   * pass in a a previous tick and return the snapshot
   * index stored on that tick.
   *
   * @param {integer} tick
   * @return integer
   */
  capture_index(tick : number){
    const offset = tick - this.index_tick
    if (offset >= 0){return offset}
    else            {return this.snapshot.length+offset}
  }

  /*
   * @param {integer} tick
   * @return integer
   */
  capture_index_tick(tick : number){
    const offset = tick - this.index_tick
    if (offset >= 0){return this.index_tick}
    else            {return this.index_tick-this.snapshot.length}
  }

  snap(tick : number){
    this.loop(tick)
    this.index++
    this.snapshot[this.index] = this.stage.snap
  }

  /*
   * loops the index of the snapshot array
   * eg. if our snapshot size is 120 and our 
   * index reaches 119 then reset the index to
   * the start of the array, and set the base index_tick
   * for the first frame to mark that its frame 119
   */
  private loop(){
    if (this.index >= this.snapshot.length-1){
      this.index      = -1;
      this.index_tick = tick;
    }
  }
}
