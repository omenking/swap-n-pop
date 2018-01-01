import ComponentGarbageThumb from 'components/garbage_thumb'
import ComponentPlayfield from 'components/playfield'

export default class ComponentGarbagePreview {
  public playfield : ComponentPlayfield
  public thumbs : Array<ComponentGarbageThumb>
  public x : number
  public y : number

  constructor(){
    this.thumbs = [
      new ComponentGarbageThumb(0),
      new ComponentGarbageThumb(1),
      new ComponentGarbageThumb(2),
      new ComponentGarbageThumb(3)
    ]
  }

  create(playfield : ComponentPlayfield, x: number, y : number){
    this.playfield = playfield
    this.x = x
    this.y = y
    this.thumbs[0].create(this)
    this.thumbs[1].create(this)
    this.thumbs[2].create(this)
    this.thumbs[3].create(this)
  }

  update(){
    this.thumbs[0].update()
    this.thumbs[1].update()
    this.thumbs[2].update()
    this.thumbs[3].update()
  }

  render(){
    this.thumbs[0].render()
    this.thumbs[1].render()
    this.thumbs[2].render()
    this.thumbs[3].render()
  }

  get_index(kind : string, val : number){
    this.thumbs[0].kind = kind
    this.thumbs[0].size = val
    return 0
  }

  fly_pos(pos){
    return {
      x: this.thumbs[0].x,
      y: this.thumbs[0].y
    }
  }
}
