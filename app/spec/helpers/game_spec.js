const APP        = require('../../app')('../../')
const sinon      = require('sinon')
const stub_group = sinon.stub()
const mock       = require('mock-require')

mock('electron', {
  app: null,
  remote: { app: null},
  ipc: {
    on: sinon.stub()
  },
  ipcRenderer: {
    on: sinon.stub()
  }
}
)

class fake_electron_store {
  constructor(){
    this.has = this.has.bind(this)
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }
  has(){}
  set(){}
  get(){}
}
fake_electron_store.prototype.get = sinon.stub()
fake_electron_store.prototype.get.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)
mock('electron-store',fake_electron_store)

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
  addChild: sinon.stub()
})

const stub_text = sinon.stub()
stub_text.returns({
  setText: sinon.stub(),
  setTextBounds: sinon.stub()
})

const stub_audio = sinon.stub()
stub_audio.returns({
})

class game_controller {
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
    this.time = {
      desiredFps: 60
    }
    this.sounds = {
      swap: sinon.stub()
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
        addKey: sinon.stub()
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

module.exports = game_controller
