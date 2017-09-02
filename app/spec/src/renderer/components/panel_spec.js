const APP = require('swap-n-pop_app')
const fs   = require('fs')
const chai = require('chai')
chai.should()

const game = require(APP.path.spec('helpers','game_spec'))
const {STATIC,HANG,FALL}  = require(APP.path.core('data'))
const _f                  = require(APP.path.core('filters'))
const Panel               = require(APP.path.components('panel'))(game)


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

  describe('#update_state()' ,function(){
    it('when HANG should change to FALL', function(){
      const index = _f.xy_2_i(0,4)
      const data = [0,4,1,HANG,null,0,0,null,0]
      const panel = new Panel()
      panel.deserialize(data)
      panel.update_state(index)
      panel.state.should.eql(FALL)
    })
  })

  describe('#update_neighbours()' ,function(){
    it('should work', function(){
      const panel = new Panel()
    }
  })

  describe('#chain_and_combo()' ,function(){
  })
}) //klass
