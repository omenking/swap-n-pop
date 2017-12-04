import * as seedrandom from 'seedrandom'
import _f             from 'core/filters'
import Stack          from 'core/stack'
import data           from 'core/data'

const {
  COLS, ROWS, PANELS
} = data

// sRJouZq3sh0yHl2w <-- This seed need to get to ensure its random

describe('Stack', function() {
  const rng = seedrandom('S3cH3oWwXssauryt')
  describe('S3cH3oWwXssauryt seed' ,function(){
    it('should match', function(){
      const stack  = new Stack(rng)
      stack.panels = new Array(PANELS).fill(null)
      const layout = stack.layout()
      const offset = (ROWS - (layout.length / COLS)) * COLS
      for (let i = 0; i < layout.length-5; i++) {
        stack.step(layout,i)
      }
      stack.step(layout,37) //1
      stack.step(layout,38) //0
      stack.step(layout,39) //0
      stack.step(layout,40) //0
      //console.log('matches',stack.matched(63,0))
      //stack.step(layout,41)
      //stack.step(layout,42)

      _f.stack_log(stack.panels)
      stack.panels[_f.xy2i(0,10)].should.eql(1)
    })
  })
  describe('#mached', function(){
    it('should match vertical', function(){
      const stack  = new Stack(rng)
      stack.panels =
      [null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,null,null,null,null,null,
       null,   1,   1,   1,null,null]
      stack.matched(63,1).should.be.true
    })
  })
})
