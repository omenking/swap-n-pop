import game from 'core/game'
import {
  FRAME_CLEAR_PARTICLE,
  ANIM_CLEAR_PARTICLE_MOVE,
  TIME_CLEAR_PARTICLE,
  UNIT
} from 'common/data'

export default class ComponentPanelClear {
  private sprite  : Phaser.Sprite
  private x       : number
  private y       : number
  private corner  : number
  public  counter : number
  public  anchor  : any
  private pi : number

  constructor(corner : number){
    this.corner = corner
  }

  create(anchor,pi){
    this.anchor = anchor
    this.pi = pi
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
    this.x        = data[0]
    this.y        = data[1]
    this.corner   = data[2]
    this.counter  = data[3]
  }

  update(){
    if (this.counter > 0)
      this.counter--
  }

  get frame(){
    return (this.pi * 8) + FRAME_CLEAR_PARTICLE[this.index]
  }

  render(){
    let offset = 6
    let x = this.anchor.absolute_center_x
    let y = this.anchor.absolute_center_y
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
