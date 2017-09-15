const APP = require('../../../../app')('../../../../')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const Game = require(APP.path.spec('helpers','game_spec'))
const game = new Game()
const seedrandom = require('seedrandom')
const _f         = require(APP.path.core('filters'))
const Stage      = require(APP.path.states('mode_vs'))(game)
const Playfield  = require(APP.path.components('playfield'))(game)
const Stack      = require(APP.path.core('stack'))(game)

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
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        1,2,3,4,N,1
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
    let panels = [
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        1,N,N,N,N,N,
        1,N,N,N,N,N,
        1,N,N,N,N,N
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
      let panels = [
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          N,N,N,N,N,N,
          1,N,N,N,N,N,
          2,N,N,N,N,N,
          3,N,N,N,N,N
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

  describe('#snap()' ,function(){
    let panels = [
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        1,N,N,N,N,N,
        2,N,N,N,N,N,
        3,N,N,N,N,N
      ]
    let stage = new Stage()
    stage.init({seed: 'test'})

    let playfield = new Playfield(0)
    playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
    playfield.create_after()
    console.log('ps',playfield.snap)
    playfield.snap.should.eql([
      false,
      [ 2, 6, 'hidden', 0, 0 ],
      [
        [ 0, 0, null, 0, 0, false ],
        [ 1, 0, null, 0, 0, false ],
        [ 2, 0, null, 0, 0, false ],
        [ 3, 0, null, 0, 0, false ],
        [ 4, 0, null, 0, 0, false ],
        [ 5, 0, null, 0, 0, false ],
        [ 0, 1, null, 0, 0, false ],
        [ 1, 1, null, 0, 0, false ],
        [ 2, 1, null, 0, 0, false ],
        [ 3, 1, null, 0, 0, false ],
        [ 4, 1, null, 0, 0, false ],
        [ 5, 1, null, 0, 0, false ],
        [ 0, 2, null, 0, 0, false ],
        [ 1, 2, null, 0, 0, false ],
        [ 2, 2, null, 0, 0, false ],
        [ 3, 2, null, 0, 0, false ],
        [ 4, 2, null, 0, 0, false ],
        [ 5, 2, null, 0, 0, false ],
        [ 0, 3, null, 0, 0, false ],
        [ 1, 3, null, 0, 0, false ],
        [ 2, 3, null, 0, 0, false ],
        [ 3, 3, null, 0, 0, false ],
        [ 4, 3, null, 0, 0, false ],
        [ 5, 3, null, 0, 0, false ],
        [ 0, 4, null, 0, 0, false ],
        [ 1, 4, null, 0, 0, false ],
        [ 2, 4, null, 0, 0, false ],
        [ 3, 4, null, 0, 0, false ],
        [ 4, 4, null, 0, 0, false ],
        [ 5, 4, null, 0, 0, false ],
        [ 0, 5, null, 0, 0, false ],
        [ 1, 5, null, 0, 0, false ],
        [ 2, 5, null, 0, 0, false ],
        [ 3, 5, null, 0, 0, false ],
        [ 4, 5, null, 0, 0, false ],
        [ 5, 5, null, 0, 0, false ],
        [ 0, 6, null, 0, 0, false ],
        [ 1, 6, null, 0, 0, false ],
        [ 2, 6, null, 0, 0, false ],
        [ 3, 6, null, 0, 0, false ],
        [ 4, 6, null, 0, 0, false ],
        [ 5, 6, null, 0, 0, false ],
        [ 0, 7, null, 0, 0, false ],
        [ 1, 7, null, 0, 0, false ],
        [ 2, 7, null, 0, 0, false ],
        [ 3, 7, null, 0, 0, false ],
        [ 4, 7, null, 0, 0, false ],
        [ 5, 7, null, 0, 0, false ],
        [ 0, 8, 1, 0, 0, false ],
        [ 1, 8, null, 0, 0, false ],
        [ 2, 8, null, 0, 0, false ],
        [ 3, 8, null, 0, 0, false ],
        [ 4, 8, null, 0, 0, false ],
        [ 5, 8, null, 0, 0, false ],
        [ 0, 9, 2, 0, 0, false ],
        [ 1, 9, null, 0, 0, false ],
        [ 2, 9, null, 0, 0, false ],
        [ 3, 9, null, 0, 0, false ],
        [ 4, 9, null, 0, 0, false ],
        [ 5, 9, null, 0, 0, false ],
        [ 0, 10, 3, 0, 0, false ],
        [ 1, 10, null, 0, 0, false ],
        [ 2, 10, null, 0, 0, false ],
        [ 3, 10, null, 0, 0, false ],
        [ 4, 10, null, 0, 0, false ],
        [ 5, 10, null, 0, 0, false ] 
      ]
    ])
  })

  describe('#load()' ,function(){
  })
}) //klass
