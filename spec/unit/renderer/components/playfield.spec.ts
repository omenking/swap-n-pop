import {playfield_helper} from 'helper'
import * as fs         from 'fs'
import * as seedrandom from 'seedrandom'
import Stage           from 'states/mode_vs'
import Playfield       from 'components/playfield'
import Stack           from 'core/stack'
import controls        from 'core/controls'

const N = null

let playfield = null

controls.create()

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
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const stack     = new Stack(stage.rng)
      stack.create(5,1,'average','average')
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
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      stack = new Stack(stage.rng)
      stack.create(5,1,'average','average')
      playfield = new Playfield(0)
    })
    it('should create stack of 144 with push', function(){
      playfield.create(stage,{push: true, x: 0, y: 0, panels: stack.panels})
      playfield.stack_len.should.eql(144)
    })
    it('should create stack of 138 without push', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      playfield.stack_len.should.eql(138)
    })
    it('should create stack full of panels', function(){
      playfield.create(stage,{x: 0, y: 0, panels: stack.panels})
      for(let panel of playfield.stack){
        panel.should.all.be.a('Panel')
      }
    })
  })

  describe('#fill_panels()' ,function(){
    playfield = playfield_helper({cpu: [false,null],panels: [
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
        N,N,N,N,N,N,
        N,N,N,N,N,N,
        1,2,3,4,N,1
    ]})
    expect(playfield.stack_xy(0,22).kind).eql(1)
    expect(playfield.stack_xy(1,22).kind).eql(2)
    expect(playfield.stack_xy(2,22).kind).eql(3)
    expect(playfield.stack_xy(3,22).kind).eql(4)
    expect(playfield.stack_xy(4,22).kind).eql(null)
    expect(playfield.stack_xy(5,22).kind).eql(1)
  })

  describe('#update_stack()' ,function(){
    let stage     = null
    let stack     = null
    let playfield = null
    beforeEach(function(){
      stage = new Stage()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      playfield = new Playfield(0)
      playfield.create(stage,{push: true, x: 0, y: 0, panels: [1,2,3,4,null,1]})
    })
    it('should work', function(){
      playfield.update_stack()
    })
  })

  describe('#chain_and_combo()' ,function(){
    beforeEach(function(){
      playfield = playfield_helper({cpu: [false,null], panels: [
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
        1,N,N,N,N,N,
        1,N,N,N,N,N,
        1,N,N,N,N,N
      ]})
    })
    it('should find one chain_and_combo', function(){
      playfield.chain_and_combo().should.eql([3,1])
    })
  })

  //describe('#danger()' ,function(){
    //it('should be in danger when garbage on top most visible panel'){
      //const playfield = playfield_helper({cpu: [false,null]})
    //}
  //})

  describe('#push()' ,function(){
    it('should shift panels up in stack', function(){
      playfield = playfield_helper({cpu: [false,null],panels:[
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
          1,N,N,N,N,N, //20
          2,N,N,N,N,N, //21
          3,N,N,N,N,N  //22
      ]})
      expect(playfield.stack_xy(0,20).kind).eql(1)
      expect(playfield.stack_xy(0,21).kind).eql(2)
      expect(playfield.stack_xy(0,20).y).eql(20)
      expect(playfield.stack_xy(0,21).y).eql(21)
      playfield.push()
      expect(playfield.stack_xy(0,20).kind).eql(2)
      expect(playfield.stack_xy(0,21).kind).eql(3)
      expect(playfield.stack_xy(0,20).y).eql(20)
      expect(playfield.stack_xy(0,21).y).eql(21)
    })
  })

  describe.skip('#snap()' ,function(){})
  describe.skip('#load()' ,function(){})
}) //klass
