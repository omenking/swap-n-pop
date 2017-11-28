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
  if (p0 !== null) { _stage0.update() }
  if (p1 !== null) { _stage1.update() }
  if (p0 !== null) { _stage0.inputs.last_pack.should.eql(p0) }
  if (p1 !== null) { _stage1.inputs.last_pack.should.eql(p1) }
}

function curs(p,x,y){
  p.cursor.x.should.eql(x)
  p.cursor.y.should.eql(y)
}

function down(n,key){
  if (n === 0) {
    game0.controls.keys[`pl0_${key}`].isDown = true
  } else if (n === 1){
    game1.controls.keys[`pl0_${key}`].isDown = true
  }
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

  //// commented out because I just wanted to run the spec below
  //it('#data', function(){
    ////0-1#######################################################
    //chec_cursors(2,6, 2,6, 2,6, 2,6)
    //game0.controls.execute(0,0x01) // player 1 move up
    //game1.controls.execute(0,0x08) // player 1 move right
    //update(
      //{ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]},
      //{ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}
    //) //1
    //chec_cursors(2,5, // player 1 moved up
                 //2,6,
                 //3,6, // player 2 moved right
                 //2,6)
    //stage0.inputs.inputs[0].should.eql([0x00,0x01])
    //stage0.inputs.inputs[1].should.eql([0x00])
    //stage1.inputs.inputs[0].should.eql([0x00,0x08])
    //stage1.inputs.inputs[1].should.eql([0x00])
    ////1-2#######################################################
    //game0.controls.execute(0,0x00) // none
    //let pack0_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x00]}
    //let pack1_2 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x08,0x08]}
    //update(pack0_2,pack1_2) // 2
    //stage0.inputs.unpack(pack1_2)
    //chec_cursors(2,5,
                 //2,6,
                 //4,6, // player still moving right
                 //2,6)
    //stage0.inputs.inputs[0].should.eql([0x00,0x01,0x00])
    //stage0.inputs.inputs[1].should.eql([0x00,0x08,0x08])
    //stage1.inputs.inputs[0].should.eql([0x00,0x08,0x08])
    //stage1.inputs.inputs[1].should.eql([0x00,0x00])
    ////2-3#######################################################
    //game1.controls.execute(0,0x00) // none
    //let pack0_3 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x00]}
    //let pack1_3 = {ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x00]}
    //update(pack0_3,pack1_3) // 3
    //chec_cursors(2,5,
                 //3,6, //unpacking should have set this to 3, not 4 because of timeing of unpacking
                 //4,6,
                 //2,6)
    //stage1.inputs.unpack(pack0_3)
    ////3-4#######################################################
    //update(
      //{ack0: 0, ack1: 3, frame_count: 4, frames: [0x00,0x01,0x00,0x00]},
      //{ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x00]}
    //) // 4
  //}) //it

/*  it('#should move cursor', function(){*/
    //////0-1#######################################################
    //chec_cursors(2,6, 2,6, 2,6, 2,6)
    //down(0,'up')    // player 1 move up
    //down(1,'right') // player 1 move right
    ////console.log('s_______0>',stage0.snapshots.snapshot[0][0][2])
    //const p00 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]} //0. send 0-2 frames
    //const p01 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}
    //console.log('t______1')
    //update(p00,p01) //1
    ////console.log('s_______0>',stage0.snapshots.snapshot[0][0][2])
    //chec_cursors(2,5, // player 1 moved up
                 //2,6,
                 //3,6, // player 2 moved right
                 //2,6)
    ////stage0.inputs.unpack(p01)
    ////stage1.inputs.unpack(p00) //1. we got 0-2
    //////2-3#######################################################
    //const p10 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x01,0x01]}
    //const p11 = {ack0: 0, ack1: 0, frame_count: 3, frames: [0x00,0x08,0x08]}
    //console.log('t______2')
    //update(p10,p11) //2
    //chec_cursors(2,4, // player 1 moved up
                 //2,6,
                 //4,6, // player 2 moved right
                 //2,6)
    //console.log('unpacking______2_0')
    //stage0.inputs.unpack(p11)
    //console.log('unpacking______2_1')
    //stage1.inputs.unpack(p10)
    //////3-4#######################################################
    //const p20 = {ack0: 0, ack1: 3, frame_count: 4, frames: [0x00,0x01,0x01,0x01]}
    //const p21 = {ack0: 0, ack1: 3, frame_count: 4, frames: [0x00,0x08,0x08,0x08]}
    //console.log('t______3')
    //update(p20,p21) //3
    //stage0.inputs.unpack(p21)
    //stage1.inputs.unpack(p20)
    //////4-5#######################################################
    //const p30 = {ack0: 3, ack1: 4, frame_count: 2, frames: [0x01,0x01]}
    //const p31 = {ack0: 3, ack1: 4, frame_count: 2, frames: [0x08,0x08]}
    //console.log('t______4')
    //update(p30,p31) //4
    //chec_cursors(2,2, // player 1 moved up
                 //2,4,
                 //7,6, // player 2 moved right
                 //2,6)
  /*}) //it*/

  it('#should move cursor', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 0
    const p = _stage0.playfield1
    curs(p,2,6)
    _stage0.update() //5
    _stage0.update() //4
    _stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 3, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
  }) //it

  it('#should', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 4
    const p = _stage0.playfield1
    curs(p,2,6)
    _stage0.update() //5
    _stage0.update() //4
    _stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 4, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
  }) //it

  it('#should', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 4
    const p = _stage0.playfield1
    _stage0.update() //5
    _stage0.update() //4
    _stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 8, frames: [0x00,0x08,0x08,0x08,0x08,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 7, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
    update({ack0: 0, ack1: 7, frame_count: 6, frames: [0x00,0x01,0x01,0x01,0x01,0x01]},null) //1
    curs(p,2,1)
    update({ack0: 0, ack1: 7, frame_count: 7, frames: [0x00,0x01,0x01,0x01,0x01,0x01,0x01]},null) //0
    curs(p,2,0)
  }) //it

}) //describe
