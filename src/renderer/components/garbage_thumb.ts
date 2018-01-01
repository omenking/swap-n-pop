import game from 'core/game'
import ComponentGarbagePreview from 'components/garbage_preview'
import ComponentParticleClear from 'components/particle_clear'
import { 
  CHAIN,
  COMBO
} from 'core/data';

export default class ComponentGarbageThumb {
  private preview  : ComponentGarbagePreview
  private sprite   : Phaser.Sprite
  public size      : number
  public kind      : string
  private pos      : number
  public x         : number
  public y         : number
  public visible   : boolean
  public particles : Array<ComponentParticleClear>

  constructor(pos : number){
    this.pos = pos
    this.particles = [
      new ComponentParticleClear(0),
      new ComponentParticleClear(1),
      new ComponentParticleClear(2),
      new ComponentParticleClear(3)
    ]
  }

  get absolute_center_x(){
    return this.x + this.sprite.width / 2
  }

  get absolute_center_y(){
    return this.y + this.sprite.height / 2
  }

  create(preview){
    this.preview  = preview
    this.sprite   = game.add.sprite(0,0,'garbage_thumb',0)
    this.y = this.preview.y
    this.x = this.preview.x + (this.pos * this.sprite.width)
    this.sprite.visible = false
    this.visible = false
    this.sprite.x = this.x
    this.sprite.y = this.y
    this.particles[0].create(this,this.preview.playfield.pi)
    this.particles[1].create(this,this.preview.playfield.pi)
    this.particles[2].create(this,this.preview.playfield.pi)
    this.particles[3].create(this,this.preview.playfield.pi)
  }

  pop_in(){
    this.particles[0].set_counter()
    this.particles[1].set_counter()
    this.particles[2].set_counter()
    this.particles[3].set_counter()
    this.visible = true
  }

  update(){
    this.particles[0].update()
    this.particles[1].update()
    this.particles[2].update()
    this.particles[3].update()
  }

  get frame(){
    if (this.kind === COMBO){
      if (this.size === 4) {
        return 0
      } else if (this.size === 5) {
        return 1
      } else if (this.size === 6) {
        return 2
      }
    } else if (this.kind === CHAIN) {
      return 3
    }
  }

  render(){
    this.particles[0].render()
    this.particles[1].render()
    this.particles[2].render()
    this.particles[3].render()
    this.sprite.visible = this.visible
    this.sprite.frame   = this.frame
  }
}
