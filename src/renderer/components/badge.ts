import game from 'core/game'
import {px} from 'core/filters'

export default class Badge {
  private font      : Phaser.RetroFont
  private image     : Phaser.Image

  constructor(){
  }
  create(name){
    this.font  = game.add.retroFont('font', px(5), px(9), Phaser.RetroFont.TEXT_SET10)
    this.image = game.add.image(px(4),px(4), this.font)
    this.font.setText(name,false,2)
    this.image.tint = 0x5185db
  }
}
