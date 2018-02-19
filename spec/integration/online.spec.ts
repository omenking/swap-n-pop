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

function press(n,dir,key){
  if (n === 0) {
    controls0.keys[`pl0_${key}`].isDown = (dir === 'down')
  } else if (n === 1){
    controls1.keys[`pl0_${key}`].isDown = (dir === 'down')
  }
}

function press_down(n,key) {
  press(n,'down',key)
}

function press_up(n,key) {
  press(n,'up',key)
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


  /*
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

    ////1-2#######################################################
    press_down(0,'up')    // player 1 move up
    press_down(1,'right') // player 1 move right

    const p00 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x01]} //0. send 0-2 frames
    const p01 = {ack0: 0, ack1: 0, frame_count: 2, frames: [0x00,0x08]}

    console.log('t______1')
    update(p00,p01) //1

    // Both players own games should reflect that have moved.
    curs(pl00,2,ROWS_INV+5) // player 1 moved up
    curs(pl10,3,ROWS_INV+6) // player 2 moved right
    // Simulate sending the data to the other game
    stage0.inputs.unpack(stage1.inputs.last_pack)
    stage1.inputs.unpack(stage0.inputs.last_pack)
    ////2-3#######################################################
    press_up(0,'up')    // player stops moving
    press_up(1,'right') // player stops moving

    console.log('t______2')
    update(p10,p11) //2

    curs(pl00,2,ROWS_INV+5) // player 1 moved up
    curs(pl10,3,ROWS_INV+6) // player 2 moved right
    stage0.inputs.unpack(stage1.inputs.last_pack)
    stage1.inputs.unpack(stage0.inputs.last_pack)
    ////3-4#######################################################
    press_down(0,'up')    // player 1 move up
    press_down(1,'right') // player 1 move right

    const p20 = {ack0: 1, ack1: 2, frame_count: 4, frames: [0x00,0x01,0x00,0x01]}
    const p21 = {ack0: 1, ack1: 2, frame_count: 4, frames: [0x00,0x08,0x00,0x08]}
    console.log('t______3')
    update(p20,p21) //3
    stage0.inputs.unpack(stage1.inputs.last_pack)
    stage1.inputs.unpack(stage0.inputs.last_pack)
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
  */

  /*
   * From Player 1, press right a few times
   * Then send the data to Player 2, unpack
   * and update data and see if other cursor
   * is in the correct position
   */
  it('#should move cursor', function(){
    stage0.inputs.ack[0] = 0
    const pl00 = stage0.playfield0
    const pl11 = stage1.playfield1
    expect(pl00.cursor.x).eql(2)
    expect(pl11.cursor.x).eql(2)
    press_down(0,'right'); stage0.update() //move
    press_up(  0,'right'); stage0.update() //dont move
    press_down(0,'right'); stage0.update() //move
    expect(pl00.cursor.x).eql(4)

    stage1.update()
    stage1.update()
    stage1.inputs.unpack(stage0.inputs.last_pack)
    stage1.update()

    // since we unpacked the data the opposite playfield
    // from the opposite player cursor should have moved
    expect(pl11.cursor.x).eql(4)
  }) //it

}) //describe
