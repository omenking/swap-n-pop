import controls from 'core/controls'

export default class Snapshots {
  /** Saves variables which need to get snapped or loaded
   * @param {mode} stage chosen mode to play in
   * @param {playfield} p0 first one
   * @param {playfield} p1 second one
   * @param {Timer} timer timer of the mode
   */ 
  create(stage, p0, p1, timer){
    // to snap / load
    this.stage      = stage;
    this.playfield0 = p0;
    this.playfield1 = p1;
    this.timer      = timer;

    // counter for each Frame
    this.index      = -1;
    this.index_tick = 0;
    
    // snapshot size limit 120 saved Frames
    this.snapshot   = new Array(120).fill(null);
  }
  
  get stage(){ return this._stage }
  set stage(v){ this._stage = v}

  get playfield0(){ return this._playfield0 }
  set playfield0(v){ this._playfield0 = v}

  get playfield1(){ return this._playfield1 }
  set playfield1(v){ this._playfield1 = v}

  /** indexes get updated through methods 
   *  each saved variable gets loaded with a snapshot provided through the new index
   * @param {integer} tick possibly from networking 
   */
  load(tick){
    this.index      = this.cindex(tick);
    this.index_tick = this.cindex_tick(tick);

    // all objects - subobjects to load with a snapshot
    this.playfield0.load(this.snapshot[this.index][0]);
    this.playfield1.load(this.snapshot[this.index][1]);
    controls.load(  this.snapshot[this.index][2]);
    this.stage.load(this.snapshot[this.index][3]);
    this.timer.load(this.snapshot[this.index][4]);
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
      this.index      = -1;
      this.index_tick = tick;
    }

    this.index++;
    
    this.snapshot[this.index] = [this.playfield0.snap,
                                 this.playfield1.snap,
                                 controls.snap,
                                 this.stage.snap,
                                 this.timer.snap]
  }
} 
