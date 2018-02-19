import * as fs      from 'fs'
import Stage        from 'states/mode_vs'
import CoreControls from 'core/controls'
import assets from 'core/assets'
import {ROWS_INV} from 'common/data'
assets.preload()
assets.load()

// forgive me for I have sinned.
const klass = CoreControls.instance_class
const controls0 = new klass()
const controls1 = new klass()
controls0.create()
controls1.create()

let stage0 = null
let stage1 = null

function update(p0,p1){
  if (p0 !== null) { stage0.update() }
  if (p1 !== null) { stage1.update() }
  if (p0 !== null) {
    stage0.inputs.last_pack.ack0.should.eql(p0.ack0)
    stage0.inputs.last_pack.ack1.should.eql(p0.ack1)
    stage0.inputs.last_pack.frame_count.should.eql(p0.frame_count)
    stage0.inputs.last_pack.frames.should.eql(p0.frames)
  }
  if (p1 !== null) {
    stage1.inputs.last_pack.ack0.should.eql(p1.ack0)
    stage1.inputs.last_pack.ack1.should.eql(p1.ack1)
    stage1.inputs.last_pack.frame_count.should.eql(p1.frame_count)
    stage1.inputs.last_pack.frames.should.eql(p1.frames)
  }
}

function curs(p,x,y){
  expect(p.cursor.x).eql(x)
  expect(p.cursor.y).eql(y)
}

function down(n,key){
  if (n === 0) {
    controls0.keys[`pl0_${key}`].isDown = true
  } else if (n === 1){
    controls1.keys[`pl0_${key}`].isDown = true
  }
}

describe('Online Simulation', function() {
  beforeEach(function(){
    const init0 = {
      countdown: false
      seed     : 'puzzle',
      cpu      : [false,false],
      online   : true,
      controls : controls0
    }
    const init1 = {
      countdown: false
      seed     : 'puzzle',
      cpu      : [false,false],
      online   : true,
      controls : controls1
    }
    stage0  = new Stage()
    stage1  = new Stage()
    stage0.init(init0)
    stage1.init(init1)
    stage0.create()
    stage1.create()
  })

  //// commented out because I just wanted to run the spec below
  //it('#data', function(){
    ////0-1#######################################################
    //chec_cursors(2,6, 2,6, 2,6, 2,6)
    //controls0.execute(0,0x01) // player 1 move up
    //controls1.execute(0,0x08) // player 1 move right
    //update(,
      //{ack0 : 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]},
      //{ack0 : 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}
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
    //controls0.execute(0,0x00) // none
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
    //controls1.execute(0,0x00) // none
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

  it('#should move cursor', function(){
    ////0-1#######################################################
    const pl00 = stage0.playfield0
    const pl01 = stage0.playfield1
    const pl10 = stage1.playfield0
    const pl11 = stage1.playfield1

    // Sanity check their default location
    curs(pl00,2,ROWS_INV+6)
    curs(pl01,2,ROWS_INV+6)
    curs(pl10,2,ROWS_INV+6)
    curs(pl11,2,ROWS_INV+6)
    down(0,'up')    // player 1 move up
    down(1,'right') // player 1 move right
    //console.log('s_______0>',stage0.snapshots.snapshot[0][0][2])

    const p00 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]} //0. send 0-2 frames
    const p01 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}

    console.log('t______1')
    update(p00,p01) //1
    //console.log('s_______0>',stage0.snapshots.snapshot[0][0][2])

    // Both players own games should reflect that have moved.
    curs(pl00,2,ROWS_INV+5) // player 1 moved up
    curs(pl10,3,ROWS_INV+6) // player 2 moved right
    // Simulate sending the data to the other game
    stage0.inputs.unpack(p01)
    stage1.inputs.unpack(p00) //1. we got 0-2
    ////2-3#######################################################
    down(0,'up')    // player 1 move up
    down(1,'right') // player 1 move right

    const p10 = {ack0: 0, ack1: 1, frame_count: 3, frames: [0x00,0x01,0x01]}
    const p11 = {ack0: 0, ack1: 1, frame_count: 3, frames: [0x00,0x08,0x08]}

    console.log('t______2')
    update(p10,p11) //2

    curs(pl00,2,ROWS_INV+4) // player 1 moved up
    curs(pl10,4,ROWS_INV+6) // player 2 moved right
    console.log('unpacking______2_0')
    stage0.inputs.unpack(p11)
    console.log('unpacking______2_1')
    stage1.inputs.unpack(p10)
    ////3-4#######################################################
    const p20 = {ack0: 0, ack1: 2, frame_count: 4, frames: [0x00,0x01,0x01,0x01]}
    const p21 = {ack0: 0, ack1: 2, frame_count: 4, frames: [0x00,0x08,0x08,0x08]}
    console.log('t______3')
    update(p20,p21) //3
    stage0.inputs.unpack(p21)
    stage1.inputs.unpack(p20)
    ////4-5#######################################################
    const p30 = {ack0: 3, ack1: 3, frame_count: 2, frames: [0x01,0x01]}
    const p31 = {ack0: 3, ack1: 3, frame_count: 2, frames: [0x08,0x08]}
    console.log('t______4')
    update(p30,p31) //4
    curs(pl00,2,ROWS_INV+2) // player 1 moved up
    curs(pl01,2,ROWS_INV+4)
    curs(pl10,7,ROWS_INV+6) // player 2 moved right
    curs(pl11,2,ROWS_INV+6)
  }) //it

  it.skip('#should move cursor', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 0
    const p = stage0.playfield1
    curs(p,2,18)
    stage0.update() //5
    stage0.update() //4
    stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 3, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
  }) //it

  it.skip('#should', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 4
    const p = stage0.playfield1
    curs(p,2,18)
    stage0.update() //5
    stage0.update() //4
    stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 4, frames: [0x00,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 4, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
  }) //it

  it.skip('#should', function(){
    down(0,'up')    // player 1 move up
    stage0.inputs.ack[0] = 4
    const p = stage0.playfield1
    stage0.update() //5
    stage0.update() //4
    stage0.update() //3
    stage0.inputs.unpack({ack0: 0, ack1: 0, frame_count: 8, frames: [0x00,0x08,0x08,0x08,0x08,0x08,0x08,0x08]})
    update({ack0: 0, ack1: 7, frame_count: 5, frames: [0x00,0x01,0x01,0x01,0x01]},null) //2
    curs(p,2,2)
    update({ack0: 0, ack1: 7, frame_count: 6, frames: [0x00,0x01,0x01,0x01,0x01,0x01]},null) //1
    curs(p,2,1)
    update({ack0: 0, ack1: 7, frame_count: 7, frames: [0x00,0x01,0x01,0x01,0x01,0x01,0x01]},null) //0
    curs(p,2,0)
  }) //it

}) //describe
