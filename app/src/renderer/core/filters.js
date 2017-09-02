const APP = require('swap-n-pop_app')
const {COLS} = require(APP.path.core('data'))
module.exports = {
  i2xy: function(i){
    const y = Math.floor(i / COLS);
    const x = i % COLS;
    return [x,y];
  },
  xy2i: function(x,y){
    return (y*COLS) + x;
  }
}
