import * as fs         from 'fs'
import * as seedrandom from 'seedrandom'
import Stage           from 'states/mode_vs'
import Playfield       from 'components/playfield'
import Stack           from 'core/stack'

import {
  PANELS,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  STATIC,
  HANG,
  FALL,
  LAND,
  CLEAR,
  GARBAGE,
  ROWS
} from 'core/data';

//shorthands
const R = Symbol('random_panel')
const T  = true
const F  = 0
const N  = null
const NN = [null,null]

var _playfield = null
function load(...arr){
  for (let i of arr){
    _playfield.stack_xy(i[0], i[1]).load(i)
  }
}

function chec(...arr){
  for (let i of arr){
    let data = _playfield.stack_xy(i[0], i[1]).snap
    // its a bit hard to debug, so I added type and post
    // so when tests fail they are more readble
    // eg   AssertionError: expected [ 'chain', '1,20', 1 ] to deeply equal [ 'chain', '1,20', 0 ]
    let pos  = `${i[0]},${i[1]}`
    if (i[2] === R)
      expect(data[2]).to.be.a('number',`${pos}: kind`) //kind
    else
      expect(data[2]).eql(i[2]   ,`${pos}: kind`) //kind

    expect(data[3]   ).eql(i[3]   ,`${pos}: state`  ) //state
    expect(data[4]   ).eql(i[4]   ,`${pos}: counter`) //counter
    expect(data[5]   ).eql(i[5]   ,`${pos}: chain`  ) //chain
    expect(data[6][0]).eql(i[6][0],`${pos}: garbage state`) //garbage state
    expect(data[6][1]).eql(i[6][1],`${pos}: garbage group`) //garbage group
  }
}

describe('garbage_actions', function() {
  var playfield
  beforeEach(function(){
    let stage = new Stage()
    stage.init({
      seed: 'test',
      cpu: [false,false]
    })
    stage.state = 'running'
    playfield = new Playfield(0)
    playfield.countdown  = { create: sinon.stub(), update: sinon.stub() }
    playfield.cursor     = { create: sinon.stub(), update: sinon.stub() }
    playfield.menu_pause = { create: sinon.stub(), update: sinon.stub() }
    playfield.score_lbl  = { create: sinon.stub(), update: sinon.stub() }
    playfield.create(stage,{push: false, x: 0, y: 0, panels: new Array(PANELS).fill(null)})
    _playfield = playfield
  })

  // CLEAR stage is happening after garbage, has to happen before.
  // since garbage state gets run with panel states maybe garbage check
  // needs to come after.
  /*
   * When a panels are clearning
   * And combo garbage is touching a clearning panel
   * Then the garbage combo should turn into panels
   */

  it('#clear_from_under', function(){
    // G
    // C
    // C
    // C
    load([0,19,N,GARBAGE,0,F,[STATIC,5]],
         [0,20,1,STATIC ,0,F,NN]        ,
         [0,21,1,STATIC ,0,F,NN]        ,
         [0,22,1,STATIC ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,19,R,GARBAGE,42,F,[CLEAR,5]],
         [0,20,1,CLEAR ,89,1,NN],
         [0,21,1,CLEAR ,89,1,NN],
         [0,22,1,CLEAR ,89,1,NN])
  })

  it('#clear_from_above', function(){
    // C
    // C
    // C
    // G
    load([0,19,1,STATIC  ,0,F,NN],
         [0,20,1,STATIC  ,0,F,NN],
         [0,21,1,STATIC  ,0,F,NN],
         [0,22,N,GARBAGE ,0,F,[STATIC,5])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,19,1,CLEAR ,89,1,NN],
         [0,20,1,CLEAR ,89,1,NN],
         [0,21,1,CLEAR ,89,1,NN],
         [0,22,R,GARBAGE ,42,F,[CLEAR,5])
  })
}) //klass
