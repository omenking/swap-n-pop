import game from 'core/game'
import data from 'core/data'

const {STATIC} = data

export default {
  [Symbol.toStringTag]: 'PanelBlank',
  kind                : null,
  x                   : null,
  y                   : null,
  state               : STATIC,
  counter             : 0,
  animation_state     : null,
  animation_counter   : 0,
  comboable           : false,
  support             : true,
  empty               : false
}
