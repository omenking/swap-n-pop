const APP = require('swap-n-pop_app')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const game = require(APP.path.spec('helpers','game_spec'))
const seedrandom = require('seedrandom')
const _f         = require(APP.path.core('filters'))
const Stage      = require(APP.path.states('mode_vs'))(game)
const Playfield  = require(APP.path.components('playfield'))(game)
const Stack      = require(APP.path.core('stack'))(game)

const {
  PANELS,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  STATIC,
  HANG,
  FALL,
  LAND,
  CLEAR
} = require(APP.path.core('data'))

//shorthands
const T = true
const F = false
const N = null

var _playfield = null
function load(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).deserialize(i) }
}

function chec(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).serialize.should.eql(i)}
}

describe('panel_actions', function() {
  var playfield
  beforeEach(function(){
    let stage = new Stage()
    stage.init({seed: 'test'})
    playfield = new Playfield(0)
    playfield.countdown  = { create: sinon.stub(), update: sinon.stub() }
    playfield.cursor     = { create: sinon.stub(), update: sinon.stub() }
    playfield.menu_pause = { create: sinon.stub(), update: sinon.stub() }
    playfield.score_lbl  = { create: sinon.stub(), update: sinon.stub() }
    playfield.running    = true
    playfield.create(stage,{push: false, x: 0, y: 0, panels: new Array(PANELS).fill(null)})
    _playfield = playfield
  })

  //todo - swapping should allow for a panel 
  it('#swap', function(){
    // 1 0 N
    // 1 4 N
    // 2 3 N
    load([0,8 ,1,STATIC,0,F], [1,8 ,0,STATIC,0,F], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.stack(1, 8).swap()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAP_L,0,F], [2,8 ,N,SWAP_R,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
  })

  it('#swapping', function(){
    // 1 0 N
    // 1 4 N
    // 2 3 N
    load([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAP_L,0,F], [2,8 ,N,SWAP_R,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAPPING_L,4,F], [2,8 ,N,SWAPPING_R,4,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F]    , [2,9 ,N,STATIC    ,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F]    , [2,10,N,STATIC    ,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAPPING_L,3,F], [2,8 ,N,SWAPPING_R,3,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F]    , [2,9 ,N,STATIC    ,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F]    , [2,10,N,STATIC    ,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAPPING_L,2,F], [2,8 ,N,SWAPPING_R,2,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F]    , [2,9 ,N,STATIC    ,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F]    , [2,10,N,STATIC    ,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAPPING_L,1,F], [2,8 ,N,SWAPPING_R,1,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F]    , [2,9 ,N,STATIC    ,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F]    , [2,10,N,STATIC    ,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N ,STATIC,0,F], [2,8 ,0,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4 ,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3 ,STATIC,0,F], [2,10,N,STATIC,0,F])
  })

  it('#hang', function(){
    // 1 N 0
    // 1 4 N
    // 2 3 N
    load([0,8 ,1,STATIC,0,F], [1,8 ,N ,STATIC,0,F], [2,8 ,0,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4 ,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3 ,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,0,HANG  ,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
  })

  it('#fall', function(){
    // 1 N 0
    // 1 4 N
    // 2 3 N
    load([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,0,HANG  ,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,0 ,FALL  ,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,false], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,false], [2,9 ,0,FALL  ,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,false], [2,10,N,STATIC,0,F])
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,0,FALL  ,0,F])
  })

  it('#land', function(){
    // 1 N N
    // 1 4 N
    // 2 3 0
    load([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,0,FALL  ,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,0,LAND  ,10,F])
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
    chec([0,8 ,1,STATIC,0,false], [1,8 ,N,STATIC,0,false], [2,8 ,N,STATIC,0,false],
         [0,9 ,1,STATIC,0,false], [1,9 ,4,STATIC,0,false], [2,9 ,N,STATIC,0,false],
         [0,10,2,STATIC,0,false], [1,10,3,STATIC,0,false], [2,10,0,STATIC,0,false])
  })

  it('#combo_3x', function(){
    // N 2 N
    // 2 1 2
    // 3 1 3
    // 2 1 2
    load([0,7 ,N,STATIC,0,F], [1,7 ,2,STATIC,0,F], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,1,STATIC,0,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,1,STATIC,0,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,1,STATIC,0,F], [2,10,2,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,7 ,N,STATIC,0,F], [1,7 ,2,STATIC,0,F], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,1,CLEAR,90,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,1,CLEAR,90,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,1,CLEAR,90,F], [2,10,2,STATIC,0,F])
    for(i = 0; i < 90; i++){ playfield.update() }
    chec([0,7 ,N,STATIC,0,F], [1,7 ,2,HANG  ,0,T], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,N,STATIC,0,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,N,STATIC,0,F], [2,10,2,STATIC,0,F])
  })

  it('#combo_6x', function(){
    // 2 3
    // 2 3
    // 2 3
    load([0,8 ,2,STATIC,0,F], [1,8 ,3,STATIC,0,F],
         [0,9 ,2,STATIC,0,F], [1,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,2,CLEAR,117,F], [1,8 ,3,CLEAR,117,F],
         [0,9 ,2,CLEAR,117,F], [1,9 ,3,CLEAR,117,F],
         [0,10,2,CLEAR,117,F], [1,10,3,CLEAR,117,F])
    for(i = 0; i < 117; i++){ playfield.update() }
    chec([0,8 ,N,STATIC,0,F], [1,8 ,N,STATIC,0,F],
         [0,9 ,N,STATIC,0,F], [1,9 ,N,STATIC,0,F],
         [0,10,N,STATIC,0,F], [1,10,N,STATIC,0,F])
    playfield.score.should.eql(110)
  })

  it('#chain', function(){
    // N 2 N
    // 2 N 2
    // 3 N 3
    // 2 N 2
    load([0,7 ,N,STATIC,0,F], [1,7 ,2,HANG  ,0,T], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,N,STATIC,0,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,N,STATIC,0,F], [2,10,2,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,7 ,N,STATIC,0,F], [1,7 ,2,FALL  ,0,T], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,N,STATIC,0,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,N,STATIC,0,F], [2,10,2,STATIC,0,F])
    playfield.update()
    playfield.update()
    playfield.update()
    chec([0,7 ,N,STATIC,0,F], [1,7 ,N,STATIC,0,F], [2,7 ,N,STATIC,0,F],
         [0,8 ,2,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,2,STATIC,0,F],
         [0,9 ,3,STATIC,0,F], [1,9 ,N,STATIC,0,F], [2,9 ,3,STATIC,0,F],
         [0,10,2,CLEAR,90,F], [1,10,2,CLEAR ,90,T],[2,10,2,CLEAR,90,F])
    playfield.chain.should.eql(1)
  })
}) //klass
