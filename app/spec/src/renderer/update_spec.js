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
  LAND
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

describe('Panel Update', function() {
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

  it('swap', function(){
    load([0,8 ,1,STATIC,0,F], [1,8 ,0,STATIC,0,F], [2,8 ,N,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.stack(1, 8).swap()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,0,SWAP_L,0,F], [2,8 ,N,SWAP_R,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
  })

  it('swapping', function(){
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

  it('hang', function(){
    load([0,8 ,1,STATIC,0,F], [1,8 ,N ,STATIC,0,F], [2,8 ,0,STATIC,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4 ,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3 ,STATIC,0,F], [2,10,N,STATIC,0,F])
    //################################################################
    playfield.update()
    chec([0,8 ,1,STATIC,0,F], [1,8 ,N,STATIC,0,F], [2,8 ,0,HANG  ,0,F],
         [0,9 ,1,STATIC,0,F], [1,9 ,4,STATIC,0,F], [2,9 ,N,STATIC,0,F],
         [0,10,2,STATIC,0,F], [1,10,3,STATIC,0,F], [2,10,N,STATIC,0,F])
  })

  it('fall', function(){
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

  it('land', function(){
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
}) //klass
