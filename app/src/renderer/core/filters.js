const APP = require('swap-n-pop_app')
const {ROWS, COLS} = require(APP.path.core('data'))
module.exports = {
  i_2_xy: function(i,rows,cols){
    if (!rows) { rows = ROWS; }
    if (!cols) { cols = COLS; }
    const y = Math.floor(i / COLS);
    const x = i % COLS;
    return [x,y];
  },
  xy_2_i: function(x,y){
    return (y*COLS) + x;
  },
  shuffle: function(arr){
    return arr.sort(function(){
      return (Math.random() - 0.5)
    })
  }
}
