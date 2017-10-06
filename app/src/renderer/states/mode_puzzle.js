module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const ComponentPlayfield = require(APP.path.components('playfield'))(game)
  const CoreInputs         = require(APP.path.core('inputs'))(game)
  const seedrandom         = require('seedrandom')
  class controller {
    constructor() {
      this.init      = this.init.bind(this)
      this.create    = this.create.bind(this)
      this.update    = this.update.bind(this)
      this.render    = this.render.bind(this)
      this.shutdown  = this.shutdown.bind(this)

      this.pause        = this.pause.bind(this)
      this.resume       = this.resume.bind(this)
      this.playfield = new ComponentPlayfield(0)
    }
    static initClass() {
      this.prototype.rng = null
      this.prototype.debug = false
    }
    init(data){
      this.tick   = -1
      this.panels = data.panels
      this.seed   = 'puzzle'
      this.cpu    = [false,null]
      this.rng    = seedrandom(this.seed)
      this.inputs = new CoreInputs()
    }

    get online(){ return this._online }
    get cpu(){    return this._cpu }

    set online(v){ this._online = v}
    set cpu(v){    this._cpu = v }

    create() {
      this.playfield.create(this, {
        countdown: false,
        push  : false,
        x     : 40,
        y     : 8,
        panels: this.panels
      }
      );
      this.playfield.create_after()
    }

    pause(pi){
      game.sounds.stage_music('pause')
      this.playfield.pause(0)
    }

    resume() {
      game.sounds.stage_music('resume')
      this.playfield.resume()
    }

    update() {
      this.tick++
      game.controls.update()
      this.playfield.update()
      this.inputs.update(this.tick)
    }
    render() {
      if (this.playfield) { this.playfield.render() }
    }
    shutdown(){
      game.sounds.stage_music('none')
      this.playfield.shutdown()
    }
  }
  controller.initClass()

  return controller
}
