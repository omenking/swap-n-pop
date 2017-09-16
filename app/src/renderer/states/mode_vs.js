module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const Stack  = require(APP.path.core('stack'))(game)
  const ComponentPlayfield = require(APP.path.components('playfield'))(game)
  const ComponentPing      = require(APP.path.components('ping'))(game)
  const CoreInputs         = require(APP.path.core('inputs'))(game)
  const CoreSnapshots      = require(APP.path.core('snapshots'))(game)
  const {ipcRenderer: ipc} = require('electron')
  const seedrandom         = require('seedrandom')

  class controller {
    constructor() {
      this.init     = this.init.bind(this)
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.step         = this.step.bind(this)
      this.roll_to      = this.roll_to.bind(this)
      this.create_bg    = this.create_bg.bind(this)
      this.create_frame = this.create_frame.bind(this)
      this.pause        = this.pause.bind(this)
      this.resume       = this.resume.bind(this)
      this.game_over    = this.game_over.bind(this)
      this.danger_check = this.danger_check.bind(this)
      this.playfield1   = new ComponentPlayfield(0)
      this.playfield2   = new ComponentPlayfield(1)
      this.ping         = new ComponentPing()
    }

    static initClass() {
      this.prototype.rng = null
      this.prototype.debug = false
      this.prototype.roll = {}
    }
    init(data){
      this.tick   = 0
      this.seed   = data.seed
      this.cpu    = data.cpu
      this.online = data.online
      this.rng    = seedrandom(this.seed)
      this.inputs = new CoreInputs(data.inputs,data.online,this)
      this.snapshots = new CoreSnapshots()
      this.roll = {
        ready: false,
        from: null,
        to: null
      }
    }

    get online(){  return this._online }
    set online(v){ this._online = v }

    get cpu(){  return this._cpu }
    set cpu(v){ this._cpu = v }

    create_bg() {
      this.bg = game.add.sprite(-89,0, 'playfield_vs_bg');
    }
    create_frame(offset){
      this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
    }
    create() {
      game.stage.backgroundColor = 0x000000

      this.danger = false

      const offset = 0;
      this.create_bg()

      const stack = new Stack(this.rng)
      stack.create()

      this.playfield1.create(this, {countdown: false, push: true, x: offset+8  , y: 24, panels: stack.panels})
      this.playfield2.create(this, {countdown: false, push: true, x: offset+152, y: 24, panels: stack.panels})
      this.create_frame(offset)
      this.playfield1.create_after()
      this.playfield2.create_after()

      this.snapshots.create(
        this.playfield1,
        this.playfield2
      )
      this.snapshots.snap(0)

      if (this.online){
        this.ping.create()
      }
    }

    pause(pi){
      game.sounds.stage_music('pause')
      this.playfield1.pause(pi)
      this.playfield2.pause(pi)
    }
    resume() {
      game.sounds.stage_music('resume')
      this.playfield1.resume()
      this.playfield2.resume()
    }
    game_over() {
      console.log('gameover')
      if(!this.inputs.replay){
        ipc.send('replay-save', {seed: this.seed, inputs: this.inputs.serialize});
      }
      game.sounds.stage_music('results')
      this.playfield1.game_over()
      this.playfield2.game_over()
    }
    danger_check() {
      const d1 = this.playfield1.danger(1)
      const d2 = this.playfield2.danger(2)

      if (d1 || d2) {
        if (this.danger === false) {
          game.sounds.stage_music('danger');
        }
        return this.danger = true;
      } else {
        if (this.danger === true) {
          game.sounds.stage_music('active');
        }
        return this.danger = false
      }
    }
    roll_to(from,to){
      if (from > to) { // rollback
        console.log('<-----')
      } else { //rollforward
        console.log('----->')
        //console.log('f~',from,to)
        this.snapshots.load(from)
        // since we loaded a snapshot, maybe we don't need to step
        // throuh the frame we loaded the snapshot on.
        for (let i = from+1; i < to; i++) {
          //console.log('fi',i)
          this.step(i)
        }
      }
      this.roll = {ready: false}
    }
    update() {
      if (this.roll.ready){
        this.roll_to(this.roll.from,this.roll.to)
      }
      this.step(false)
    }
    step(tick){
      if (tick === false) {
        this.tick++
        game.controls.update()
      }
      this.playfield1.update()
      this.playfield2.update()
      this.danger_check()
      if (tick === false) {
        this.inputs.update(this.tick,true)
        this.snapshots.snap(this.tick)
      } else {
        console.log('rolling',tick)
        this.inputs.update(tick,false)
        this.snapshots.snap(tick)
      }
    }
    render(){
      if(this.debug){
        console.log('debugger triggered')
        debugger
      }
      if (this.playfield1) { this.playfield1.render() }
      if (this.playfield2) { this.playfield2.render() }
      if (this.online){
        this.ping.render()
      }
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
