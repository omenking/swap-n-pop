import * as fs from 'fs'

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
    play: sinon.stub(),
    get: sinon.stub()
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

const stub_bitmapData = sinon.stub()
stub_bitmapData.returns({
  rect: sinon.stub()
})

const stub_tween = sinon.stub()
stub_tween.returns({
  to: sinon.stub().returns({
    start: sinon.stub()
  })
  onComplete: sinon.stub()
})

const asset_json = JSON.parse(fs.readFileSync('./app/assets/assets.json', 'utf8'))

const stub_get_json = sinon.stub()
stub_get_json.withArgs('assets').returns(asset_json)

class GameMock {
  constructor(){
    this.add = {
      group:  stub_group,
      sprite: stub_sprite,
      text:   stub_text,
      audio:  stub_audio,
      bitmapData: stub_bitmapData,
      tween: stub_tween
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
      pop: sinon.stub(),
      swap: sinon.stub(),
      blip: sinon.stub(),
      ding: sinon.stub(),
      land: sinon.stub(),
      confirm: sinon.stub(),
      select: sinon.stub(),
      stage_music: sinon.stub(),
      mode_vs: {
        step: sinon.stub()
      }
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

    this.load = {
      json: sinon.stub()
    }

    this.cache = {
      getJSON: stub_get_json
    }
  }//constructor
}

const game = new GameMock()
export default game
