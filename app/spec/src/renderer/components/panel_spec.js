const APP = require('../../../../app')('../../../../')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const game = require(APP.path.spec('helpers','game_spec'))
const {STATIC,HANG,FALL,CLEAR,PANELS}  = require(APP.path.core('data'))
const _f                  = require(APP.path.core('filters'))
const Stage               = require(APP.path.states('mode_vs'))(game)
const Playfield           = require(APP.path.components('playfield'))(game)
const Panel               = require(APP.path.components('panel'))(game)

//shorthands
const T = true
const F = false
const N = null

var _playfield = null
function load(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).deserialize(i) }
}

describe('Panel', function() {
  describe('#class_name' ,function(){
    it('should be type of Panel', function(){
      const panel = new Panel()
      panel.should.be.a('Panel')
    })
  })

  describe('#deserialize()' ,function(){
    it('should be able to deserialize', function(){
      const data = [10,0,1,STATIC,     // x,y,kind,state
                    null,0,0,null,0] // chain,counter,counter_popping.animation_state,animation_counter
      const panel = new Panel()
      panel.deserialize(data)
      panel.x.should.eql(10)
      panel.y.should.eql(0)
      panel.i.should.eql(1)
      panel.state.should.eql(STATIC)
    })
  })

  describe('#update()' ,function(){
    //it('when HANG should change to FALL', function(){
      //const index = _f.xy2i(0,4)
      //const data = [0,4,1,HANG,null,0,0,null,0]
      //const panel = new Panel()
      //panel.playfield = {
        //should_push: true
      //}
      //panel.deserialize(data)
      //panel.update(index)
      //panel.state.should.eql(FALL)
    //})
  })

  describe('#clear()' ,function(){
    it('should work', function(){
    })
  })

  describe('#clear_index' ,function(){
    it('should work', function(){
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

      load([0, 8 ,0,CLEAR,60,F],
           [0, 9 ,1,CLEAR,60,F],
           [0,10 ,1,CLEAR,60,F])
      playfield.stack(0,10).clear_index.should.eql([2,3])
    })
  })

  describe('#check_neighbours()' ,function(){
    it('should detect veritcal match', function(){
      let stage     = null
      let stack     = null
      let playfield = null
      let panels   = [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        1   , null, null, null, null, null,
        1   , null, null, null, null, null,
        1   , null, null, null, null, null
      ]
      stage = new Stage()
      stage.init({seed: 'test'})
      playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
      playfield.clearing = []
      playfield.stack(0,9).check_neighbours(
        playfield.stack(0,9).above,
        playfield.stack(0,9).under, 0, false).should.eql([3,false])
    })
  })

  describe('#chain_and_combo()' ,function(){
    it('should detect vertical and horizontal match', function(){
      let stage     = null
      let stack     = null
      let playfield = null
      let panels   = [
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, null, null,
        null, 1, null, null, null, null,
        1   , 1, 1   , null, null, null,
        null, 1, null, null, null, null
      ]
      stage = new Stage()
      stage.init({seed: 'test'})
      playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
      playfield.clearing = []
      playfield.stack(1,9).chain_and_combo().should.eql([3,false])
    })
  })
}) //klass
