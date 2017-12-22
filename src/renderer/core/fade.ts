import game from 'core/game'
export default {
  in: function(){
    const bg     = game.add.bitmapData(game.width, game.height)
    bg.rect(0, 0, game.width, game.height, "rgb(0,0,0)")
    const sprite = game.add.sprite(0, 0, bg)
    sprite.alpha = 1.0
    const tween  = game.add.tween(sprite)
    tween.to({alpha:0.01}, 500).start()
  },
  out: function(callback){
    const bg     = game.add.bitmapData(game.width, game.height)
    bg.rect(0, 0, game.width, game.height, "rgb(0,0,0)")
    const sprite = game.add.sprite(0, 0, bg)
    sprite.alpha = 0.01
    const tween  = game.add.tween(sprite)
    tween.onComplete.add(callback)
    tween.to({alpha:1.0}, 200).start()
  }
}
