module.exports = function(game){
  const {
    COLS
  } = require('./../core/data')
  const _f = require('./../core/filters')
  const ss = require('shuffle-seed')
  class controller {
    constructor(rng) {
      this.rng     = rng
      this.create  = this.create.bind(this);
      this.layout  = this.layout.bind(this);
      this.at      = this.at.bind(this);
      this.matched = this.matched.bind(this);
      this.create()
    }
    create() {
      this.panels = []
      const layout = this.layout()
      for (let i = 0; i < layout.length; i++) {
        if (layout[i] == 1) {
          let values = ss.shuffle([0, 1, 2, 3, 4],this.rng());
          this.panels.push(values.find((ii)=> {
            return this.matched(i,ii) === false;
          }))
        }
        else {
          this.panels.push(null)
        }
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
      if (this.panels[i] && (this.panels[i].i !== null)) {
        return this.panels[i].i;
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
      ((right === i) && (right2 === i));
    }


  }
  return controller
}
