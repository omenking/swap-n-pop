import * as fs   from 'fs'
import Stage     from 'states/mode_vs'
import Playfield from 'components/playfield'
import Panel     from 'components/panel'
import { STATIC, HANG, FALL, CLEAR, PANELS ROWS} from 'core/data';
import {
  playfield_load,
  playfield_helper
} from 'helper'

function load(...arr){ playfield_load(playfield,...arr)  }

//shorthands
const T = true
const F = false
const N = null

let playfield = null

describe('Panel', function() {
  describe('#class_name' ,function(){
    it('should be type of Panel', function(){
      const panel = new Panel()
      panel.should.be.a('Panel')
    })
  })

  describe('#load()' ,function(){
    it('should be able to load', function(){
      const data = [10,0,1,STATIC,     // x,y,kind,state
                    null,0,0,null,0] // chain,counter,counter_popping.animation_state,animation_counter
      const panel = new Panel()
      panel.load(data)
      expect(panel.x).eql(10)
      expect(panel.y).eql(0)
      expect(panel.kind).eql(1)
      expect(panel.state).eql(STATIC)
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
      //panel.load(data)
      //panel.update(index)
      //panel.state.should.eql(FALL)
    //})
  })

  describe('#clear()' ,function(){
    it.skip('should work', function(){
    })
  })

  describe('#clear_index' ,function(){
    it.skip('should work', function(){
      playfield = playfield_helper({cpu: [false,null]})

      load([0,ROWS+ 8 ,0,CLEAR,60,F],
           [0,ROWS+ 9 ,1,CLEAR,60,F],
           [0,ROWS+10 ,1,CLEAR,60,F])
      expect(playfield.stack_xy(0,ROWS+10)).eql([2,3])
    })
  })

  describe('#chain_and_combo()' ,function(){
    it.skip('should detect vertical and horizontal match', function(){
      playfield = playfield_helper({push: false, cpu: [false,null], panels: [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,

        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, 5, N, N, N, N,
        N, 4, N, N, N, N,
        N, 3, N, N, N, N,
        N, 2, N, N, N, N,
        N, 1, N, N, N, N,
        1, 1, 1, N, N, N,
        N, 1, N, N, N, N
      ]})
      playfield.update_stack()
      playfield.chain_and_combo()
      expect(playfield.stack_xy(0,ROWS-1).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS-1).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS-2).state).eql(CLEAR)
      expect(playfield.stack_xy(2,ROWS-1).state).eql(CLEAR)
    })
  })

  describe('#dead', function(){
    it('should not be dead', function(){
      playfield = playfield_helper({push: false, cpu: [false,null], panels: [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,

        N, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N
      ]})
      playfield.stack_xy(0,ROWS-9).dead.should.eql(false)
    })

    it('should be dead', function(){
      playfield = playfield_helper({push: false, cpu: [false,null], panels: [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,

        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N
      ]})
      playfield.stack_xy(0,ROWS-9).dead.should.eql(true)
    })
  })

}) //klass
