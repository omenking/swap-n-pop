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


describe('Playfield', function() {
  describe('#class_name' ,function(){
    it('should be type of Playfield', function(){
      const playfield = new Playfield(0)
      playfield.should.be.a('Playfield')
    })
  })

  describe('#constructor()' ,function(){
    it('should work with player_id 0', function(){
      const playfield = new Playfield(0)
    })
    it('should work with player_id 1', function(){
      const playfield = new Playfield(1)
    })
    it('should error out if invalid player_id', function(){
      (function(){
        const playfield = new Playfield()
      }).should.throw("player_number present and must be 0 or 1")
    })
  })

  describe('#create()' ,function(){
    it('should work', function(){
      const stage = new Stage()
      stage.init({seed: 'test'})
      const stack     = new Stack(stage.rng)
      stack.create()
      const playfield = new Playfield(0)
      playfield.create_stack = sinon.stub()
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
    })
  })

  describe('#create_panels()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      stack = new Stack(stage.rng)
      stack.create()
      playfield = new Playfield(0)
    })
    it('should create stack of 72 with push', function(){
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
      playfield.stack_len.should.eql(72)
    })
    it('should create stack of 66 without push', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      playfield.stack_len.should.eql(66)
    })
    it('should create stack full of panels', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      for(let panel of playfield.stack()){
        panel.should.all.be.a('Panel')
      }
    })
  })

  describe('#fill_panels()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      playfield = new Playfield(0)
    })
    it('should fill panels', function(){
      playfield.create(stage,{push: true, x: 0, y: 0, panels: [
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        1,2,3,4,null,1
      ]})

      //for(let panel of playfield.stack){
        //let i = playfield.stack.indexOf(panel)
        //console.log(i,panel.serialize())
      //}

      playfield.stack(0,10).kind.should.eql(1)
      playfield.stack(1,10).kind.should.eql(2)
      playfield.stack(2,10).kind.should.eql(3)
      playfield.stack(3,10).kind.should.eql(4)
      playfield.stack(5,10).kind.should.eql(1)
    })
  })

  describe('#update_stack()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      playfield = new Playfield(0)
      playfield.create(stage,{push: true, x: 0, y: 0, panels: [1,2,3,4,null,1]})
    })
    it('should work', function(){
      playfield.update_stack()
    })
  })

  describe('#chain_and_combo()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    let panels   = [
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        null,null,null,null,null,null,
        1   , null, null, null, null, null,
        1   , null, null, null, null, null,
        1   , null, null, null, null, null
      ]
    beforeEach(function(){
      stage = new Stage()
      stage.init({seed: 'test'})
      playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
    })
    it('should find one chain_and_combo', function(){
      playfield.chain_and_combo().should.eql([3,false])
    })
  })

  describe('#push()' ,function(){
    it('should shift panels up in stack', function(){
      let panels   = [
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          null,null,null,null,null,null,
          1 , null, null, null, null, null,
          2 , null, null, null, null, null,
          3 , null, null, null, null, null
        ]
      let stage = new Stage()
      stage.init({seed: 'test'})

      let playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})

      playfield.stack(0,8).kind.should.eql(1)
      playfield.stack(0,9).kind.should.eql(2)

      playfield.stack(0,8).y.should.eql(8)
      playfield.stack(0,9).y.should.eql(9)

      playfield.push()
      playfield.stack(0,8).kind.should.eql(2)
      playfield.stack(0,9).kind.should.eql(3)

      playfield.stack(0,8).y.should.eql(8)
      playfield.stack(0,9).y.should.eql(9)
    })
  })
}) //klass

var _playfield = null
function load(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).deserialize(i) }
}

function chec(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).serialize.should.eql(i)}
}

describe.only('Playfield Actions', function() {
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
