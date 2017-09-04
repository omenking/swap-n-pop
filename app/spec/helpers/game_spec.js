const sinon = require('sinon')

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
  }
})

const stub_text = sinon.stub()
stub_text.returns({
  setTextBounds: sinon.stub()
})

module.exports = {
  add: {
    group:  stub_group,
    sprite: stub_sprite,
    text:   stub_text
  },
  make: {
    sprite: stub_sprite
  },
  time: {
    desiredFps: 60
  },
  sounds: {
    swap: sinon.stub()
  }
}
