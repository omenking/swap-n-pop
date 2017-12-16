import PanelGarbage       from 'components/panel_garbage'
import {playfield_helper} from 'helper'

import {
  STATIC,
  GARBAGE,
  CLEAR,
  COMBO
} from 'core/data';

describe('PanelGarbage', function() {
  describe('#class_name' ,function(){
    it('should be type of PanelGarbage', function(){
      const panel = new PanelGarbage()
      panel.should.be.a('PanelGarbage')
    })
  })
  describe('#static_execute' ,function(){
  })
  describe('#fall_execute' ,function(){
  })
  describe('#clear_execute' ,function(){
  })

  describe('#fall_check' ,function(){
  })

  describe('#popping' ,function(){
    it('should set state, counter and kind', function(){
      let pl = playfield_helper()
      pl.clearing_garbage.push(1)
      pl.stack_xy(0,22).load([0,22,null,GARBAGE ,0,0,[STATIC,1,COMBO]])
      pl.stack_xy(0,22).garbage.popping()

      expect(pl.stack_xy(0,22).garbage.state).to.eql(CLEAR)
      expect(pl.stack_xy(0,22).counter).to.eql(42)
      expect(pl.stack_xy(0,22).kind).to.be.a('number')
    }
  })

  describe('#clear_index' ,function(){
    it('should validate index and length for 1 group of panels',function(){
      let pl = playfield_helper()
      pl.clearing_garbage.push(1)
      pl.stack_xy(0,22).load([0,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      pl.stack_xy(1,22).load([1,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      pl.stack_xy(2,22).load([2,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      pl.stack_xy(3,22).load([3,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      expect(pl.stack_xy(0,22).garbage.clear_index).to.eql([0,4])
      expect(pl.stack_xy(1,22).garbage.clear_index).to.eql([1,4])
      expect(pl.stack_xy(2,22).garbage.clear_index).to.eql([2,4])
      expect(pl.stack_xy(3,22).garbage.clear_index).to.eql([3,4])
    })

    it('should validate index and length for 2 group of panels',function(){
      let pl = playfield_helper()
      pl.clearing_garbage.push(1)
      pl.clearing_garbage.push(2)
      pl.stack_xy(0,22).load([0,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      pl.stack_xy(1,22).load([1,22,null,GARBAGE ,0,0,[CLEAR,2,COMBO]])
      pl.stack_xy(2,22).load([2,22,null,GARBAGE ,0,0,[CLEAR,1,COMBO]])
      pl.stack_xy(3,22).load([3,22,null,GARBAGE ,0,0,[CLEAR,2,COMBO]])
      expect(pl.stack_xy(0,22).garbage.clear_index).to.eql([0,4])
      expect(pl.stack_xy(1,22).garbage.clear_index).to.eql([1,4])
      expect(pl.stack_xy(2,22).garbage.clear_index).to.eql([2,4])
      expect(pl.stack_xy(3,22).garbage.clear_index).to.eql([3,4])
    })
  })

}) //klass
