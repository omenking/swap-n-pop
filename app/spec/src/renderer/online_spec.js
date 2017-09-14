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
function update(){
  _stage0.update()
  _stage1.update()
  return [_stage0.inputs.last_pack,
          _stage1.inputs.last_pack]
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


      //Buffer.from([0x04,0x01,0x00,0x00,[>*/0x01,/*<]0x00,0x00]),
      //Buffer.from([0x04,0x01,0x00,0x00,[>*/0x00,/*<]0x00,0x00]),
  it('#data', function(){
    game0.controls.execute(0,0x01) // up
    update().should.eql([
      {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]},
      {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x00]}
    ]) //1
    game0.controls.execute(0,0x00) // none

    let pack0_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x00]}
    let pack1_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x00,0x00]}
    update().should.eql([pack0_2,pack1_2])//2
    stage0.inputs.unpack(pack1_2)

    let pack0_3 = {ack0: 0, ack1: 3, frame_count: 4, frames: [0x00,0x01,0x00,0x00]}
    let pack1_3 = {ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x00,0x00,0x00]}
    update().should.eql([pack0_3,pack1_3]) //3
    stage1.inputs.unpack(pack0_3)

    update().should.eql([
      {ack0: 0, ack1: 3, frame_count: 5, frames: [0x00,0x01,0x00,0x00,0x00]},
      {ack0: 3, ack1: 4, frame_count: 2, frames: [0x00,0x00]}
    ]) //4
  }) //it
}) //describe
