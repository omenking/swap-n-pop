module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const Stack  = require(APP.path.core('stack'))(game)
  
  const ComponentPlayfield   = require(APP.path.components('playfield'))(game)
  const ComponentPing        = require(APP.path.components('ping'))(game)
  const ComponentDebugFrame  = require(APP.path.components('debug_frame'))(game)
  const ComponentTimer       = require(APP.path.components('timer'))
  const ComponentMenuPause   = require(APP.path.components('menu_pause'))(game)
  const ComponentStarCounter = require(APP.path.components('star_counter'))(game)

  const CoreInputs         = require(APP.path.core('inputs'))(game)
  const CoreSnapshots      = require(APP.path.core('snapshots'))(game)
  const {ipcRenderer: ipc} = require('electron')
  const seedrandom         = require('seedrandom')
  const {
    ROWS,
    COLS
  } = require(APP.path.core('data'))

  class controller {
    constructor() {
      this.playfield1   = new ComponentPlayfield(0)
      this.playfield2   = new ComponentPlayfield(1)
      this.ping         = new ComponentPing()
      this.debug_frame  = new ComponentDebugFrame()
      this.timer        = new ComponentTimer(game)

      this.menu_pause   = new ComponentMenuPause()
      this.star_counter = new ComponentStarCounter()
    }

    static initClass() {
      this.prototype.rng = null
      this.prototype.debug = false
      this.prototype.roll = {}
    }
    init(data){
      this.rounds_won = [2,1]
      this.tick   = 0
      this.seed   = data.seed
      this.cpu    = data.cpu
      this.online = data.online
      this.rng    = seedrandom(this.seed,{state: true})
      this.inputs = new CoreInputs(data.inputs,data.online,this)
      this.snapshots = new CoreSnapshots()
      this.roll = {
        ready: false,
        from: null,
        to: null
      }
    }

    get snap(){
      return [this.rng.state(),this.state]
    }

    load(snapshot){
      let state = this.rng.state()
      this.rng = seedrandom(this.seed, {state: snapshot[0]})
      this.state = snapshot[1]
    }

    get state(){ return this._state }
    set state(v){ this._state = v }

    get online(){  return this._online }
    set online(v){ this._online = v }

    get cpu(){  return this._cpu }
    set cpu(v){ this._cpu = v }

    create_bg() {
      this.bg = game.add.sprite(0,0, 'playfield_vs_bg');
    }
    create_frame(offset){
      this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
    }
    create() {
      ipc.send('log',`VS ${this.seed} ------------------------------`)
      this.danger = false

      const offset = 71;
      this.create_bg()

      const stack = new Stack(this.rng);
      stack.create({ range: 6, ground: 2, wells: "average", chips: "many" });

      if (this.online && game.server.pos === 1) {
        this.playfield2.create(this, {countdown: true, push: true, x: offset+152, y: 24, panels: stack.panels})
        this.playfield1.create(this, {countdown: true, push: true, x: offset+8  , y: 24, panels: stack.panels})
      } else {
        this.playfield1.create(this, {countdown: true, push: true, x: offset+8  , y: 24, panels: stack.panels})
        this.playfield2.create(this, {countdown: true, push: true, x: offset+152, y: 24, panels: stack.panels})
      }

      this.create_frame(offset)
      this.playfield1.create_after()
      this.playfield2.create_after()
      this.timer.create(offset+112,168);

      this.snapshots.create(
        this,
        this.playfield1,
        this.playfield2,
        this.timer
      )
      this.snapshots.snap(0)

      if (this.online){
        this.ping.create()
      }
      this.debug_frame.create()

      this.menu_pause.create(this)
      this.star_counter.create(this,91,91)
    }

    /** turns on the menu, changes it state, turns of the timer from counting */
    pause(){
      game.sounds.stage_music('pause');

      this.state = "pause";
      this.timer.running = false;
      this.menu_pause.pause();
    }

    /** called by the menu and reassigns control to both playfields, timer runs again */
    resume() {
      // only resumes the game if countdown's are over
      if (this.playfield1.countdown.state === null ||
          this.playfield2.countdown.state === null) {
        game.sounds.stage_music('resume');
        
        this.state = "running";
        this.timer.running = true;
      }
      
      this.playfield1.cursor.map_controls();
      this.playfield2.cursor.map_controls();
    }

    game_over() {
      console.log('gameover')
      if(!this.inputs.replay){
        ipc.send('replay-save', {seed: this.seed, inputs: this.inputs.serialize});
      }
      game.sounds.stage_music('results')
      this.timer.running = false
      this.playfield1.game_over()
      this.playfield2.game_over()
    }
    danger_check() {
      const d1 = this.playfield1.danger(1)
      const d2 = this.playfield2.danger(2)

      if (d1 || d2) {
        if (this.danger === false) {
          game.sounds.stage_music('danger')
        }
        this.danger = true
      } else {
        if (this.danger === true) {
          game.sounds.stage_music('active')
        }
        this.danger = false
      }
    }
    roll_to(from,to){
      if (from > to) { // rollback
      } else { //rollforward
        this.snapshots.load(from)
        this.log_stack(from,'snap')
        // since we loaded a snapshot, maybe we don't need to step
        // throuh the frame we loaded the snapshot on.
        for (let i = from+1; i <= to; i++) {
          this.step(i)
          this.log_stack(i)
        }
      }
      this.roll = {ready: false, from: null, to: null}
    }
    update() {
      this.roll_log_heading = []
      this.roll_log_data    = []
      this.log_stack(this.tick,'start')
      if (this.roll.ready){
        ipc.send(
          'log',
          `RL ${this.tick}: ${this.roll.from} ${this.roll.to}`
        )
        this.roll_to(this.roll.from,this.roll.to)
      }
      this.step(false)
      this.log_stack(this.tick,'end')

      //ipc.send(
        //'log',
        //`ST ${this.tick}: ${this.log_roll()}`
      //)

      this.menu_pause.update()
      this.star_counter.update()
    }

    log_stack(tick,format=null){
      this.roll_log_heading.push({tick: tick, format: format})
      for (let i = 0; i < ROWS; i++){
        let line = ''
        line += this.playfield1._stack[0+(i*COLS)].log()
        line += this.playfield1._stack[1+(i*COLS)].log()
        line += this.playfield1._stack[2+(i*COLS)].log()
        line += ' '
        line += this.playfield1._stack[3+(i*COLS)].log()
        line += this.playfield1._stack[4+(i*COLS)].log()
        line += this.playfield1._stack[5+(i*COLS)].log()
        line += '  '
        line += this.playfield2._stack[0+(i*COLS)].log()
        line += this.playfield2._stack[1+(i*COLS)].log()
        line += this.playfield2._stack[2+(i*COLS)].log()
        line += ' '
        line += this.playfield2._stack[3+(i*COLS)].log()
        line += this.playfield2._stack[4+(i*COLS)].log()
        line += this.playfield2._stack[5+(i*COLS)].log()
        if (this.roll_log_data[i] === undefined){
          this.roll_log_data[i] = []
        }
        this.roll_log_data[i].push(line)
      }
    }

    log_roll(){
      let str    = ""
      let format = null
      let tick   = null

      str   += "\n"
      for (let i = 0; i < this.roll_log_heading.length; i++){
        tick   = `${this.roll_log_heading[i].tick}                     `
        tick   = tick.substr(0,22)
        format = this.roll_log_heading[i].format
        str += tick
      }

      for (let i = 0; i < ROWS; i++){
        str   += "\n"

        if (Math.floor(ROWS/2) === i) {
          for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
            format = this.roll_log_heading[ii].format
            str += this.roll_log_data[i][ii]
            if (ii < this.roll_log_data[i].length-1){
               if (format === 'start' ||
                   format === 'end') {
                 str += ' -|-> '
               } else {
                 str += ' ---> '
               }
            }
          }
        } else {
          for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
            format = this.roll_log_heading[ii].format
            str += this.roll_log_data[i][ii]
            if (ii < this.roll_log_data[i].length-1){
               if (format === 'start' ||
                   format === 'end') {
                 str += '  |   '
               } else {
                 str += '      '
               }
            }
          }
        }
      }
      return str
    }

    step(tick){
      if (tick === false) {
        this.tick++
      }
      // we need to swap the playfield update order for
      // one of the players otherwise in multipalyer it will
      // generate the panels on the wrong side.
      if (this.online && game.server.pos === 1) {
        this.playfield2.update()
        this.playfield1.update()
      } else {
        this.playfield1.update()
        this.playfield2.update()
      }
      this.danger_check()
      if (tick === false) {
        this.inputs.update(this.tick,true)
        game.controls.update()
        this.snapshots.snap(this.tick)
      } else {
        this.inputs.update(tick,false)
        game.controls.update(false,true)
        this.snapshots.snap(tick)
      }
    }
    render(){
      if(this.debug){
        console.log('debugger triggered')
        debugger
      }
      this.timer.render()
      if (this.playfield1) { this.playfield1.render() }
      if (this.playfield2) { this.playfield2.render() }
      if (this.online){
        this.ping.render()
      }
      //this.debug_frame.render(this.tick)
      this.star_counter.render()
    }
    shutdown() {
      console.log('shutdown mode_vs')
      game.sounds.stage_music('none')
      this.playfield1.shutdown()
      this.playfield2.shutdown()
    }
  }
  controller.initClass()

  return controller
}
