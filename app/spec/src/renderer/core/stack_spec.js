const APP        = require('swap-n-pop_app')
const chai       = require('chai')
const sinon      = require('sinon')
const seedrandom = require('seedrandom')
const _f         = require(APP.path.core('filters'))
const Stack      = require(APP.path.core('stack'))(null)
const {
  COLS, ROWS, PANELS
} = require(APP.path.core('data'))

chai.should()

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
