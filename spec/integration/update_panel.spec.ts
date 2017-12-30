import * as fs         from 'fs'
import * as seedrandom from 'seedrandom'
import Stage           from 'states/mode_vs'
import Playfield       from 'components/playfield'
import Stack           from 'core/stack'
import {
  playfield_load,
  playfield_check,
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
  ROWS
} from 'core/data';

//shorthands
const R = Symbol('random_panel')
const T  = true
const F  = 0
const N  = null
const NN = [null,null,null,null]
let playfield = null

function load(...arr){ playfield_load(playfield,...arr)  }
function chec(...arr){ playfield_check(playfield,...arr) }

describe('panel_actions', function() {
  beforeEach(function(){
    playfield = playfield_helper({cpu: [false,null]})
  })

  //todo - swapping should allow for a panel
  it('#swap', function(){
    // 1 0 N
    // 1 4 N
    // 2 3 N
    load([0,20,1,STATIC,0,F], [1,20,0,STATIC,0,F], [2,20,N,STATIC,0,F],
         [0,21,1,STATIC,0,F], [1,21,4,STATIC,0,F], [2,21,N,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F], [2,22,N,STATIC,0,F])
    //################################################################
    playfield.stack_xy(1, 20).swap()
    chec([0,20,1,STATIC,0,F], [1,20,0,SWAP_L,0,F], [2,20,N,SWAP_R,0,F],
         [0,21,1,STATIC,0,F], [1,21,4,STATIC,0,F], [2,21,N,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F], [2,22,N,STATIC,0,F])
  })

  it('#swapping', function(){
    // 0 N
    load([0,22 ,0,SWAP_L,0,F], [1,22 ,N,SWAP_R,0,F])
    //################################################################
    playfield.update(); chec([0,22 ,N,SWAPPING_L,4,F], [1,22 ,0,SWAPPING_R,4,F])
    playfield.update(); chec([0,22 ,N,SWAPPING_L,3,F], [1,22 ,0,SWAPPING_R,3,F])
    playfield.update(); chec([0,22 ,N,SWAPPING_L,2,F], [1,22 ,0,SWAPPING_R,2,F])
    playfield.update(); chec([0,22 ,N,SWAPPING_L,1,F], [1,22 ,0,SWAPPING_R,1,F])
    playfield.update(); chec([0,22 ,N,STATIC    ,0,F], [1,22 ,0,STATIC    ,0,F])
  })

  it('#hang', function(){
    // 1
    // 0
    // N
    // N
    load([0,19,1,STATIC,0,F],
         [0,20,0,STATIC,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,19,1,HANG  ,10,F],
         [0,20,0,HANG  ,10,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
  })

  it('#fall', function(){
    // 1
    // 0
    // N
    // N
    load([0,19,1,HANG  ,0,F],
         [0,20,0,HANG  ,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,19,1 ,FALL ,0,F],
         [0,20,0 ,FALL ,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F],
         [0,20,1,FALL  ,0,F],
         [0,21,0,FALL  ,0,F],
         [0,22,N,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F],
         [0,20,N,STATIC,0,F],
         [0,21,1,FALL  ,0,F],
         [0,22,0,FALL  ,0,F])
  })

  it('#land', function(){
    // 1 N N
    // 1 4 N
    // 2 3 0
    load([0,20,1,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,N,STATIC,0,F],
         [0,21,1,STATIC,0,F], [1,21,4,STATIC,0,F], [2,21,N,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F], [2,22,0,FALL  ,0,F])
    //################################################################
    playfield.update()
    chec([0,20,1,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,N,STATIC,0,F],
         [0,21,1,STATIC,0,F], [1,21,4,STATIC,0,F], [2,21,N,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F], [2,22,0,LAND  ,10,F])
    playfield.update() // 9
    playfield.update() // 8
    playfield.update() // 7
    playfield.update() // 6
    playfield.update() // 5
    playfield.update() // 4
    playfield.update() // 3
    playfield.update() // 2
    playfield.update() // 1
    playfield.update() // 0
    chec([0,20,1,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,N,STATIC,0,F],
         [0,21,1,STATIC,0,F], [1,21,4,STATIC,0,F], [2,21,N,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F], [2,22,0,STATIC,0,F])
  })

  it('#combo_3x', function(){
    // 2
    // 1
    // 1
    // 1
    load([0,19,2,STATIC,0,F],
         [0,20,1,STATIC,0,F],
         [0,21,1,STATIC,0,F],
         [0,22,1,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,19,2,STATIC,0,F],
         [0,20,1,CLEAR,78,1],
         [0,21,1,CLEAR,78,1],
         [0,22,1,CLEAR,78,1])
    for(let i = 0; i < 78; i++){ playfield.update() }
    chec([0,19,2,HANG  ,10,1],
         [0,20,N,STATIC,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
  })

  it('#combo_4x', function(){
    // 1
    // 1
    // 1
    // 1
    load([0,19,1,STATIC,0,F],
         [0,20,1,STATIC,0,F],
         [0,21,1,STATIC,0,F],
         [0,22,1,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,19,1,CLEAR,87,1],
         [0,20,1,CLEAR,87,1],
         [0,21,1,CLEAR,87,1],
         [0,22,1,CLEAR,87,1])
    for(let i = 0; i < 87; i++){ playfield.update() }
    chec([0,19,N,STATIC,0,F],
         [0,20,N,STATIC,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
  })

  it('#combo_5x', function(){
    // 1
    // 1
    // 1
    // 1
    // 1
    load([0,18,1,STATIC,0,F],
         [0,19,1,STATIC,0,F],
         [0,20,1,STATIC,0,F],
         [0,21,1,STATIC,0,F],
         [0,22,1,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,18,1,CLEAR,96,1],
         [0,19,1,CLEAR,96,1],
         [0,20,1,CLEAR,96,1],
         [0,21,1,CLEAR,96,1],
         [0,22,1,CLEAR,96,1])
    for(let i = 0; i < 96; i++){ playfield.update() }
    chec([0,18,N,STATIC,0,F],
         [0,19,N,STATIC,0,F],
         [0,20,N,STATIC,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
  })

  it('#combo_6x', function(){
    // 2 3
    // 2 3
    // 2 3
    load([0,20,2,STATIC,0,F], [1,20,3,STATIC,0,F],
         [0,21,2,STATIC,0,F], [1,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,3,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,20,2,CLEAR,105,1], [1,20,3,CLEAR,105,1],
         [0,21,2,CLEAR,105,1], [1,21,3,CLEAR,105,1],
         [0,22,2,CLEAR,105,1], [1,22,3,CLEAR,105,1])
    for(let i = 0; i < 105; i++){ playfield.update() }
    chec([0,20,N,STATIC,0,F], [1,20,N,STATIC,0,F],
         [0,21,N,STATIC,0,F], [1,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F], [1,22,N,STATIC,0,F])
    playfield.score.should.eql(110)
  })

  it('#chain', function(){
    // N 2 N
    // 2 N 2
    // 3 N 3
    // 2 N 2
    load([0,19,N,STATIC,0,F], [1,19,2,HANG  ,0,1], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,N,STATIC,0,F], [2,22,2,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,2,FALL  ,0,1], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,N,STATIC,0,F], [2,22,2,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,N,STATIC,0,F], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,2,FALL  ,0,1], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,N,STATIC,0,F], [2,22,2,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,N,STATIC,0,F], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,2,FALL  ,0,1], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,N,STATIC,0,F], [2,22,2,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,N,STATIC,0,F], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,2,FALL  ,0,1], [2,22,2,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,N,STATIC,0,F], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,STATIC,0,F], [1,22,2,LAND  ,10,1],[2,22,2,STATIC,0,F])
    playfield.update()
    chec([0,19,N,STATIC,0,F], [1,19,N,STATIC,0,F], [2,19,N,STATIC,0,F],
         [0,20,2,STATIC,0,F], [1,20,N,STATIC,0,F], [2,20,2,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21,N,STATIC,0,F], [2,21,3,STATIC,0,F],
         [0,22,2,CLEAR ,78,2],[1,22,2,CLEAR ,78,2],[2,22,2,CLEAR,78,2])
    playfield.chain.should.eql(2)
  })

  it('#chain_swap', function(){
    // swap in 2 as 4 is falling
    // 3 2 3
    // 1 4 1
    // 0 4 0
    // 3 4 2
    // 1 2 3
    load([0,18,3,STATIC,0,F], [1,18 ,2,STATIC,0,F], [2,18,3,STATIC,0,F],
         [0,19,1,STATIC,0,F], [1,19 ,4,STATIC,0,F], [2,19,1,STATIC,0,F],
         [0,20,0,STATIC,0,F], [1,20 ,4,STATIC,0,F], [2,20,0,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21 ,4,STATIC,0,F], [2,21,2,STATIC,0,F],
         [0,22,1,STATIC,0,F], [1,22 ,2,STATIC,0,F], [2,22,3,STATIC,0,F])
    //################################################################
    playfield.update()
    load([0,6 ,3,STATIC,0,F], [1,6  ,2,STATIC,0,F], [2,18,3,STATIC,0,F],
         [0,7 ,1,STATIC,0,F], [1,7  ,4,CLEAR,90,F], [2,19,1,STATIC,0,F],
         [0,8 ,0,STATIC,0,F], [1,8  ,4,CLEAR,90,F], [2,20,0,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9  ,4,CLEAR,90,F], [2,21,2,STATIC,0,F],
         [0,10,1,STATIC,0,F], [1,10 ,2,STATIC,0,F], [2,22,3,STATIC,0,F])
    for(let i = 0; i < 90; i++){ playfield.update() }
    load([0,18,3,STATIC,0,F], [1,18 ,2,HANG,0,T]  , [2,18,3,STATIC,0,F],
         [0,19,1,STATIC,0,F], [1,19 ,N,STATIC,0,F], [2,19,1,STATIC,0,F],
         [0,20,0,STATIC,0,F], [1,20 ,N,STATIC,0,F], [2,20,0,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21 ,N,STATIC,0,F], [2,21,2,STATIC,0,F],
         [0,22,1,STATIC,0,F], [1,22 ,2,STATIC,0,F], [2,22,3,STATIC,0,F])
    playfield.swap(1,22)
    load([0,18,3,STATIC,0,F], [1,18 ,2,HANG,0,T]  , [2,18,3,STATIC,0,F],
         [0,19,1,STATIC,0,F], [1,19 ,N,STATIC,0,F], [2,19,1,STATIC,0,F],
         [0,20,0,STATIC,0,F], [1,20 ,N,STATIC,0,F], [2,20,0,STATIC,0,F],
         [0,21,3,STATIC,0,F], [1,21 ,N,STATIC,0,F], [2,21,2,STATIC,0,F],
         [0,22,1,STATIC,0,F], [1,22 ,2,SWAP_L,0,F], [2,22,3,SWAP_R,0,F])
  })
  it('#danger_fall', function(){
  // A danger panel should hang and fall just like a static panel
    // 0
    // N
    // N
    // N
    // N
    // N
    // N
    // N
    // N
    // N
    // N
    load(
         [0,12,0,STATIC,0,F],
         [0,13,N,STATIC,0,F],
         [0,14,N,STATIC,0,F],
         [0,15,N,STATIC,0,F],
         [0,16,N,STATIC,0,F],
         [0,17,N,STATIC,0,F],
         [0,18,N,STATIC,0,F],
         [0,19,N,STATIC,0,F],
         [0,20,N,STATIC,0,F],
         [0,21,N,STATIC,0,F],
         [0,22,N,STATIC,0,F])
    playfield.update()
    chec([0,12 ,0,HANG,10,F])
  })

  it('#fall-interrupt', function(){
      load([0,17,4,STATIC,0,F], [1,17,5,HANG,1,F],
           [0,18,5,STATIC,0,F], [1,18,4,HANG,1,F],
           [0,19,4,STATIC,0,F], 
           [0,20,3,STATIC,0,F],
                                [1,21,3,HANG,9,F],
           [0,22,1,STATIC,0,F])
           
      playfield.update();
      
      chec([1,17,5,FALL,0,F]);
  })
}) //klass
