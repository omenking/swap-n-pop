import fs         from 'fs'
import seedrandom from 'seedrandom'
import Game       from 'helpers/game_mock'
import _f         from 'core/filters'
import Stage      from 'states/mode_vs'
import Playfield  from 'components/playfield'
import Stack      from 'core/stack'


const game = new Game()
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
    stage.init({seed: 'test', cpu: [false,null] })

    const playfield = new Playfield(0)
    const snapshot  = new Array(3)
    playfield.create(stage,{countdown: false, push: true, x: 0, y: 0, panels: panels})
    playfield.create_after()
    snapshot[0] = playfield.snap
    playfield.update()
    snapshot[1] = playfield.snap
    playfield.update()
    snapshot[2] = playfield.snap
    playfield.update()
    snapshot[0][1].should.eql(1000)
    snapshot[1][1].should.eql(999)
    snapshot[2][1].should.eql(998)
  })

  describe('#load()' ,function(){
  })
}) //klass
