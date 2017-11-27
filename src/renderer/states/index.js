module.exports = function(game){
  return {
    Boot       : require('./boot')(game),
    Load       : require('./load')(game),
    Menu       : require('./menu')(game),
    ModeVs     : require('./mode_vs')(game),
    ModePuzzle : require('./mode_puzzle')(game),
    PuzzleMenu : require('./puzzle_menu')(game),
    Connect    : require('./connect')(game)
  }
}
