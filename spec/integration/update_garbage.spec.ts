import {
  playfield_load,
  playfield_check_garbage,
  playfield_helper,
  R, T, F, N, NN
} from 'helper'

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

let playfield = null

function load(...arr){ playfield_load(playfield,...arr)  }
function chec(...arr){ playfield_check_garbage(playfield,...arr) }

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
    // G2
    // G1
    // 1  1  1
    load([0,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]],
         [0,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]],
         [0,22,1,STATIC  ,0,F,NN], [1,22,1,STATIC  ,0,F,NN], [2,22,1,STATIC  ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    chec([0,20,R,GARBAGE ,54,F,[CLEAR,2,COMBO]],
         [0,21,R,GARBAGE ,54,F,[CLEAR,1,COMBO]],
         [0,22,1,CLEAR,89,1,NN], [1,22,1,CLEAR  ,89,1,NN], [2,22,1,CLEAR  ,89,1,NN])
  })

  it('time_max,time_cur,time_pop',function(){
    // G2{5} G2{4} G2{3}
    //       G1{2} G1{1} G1{0}
    // 1     1     1
    load([0,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]],[1,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]],[2,20,N,GARBAGE ,0,F,[STATIC,2,COMBO]],
                                                                                       [2,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]],[3,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]],[4,21,N,GARBAGE ,0,F,[STATIC,1,COMBO]],
         [0,22,1,STATIC  ,0,F,NN]              ,[1,22,1,STATIC  ,0,F,NN]              ,[2,22,1,STATIC  ,0,F,NN])
    //################################################################
    playfield.update()
    playfield.update()
    playfield.update()
    expect(playfield.stack_xy(4,21).garbage.clear_index).to.eql([5,6])

    expect(playfield.stack_xy(4,21).garbage.time_pop).to.eql(42)  // G1{0}
    expect(playfield.stack_xy(3,21).garbage.time_pop).to.eql(54)  // G1{1}
    expect(playfield.stack_xy(2,21).garbage.time_pop).to.eql(66)  // G1{2}
    expect(playfield.stack_xy(2,20).garbage.time_pop).to.eql(78)  // G1{3}
    expect(playfield.stack_xy(1,20).garbage.time_pop).to.eql(90)  // G1{4}
    expect(playfield.stack_xy(0,20).garbage.time_pop).to.eql(102) // G1{5}
  })
}) //klass
