module.exports = function(game){
  return {
    Boot       : require('./states/boot')(game),
    Menu       : require('./states/menu')(game),
    ModeVs     : require('./states/mode_vs')(game),
    ModePuzzle : require('./states/mode_puzzle')(game),
    Connect    : require('./states/connect')(game)
  }
}
