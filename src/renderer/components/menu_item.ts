import game from 'core/game'
import {px} from 'core/filters'

export default class MenuItem {
  private group     : Phaser.Group
  private sprite    : Phaser.Sprite
  private bg_left   : Phaser.Sprite
  private bg_right  : Phaser.Sprite
  private bg_center : Phaser.Sprite
  private font      : Phaser.RetroFont
  private image     : Phaser.Image
  public  action    : any

  constructor(){
  }
  create(name,action,width,group,index){
    this.action = action
    this.font  = game.add.retroFont('font', px(5), px(9), Phaser.RetroFont.TEXT_SET10)
    this.image = game.make.image(32,6, this.font)
    this.font.setText(name,false,2)

    this.group = game.add.group()

    this.bg_center = game.make.sprite(0,0,'menu_item_content')
    this.bg_left   = game.make.sprite(0,0,'menu_item_column')
    this.bg_right  = game.make.sprite(width,0,'menu_item_column')
    this.bg_right.angle = 180
    this.bg_right.y += 28

    this.bg_center.width = width

    this.group.add(this.bg_center)
    this.group.add(this.bg_left)
    this.group.add(this.bg_right)
    this.group.add(this.image)
    this.group.x = 10 + group.x
    this.group.y = 10 + group.y + (28 * index)
  }

  get x(){
    return this.group.x
  }

  get y(){
    return this.group.y
  }
}
