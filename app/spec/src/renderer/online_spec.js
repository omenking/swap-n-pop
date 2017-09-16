const APP = require('../../../app')('../../../')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
const mock       = require('mock-require')
chai.should()

const Game = require(APP.path.spec('helpers','game_spec'))
game0 = new Game()
game1 = new Game()
const Stage0 = require(APP.path.states('mode_vs'))(game0)
const Stage1 = require(APP.path.states('mode_vs'))(game1)

var _stage0 = null
var _stage1 = null
function update(p0,p1){
  _stage0.update()
  _stage1.update()
  _stage0.inputs.last_pack.should.eql(p0)
  _stage1.inputs.last_pack.should.eql(p1)
}

describe('Online Simulation', function() {
  var stage0, stage1
  beforeEach(function(){
    const init = {
      seed  : 'puzzle',
      cpu   : [false,false],
      online: true
    }
    stage0  = new Stage0()
    stage1  = new Stage1()
    stage0.init(init)
    stage1.init(init)
    stage0.create()
    stage1.create()
    _stage0 = stage0
    _stage1 = stage1
  })

  it('#data', function(){
    console.log(
      's0 p0 cursor',
      stage0.playfield1.cursor.x,
      stage0.playfield1.cursor.y,
      stage0.playfield1.cursor.state
    )
    game0.controls.execute(0,0x01) // up
    game1.controls.execute(0,0x08) // right
    update(
      {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]},
      {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}
    ) //1
    console.log(
      's0 p0 cursor',
      stage0.playfield1.cursor.x,
      stage0.playfield1.cursor.y
    )
    stage0.inputs.inputs[0].should.eql([0x00,0x01])
    stage0.inputs.inputs[1].should.eql([0x00])
    stage1.inputs.inputs[0].should.eql([0x00,0x08])
    stage1.inputs.inputs[1].should.eql([0x00])

    game0.controls.execute(0,0x00) // none
    let pack0_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x00]}
    let pack1_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x08,0x08]}
    update(pack0_2,pack1_2)
    stage0.inputs.unpack(pack1_2)
    stage0.inputs.inputs[0].should.eql([0x00,0x01,0x00])
    stage0.inputs.inputs[1].should.eql([0x00,0x08,0x08])
    stage1.inputs.inputs[0].should.eql([0x00,0x08,0x08])
    stage1.inputs.inputs[1].should.eql([0x00,0x00])

    game1.controls.execute(0,0x00) // none
    let pack0_3 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x00]}
    let pack1_3 = {ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x00]}
    update(pack0_3,pack1_3)
    stage1.inputs.unpack(pack0_3)

    update(
      {ack0: 0, ack1: 3, frame_count: 4, frames: [0x00,0x01,0x00,0x00]},
      {ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x00]}
    )
  }) //it
}) //describe
