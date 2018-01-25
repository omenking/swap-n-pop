import game                 from 'core/game'
import ComponentPanelGarbage from 'components/panel_garbage'
import {px, xy2i} from 'core/filters'
import { UNIT } from 'common/data'

export default class ComponentGarbageFace {
  private sprite: Phaser.Sprite
  private panel_garbage : ComponentPanelGarbage

  constructor(){
  }

  create(panel_garbage){
    this.panel_garbage = panel_garbage
    this.sprite = game.add.sprite(
      panel_garbage.x,
      panel_garbage.y,
      'garbage_face',
      0
    )
    this.sprite.visible = false
  }

  get visible(){
    return this.panel_garbage.visible
  }


  get playfield(){
    return this.panel_garbage.playfield
  }
  /*
   * determines if its panel_garbage is center of garabge
   */
  get position(){
    let size   = 0
    let index  = null
    let width  = 0
    let height = 0
    for (let p of this.playfield.stack){
      if (this.panel_garbage.group === p.garbage.group){
        if (this.panel_garbage.panel.x === p.x &&
            this.panel_garbage.panel.y === p.y) {
          index = size
        }
        size++
        width = Math.max(width,p.x)+1
      }
    }
    height = size / width
    const x = Math.ceil(width  / 2)-1
    const y = Math.ceil(height / 2)-1
    const i = xy2i(x,y)
    return {
      center: index             === i,
      offset: width / (index+1) === 2
    }
  }

  render(){
    this.sprite.x = this.panel_garbage.x
    this.sprite.y = this.panel_garbage.y + px(3)
    if (this.visible) {
      const pos = this.position
      this.sprite.visible = pos.center
      if (pos.offset) {
        this.sprite.x = this.panel_garbage.x + 16
      }
    } else {
      this.sprite.visible = false
    }
  }
}
