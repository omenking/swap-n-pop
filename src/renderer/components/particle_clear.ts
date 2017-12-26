import game from 'core/game'
import ComponentPanel from 'components/panel'
import {
  FRAME_CLEAR_PARTICLE,
  ANIM_CLEAR_PARTICLE_MOVE,
  TIME_CLEAR_PARTICLE,
  UNIT
} from 'core/data'

export default class ComponentPanelClear {
  private panel   : ComponentPanel
  private sprite  : Phaser.Sprite
  private x       : number
  private y       : number
  private corner  : number
  public  counter : number

  constructor(corner : number){
    this.corner = corner
  }

  create(panel){
    this.panel  = panel
    this.sprite = game.add.sprite(0, 0, 'particle_clear', 0)
    this.sprite.visible = false
    this.sprite.anchor.setTo(0.5)
    if (this.corner === 0){  // top left
    } else if (this.corner === 1){ 
      this.sprite.scale.x *= -1 // flip left to right
    } else if (this.corner === 2){  // bottom left
      this.sprite.scale.y *= -1 // flip top to bottom
    } else if (this.corner === 3){  // bottom right
      this.sprite.scale.y *= -1 // flip top to bottom
      this.sprite.scale.x *= -1 // flip left to right
    }
    this.x = 0
    this.y = 0
    this.counter = 0
  }

  get snap(){
    return [
      this.x,
      this.y,
      this.corner,
      this.counter
    ]
  }

  get index(){
    return TIME_CLEAR_PARTICLE-this.counter
  }

  public set_counter(){
    this.counter = TIME_CLEAR_PARTICLE
  }

  load(data){
    this.x       = data[0]
    this.y       = data[1]
    this.corner  = data[2]
    this.counter = data[3]
  }

  update(){
    if (this.counter > 0)
      this.counter--
  }

  get frame(){
    const i = this.playfield.pi
    return (i * 8) + FRAME_CLEAR_PARTICLE[this.index]
  }

  get playfield(){
    return this.panel.playfield
  }

  render(){
    let offset = 6
    let x = this.playfield.layer_block.x
    let y = this.playfield.layer_block.y
    x += (this.panel.x * UNIT)
    y += (this.panel.y * UNIT)
    x += (UNIT / 2)
    y += (UNIT / 2)
    if (this.corner === 0){  // top left
      x -= ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
      y -= ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
    } else if (this.corner === 1){
      x += ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
      y -= ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
    } else if (this.corner === 2){  // bottom left
      x -= ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
      y += ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
    } else if (this.corner === 3){  // bottom right
      x += ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
      y += ANIM_CLEAR_PARTICLE_MOVE[this.index] + offset
    }
    this.sprite.visible = this.counter !== 0
    this.sprite.x       = x
    this.sprite.y       = y
    this.sprite.frame   = this.frame
  }
}
