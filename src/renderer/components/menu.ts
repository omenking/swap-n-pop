import game                from 'core/game'
import ComponentMenuItem   from 'components/menu_item'
import ComponentMenuCursor from 'components/menu_cursor'
import {px}                from 'core/filters'

/** Class representing a menu. */
export default class ComponentMenu {
  private group      : Phaser.Group
  private corner_tl  : Phaser.Sprite // top left
  private corner_tr  : Phaser.Sprite // top right
  private corner_bl  : Phaser.Sprite // bottom left
  private corner_br  : Phaser.Sprite // bottom right
  private pipe_top   : Phaser.Sprite
  private pipe_bottom: Phaser.Sprite
  private pipe_left  : Phaser.Sprite
  private pipe_right : Phaser.Sprite
  private bg         : Phaser.Sprite
  private cursor     : ComponentMenuCursor
  private menu_items : Array<ComponentMenuItem>

  constructor(actions_len: number) {
    this.menu_items = []
    for(let i = 0; i < actions_len; i++){
      this.menu_items.push(new ComponentMenuItem())
    }
    this.cursor = new ComponentMenuCursor()
  }

  create(x : number,y : number ,width : number, actions : Array<{name : string, action: any}>) {

    this.group = game.add.group()
    this.group.x = x
    this.group.y = y
    this.corner_tl   = game.make.sprite(0, 0, 'menu_frame_corner')
    this.corner_tr   = game.make.sprite(0, 0, 'menu_frame_corner')
    this.corner_bl   = game.make.sprite(0, 0, 'menu_frame_corner')
    this.corner_br   = game.make.sprite(0, 0, 'menu_frame_corner')
    this.pipe_top    = game.make.sprite(0, 0, 'menu_frame_content')
    this.pipe_bottom = game.make.sprite(0, 0, 'menu_frame_content')
    this.pipe_left   = game.make.sprite(0, 0, 'menu_frame_content')
    this.pipe_right  = game.make.sprite(0, 0, 'menu_frame_content')
    this.bg          = game.make.sprite(0, 0, 'menu_bg')


    this.group.add(this.bg)
    this.group.add(this.corner_tl)
    this.group.add(this.corner_tr)
    this.group.add(this.corner_bl)
    this.group.add(this.corner_br)
    this.group.add(this.pipe_top)
    this.group.add(this.pipe_bottom)
    this.group.add(this.pipe_left)
    this.group.add(this.pipe_right)

    this.corner_tl.anchor.setTo(0.5)
    this.corner_tr.anchor.setTo(0.5)  ; this.corner_tr.angle   = 90
    this.corner_br.anchor.setTo(0.5)  ; this.corner_br.angle   = 180
    this.corner_bl.anchor.setTo(0.5)  ; this.corner_bl.angle   = 270
    this.pipe_top.anchor.setTo(0.5)   
    this.pipe_bottom.anchor.setTo(0.5)
    this.pipe_left.anchor.setTo(0.5)  ; this.pipe_left.angle  = 90
    this.pipe_right.anchor.setTo(0.5) ; this.pipe_right.angle = 90

    const s = this.corner_tl.width

    this.bg.width          = width
    this.pipe_top.width    = width
    this.pipe_bottom.width = width
    const height =  actions.length * 28
    this.bg.height         = height
    this.pipe_left.width  = height
    this.pipe_right.width = height

    this.bg.x += s
    this.bg.y += s

    this.pipe_top.x    += s + (width/2)
    this.pipe_bottom.x += s + (width/2)
    this.pipe_top.y    += s/2
    this.pipe_bottom.y += s + (s/2) + height

    this.pipe_left.x   += s/2
    this.pipe_right.x  += s + (s/2) + width
    this.pipe_left.y   += s + (height/2)
    this.pipe_right.y  += s + (height/2)

    this.corner_tl.x += (s/2)             ; this.corner_tl.y += (s/2)
    this.corner_tr.x += (s/2) + s + width ; this.corner_tr.y += (s/2)
    this.corner_bl.x += (s/2)             ; this.corner_bl.y += (s/2) + s + height
    this.corner_br.x += (s/2) + s + width ; this.corner_br.y += (s/2) + s + height

    for(let i = 0; i < this.menu_items.length; i++){
      this.menu_items[i].create(
        actions[i].name,
        actions[i].action,
        width,
        this.group,
        i
      )
    }

    this.cursor.create(this, this.menu_items)
  }

  get x(){
    return this.group.x
  }

  get y(){
    return this.group.y
  }

  update() {
    this.cursor.update()
  }

}
