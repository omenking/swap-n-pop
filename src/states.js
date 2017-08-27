module.exports = function(game){
  return {
    Boot : require('./states/boot')(game),
    Menu : require('./states/menu')(game),
    Mode1pVsCpu : require('./states/mode_1p_vs_cpu')(game),
    ModePuzzle : require('./states/mode_puzzle')(game)
  }
}
