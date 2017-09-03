module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const {
    COLS, ROWS, PANELS
  } = require(APP.path.core('data'))
  const _f = require(APP.path.core('filters'))
  const ss = require('shuffle-seed')
  class controller {
    constructor(rng) {
      this.rng     = rng
      this.steps   = this.steps.bind(this)
      this.step    = this.step.bind(this)
      this.create  = this.create.bind(this)
      this.layout  = this.layout.bind(this)
      this.at      = this.at.bind(this)
      this.matched = this.matched.bind(this)
    }
    create() {
      this.panels = new Array(PANELS).fill(null)
      this.steps(this.layout())
    }
    steps(layout){
      for (let i = 0; i < layout.length; i++) {
        this.step(layout,i)
      }
    }
    step(layout,i){
      const offset = (ROWS - (layout.length / COLS)) * COLS
      if (layout[i] === 1) {
        let kinds = ss.shuffle([0, 1, 2, 3, 4],this.rng())
        let kind  = kinds.find((k)=> {
          return this.matched(offset+i,k) === false
        })
        this.panels[offset+i] = kind
      }
    }
    layout(){
      return ss.shuffle(
        [[0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1],
         [1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1],
         [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1],
         [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
         [0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ], this.rng())[0]
    }
    at(i){
      if (this.panels[i] && (this.panels[i].kind !== null)) {
        return this.panels[i]
      } else {
        return null;
      }
    }
    matched(pos,i){
      const left  = this.at(pos-1);
      const right = this.at(pos+1);
      const under = this.at(pos+(1*COLS));
      const above = this.at(pos-(1*COLS));

      const left2  = this.at(pos-2);
      const right2 = this.at(pos+2);
      const under2 = this.at(pos+(2*COLS));
      const above2 = this.at(pos-(2*COLS));
      return ((left  === i) && (right  === i)) ||
             ((above === i) && (under  === i)) ||
             ((above === i) && (above2 === i)) ||
             ((under === i) && (under2 === i)) ||
             ((left  === i) && (left2  === i)) ||
             ((right === i) && (right2 === i))
    }


  }
  return controller
}
