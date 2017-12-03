const stub_group = sinon.stub()
stub_group.returns({
  x: null,
  y: null,
  add: sinon.stub()
})

const stub_sprite = sinon.stub()
stub_sprite.returns({
  x: null,
  y: null,
  visible: true,
  animations: {
    add: sinon.stub(),
    play: sinon.stub()
  },
  addChild: sinon.stub(),
  anchor: {
    set: sinon.stub(),
    setTo: sinon.stub()
  },
  scale: {
    x: null,
    y: null,
    set: sinon.stub()
  }
})

const stub_text = sinon.stub()
stub_text.returns({
  setText: sinon.stub(),
  setTextBounds: sinon.stub()
})

const stub_audio = sinon.stub()
stub_audio.returns({
})

export default class GameMock {
  constructor(){
    this.add = {
      group:  stub_group,
      sprite: stub_sprite,
      text:   stub_text,
      audio:  stub_audio
    }
    this.make = {
      sprite: stub_sprite
    }
    this.world = {
      centerX: null,
      centery: null
    }
    this.time = {
      desiredFps: 60
    }
    this.sounds = {
      swap: sinon.stub(),
      blip: sinon.stub(),
      ding: sinon.stub(),
      land: sinon.stub(),
      confirm: sinon.stub(),
      select: sinon.stub(),
      stage_music: sinon.stub()
    }
    this.server = {
      on: sinon.stub()
    }
    this.stage = {
      backgroundColor: sinon.stub()
    }
    this.input = {
      gamepad: {
        start: sinon.stub()
      },
      keyboard: {
        reset: sinon.stub(),
        addKey: function(){
          return {isDown: false}
        }
      }
    }

    this.server = {
      ping: sinon.stub(),
      on: sinon.stub(),
      send: sinon.stub()
    }

    const CoreControls = require(APP.path.core('controls'))(this)
    this.controls = new CoreControls()
    this.controls.create()


  }//constructor
} 

