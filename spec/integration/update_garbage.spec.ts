import {playfield_helper} from 'helper'

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
  ROWS,
  COMBO,
  CHAIN
} from 'core/data';

//shorthands
const R = Symbol('random_panel')
const T  = true
const F  = 0
const N  = null
const NN = [null,null,null,null]

let playfield = null
function load(...arr){
  for (let i of arr){
    playfield.stack_xy(i[0], i[1]).load(i)
  }
}

function chec(...arr){
  for (let i of arr){
    let data = playfield.stack_xy(i[0], i[1]).snap
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
    expect(data[6][2]).eql(i[6][2],`${pos}: garbage kind`) //garbage kind
  }
}

describe('garbage_actions', function() {
  beforeEach(function(){
    playfield = playfield_helper()
  })

  // CLEAR stage is happening after garbage, has to happen before.
  // since garbage state gets run with panel states maybe garbage check
  // needs to come after.
  /*
   * When a panels are clearning
   * And combo garbage is touching a clearning panel
   * Then the garbage combo should turn into panels
   */

  it('should clear garbage touching from above', function(){
    // G G
    // C
    // C
    // C
    load([0,19,N,GARBAGE,0,F,[STATIC,5,COMBO]], [1,19,N,GARBAGE,0,F,[STATIC,5,COMBO]],
         [0,20,1,STATIC ,0,F,NN],
         [0,21,1,STATIC ,0,F,NN],
         [0,22,1,STATIC ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,19,R,GARBAGE,54,F,[CLEAR,5,COMBO]], [1,19,R,GARBAGE,54,F,[CLEAR,5,COMBO]],
         [0,20,1,CLEAR ,89,1,NN],
         [0,21,1,CLEAR ,89,1,NN],
         [0,22,1,CLEAR ,89,1,NN])
  })

  it('should clear garbage touching from below', function(){
    // C
    // C
    // C
    // G
    load([0,19,1,STATIC  ,0,F,NN],
         [0,20,1,STATIC  ,0,F,NN],
         [0,21,1,STATIC  ,0,F,NN],
         [0,22,N,GARBAGE ,0,F,[STATIC,5,COMBO]])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,19,1,CLEAR ,89,1,NN],
         [0,20,1,CLEAR ,89,1,NN],
         [0,21,1,CLEAR ,89,1,NN],
         [0,22,R,GARBAGE ,42,F,[CLEAR,5,COMBO]])
  })
  it('should clear garbage touching from the right', function(){
    // C
    // C
    // C G
    load([0,20,1,STATIC  ,0,F,NN],
         [0,21,1,STATIC  ,0,F,NN],
         [0,22,1,STATIC  ,0,F,NN],[1,22,N,GARBAGE ,0,F,[STATIC,5,COMBO]])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,20,1,CLEAR ,89,1,NN],
         [0,21,1,CLEAR ,89,1,NN],
         [0,22,1,CLEAR ,89,1,NN],[1,22,R,GARBAGE ,42,F,[CLEAR,5,COMBO]])
  })
  it('should clear garbage touching from the left', function(){
    //   C
    //   C
    // G C
    load(                                        [1,20,1,STATIC  ,0,F,NN],
                                                 [1,21,1,STATIC  ,0,F,NN],
         [0,22,N,GARBAGE ,0,F,[STATIC,5,COMBO]], [1,22,1,STATIC  ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec(                                        [1,20,1,CLEAR ,89,1,NN],
                                                 [1,21,1,CLEAR ,89,1,NN],
         [0,22,R,GARBAGE ,42,F,[CLEAR,5,COMBO]], [1,22,1,CLEAR ,89,1,NN])
  })
  it('should clear garbage touching in all directions', function(){
    //   G
    //   C
    //   C
    // G C G
    // * G *
    load(                                        [1,18,N,GARBAGE ,0,F,[STATIC,4,COMBO]],
                                                 [1,19,1,STATIC  ,0,F,NN],
                                                 [1,20,1,STATIC  ,0,F,NN],
         [0,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]], [1,21,1,STATIC  ,0,F,NN],               [2,21,N,GARBAGE ,0,F,[STATIC,3,COMBO]],
         [0,22,1,STATIC  ,0,F,NN]              , [1,22,N,GARBAGE ,0,F,[STATIC,2,COMBO]], [2,22,1,STATIC  ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec(                                        [1,18,R,GARBAGE ,78,F,[CLEAR,4,COMBO]],
                                                 [1,19,1,CLEAR   ,89,1,NN],
                                                 [1,20,1,CLEAR   ,89,1,NN],
         [0,21,R,GARBAGE ,78,F,[CLEAR,1,COMBO]], [1,21,1,CLEAR   ,89,1,NN]             , [2,21,R,GARBAGE ,78,F,[CLEAR,3,COMBO]],
         [0,22,1,STATIC  ,0,F,NN]              , [1,22,R,GARBAGE ,78,F,[CLEAR,2,COMBO]], [2,22,1,STATIC  ,0,F,NN])
  })

  it('should clear all combo garbage thats touching and interconnected', function(){
    // G2 G2 G2
    // G1 G1 G1
    // 1  1  1
    load([0,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]], [1,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]], [2,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]],
         [0,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]], [1,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]], [2,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]],
         [0,22,1,STATIC  ,0,F,NN]        , [1,22,1,STATIC  ,0,F,NN]        , [2,22,1,STATIC  ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,20,R,GARBAGE ,102,F,[CLEAR,2,COMBO]], [1,20,R,GARBAGE ,102,F,[CLEAR,2,COMBO]], [2,20,R,GARBAGE ,102,F,[CLEAR,2,COMBO]],
         [0,21,R,GARBAGE ,102,F,[CLEAR,1,COMBO]], [1,21,R,GARBAGE ,102,F,[CLEAR,1,COMBO]], [2,21,R,GARBAGE ,102,F,[CLEAR,1,COMBO]],
         [0,22,1,CLEAR,89,1,NN]                 , [1,22,1,CLEAR  ,89,1,NN]               , [2,22,1,CLEAR  ,89,1,NN])
  })
}) //klass
