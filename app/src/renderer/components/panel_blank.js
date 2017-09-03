module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const {STATIC}  = require(APP.path.core('data'))
  return {
    [Symbol.toStringTag]: 'PanelBlank',
    kind                : null,
    x                   : null,
    y                   : null,
    state               : STATIC,
    counter             : 0,
    animation_state     : null,
    animation_counter   : 0,
    is_comboable: function(){ return false },
    is_support  : function(){ return true  },
    is_empty    : function(){ return false }
  }
}
