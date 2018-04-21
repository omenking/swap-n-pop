import game   from 'core/game'
import assets from 'core/assets'
import ComponentPanelGarbage from 'components/panel_garbage'
import {px, xy2i} from 'core/filters'
import { UNIT } from 'common/data'

export default class ComponentGarbageFace {
  private sprite : Phaser.Sprite
  private panel_garbage : ComponentPanelGarbage

  create(panel_garbage){
    this.panel_garbage = panel_garbage
    this.sprite = game.add.sprite(panel_garbage.x,panel_garbage.y,'garbage_face',0)
    this.sprite.visible = false
  }

  get frame(){
    const i      = this.playfield.stage.tick % (60 * 6)
    const frames = assets.spritesheets.garbage_face.animations.blink
    if (i >= frames.length) {
      return 0
    } else {
      return frames[i]
    }
  }

  get playfield() {
    return this.panel_garbage.playfield
  }

  garbage_size() {
    let size = 0

    this.playfield.stack.forEach(p => {
      if (this.panel_garbage.group === p.garbage.group) 
        size++
    })

    return size
  }

  set_x_position() {
    let pos = this.panel_garbage.panel.x
    let len = this.garbage_size()

    //even numbers
    if (len % 2 === 0) {
      // get halfed - 1 == position of face
      let check = len / 2 - 1
      
      if (pos === check) {
        this.sprite.x = this.panel_garbage.sprite.x + px(8)
        return true
      }
      
      return false
    }
    else { // uneven numbers		
      // division through integer! float() needed to get from 3 / 2 to 1.5
      var check = Math.ceil((len / 2) - 1)
      
      // ie 3 / 2 - 1 would be 1, the position of the face is simply 1
      // or if length is small but pos - 1 equals it
      if (pos === check || (pos - 1) === len) {
        this.sprite.x = this.panel_garbage.sprite.x
        return true
      }
      
      return false
    }

  }

  render(){
    if (this.panel_garbage.sprite.frame !== 13 && this.panel_garbage.sprite.visible)
      this.sprite.visible = this.set_x_position()
    else 
      this.sprite.visible = false

    this.sprite.y = this.panel_garbage.y + px(3)
    this.sprite.frame = this.frame
  }
}
