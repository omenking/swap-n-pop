import game from 'core/game'
import ComponentBauble from 'components/bauble'
import {
  UNIT,
  COMBO,
  CHAIN,
  BAUBLE_FLOAT,
  TIME_PARTICLE_GARAGE
} from 'common/data'
import {px} from 'core/filters'

export default class ComponentPanelGarbage {
  private bauble  : ComponentBauble
  private sprite  : Phaser.Sprite
  public  counter : number
  public  dest_i  : number
  public  x       : number
  public  y       : number

  get snap(){
    return [
      this.x,
      this.y,
      this.counter,
      this.dest_i
    ]
  }

  load(snapshot){
    this.x       = snapshot[0]
    this.y       = snapshot[1]
    this.counter = snapshot[2]
    this.dest_i  = snapshot[3]
  }

  /*
   * @param {string} kind - COMBO or CHAIN
   * @value {number} val  - the size of combo or chain
   *
   */
  public set_counter(kind, val){
    this.dest_i  = this.preview.get_index(kind,val)
    this.counter = TIME_PARTICLE_GARAGE
  }

  create(bauble){
    this.bauble = bauble
    this.sprite = game.add.sprite(0, 0, 'particle_garbage', 0)
    this.sprite.visible = false
  }

  get preview(){
    if (this.pi === 0) {
      return this.stage.playfield1.garbage_preview
    } else {
      return this.stage.playfield0.garbage_preview
    }
  }

  get stage(){
    return this.bauble.panel.playfield.stage
  }

  get playfield(){
    return this.bauble.panel.playfield
  }

  get pi(){
    return this.bauble.panel.playfield.pi
  }

  get panel(){
    return this.bauble.panel
  }

  /*
   * Points are objects with x and y properties
   *
   * @param {number} p0 - start point
   * @param {number} p1 - handle of start point
   * @param {number} p2 - handle of end point
   * @param {number} p3 - end point
   * @param {number} t  - progression along curve 0..1
   */
  bezier_point(p0, p1, p2, p3, t) {
    var ret    = {x: null, y: null}
    var coords = ['x', 'y']
    var i, k;

    for (i in coords) {
        k = coords[i];
        ret[k] = Math.pow(1 - t, 3)
               * p0[k] + 3
               * Math.pow(1 - t, 2)
               * t * p1[k] + 3
               * (1 - t)
               * Math.pow(t, 2)
               * p2[k] + Math.pow(t, 3)
               * p3[k];
    }
    return ret
  }



  get offset_x(){
    let x = this.playfield.layer_block.x
    x += (this.panel.x * UNIT)
    return x
  }

  get offset_y(){
    let y = this.playfield.layer_block.y
    y += (this.panel.y * UNIT)
    //if (this.panel.time_cur) {
      //y -= BAUBLE_FLOAT[this.panel.time_cur]
    //}
    return y
  }

  update(){
    if (this.counter === 0) { return }
    this.counter--
    if (this.counter === 0) {
      this.preview.thumbs[this.dest_i].pop_in()
    }

    let p0 = { x: this.offset_x , y: this.offset_y }
    let p1
    if (this.pi === 0)
      p1 = { x: this.offset_x - px(80) , y: this.offset_y - px(20) }
    else
      p1 = { x: this.offset_x + px(80) , y: this.offset_y + px(20) }
    let p2 = this.preview.fly_pos(this.dest_i)
    let t  = 1 - this.counter / TIME_PARTICLE_GARAGE
    let pos = this.bezier_point(p0,p1,p2,p2,t)
    this.x = pos.x
    this.y = pos.y
  }

  render(){
    this.sprite.x       = this.x
    this.sprite.y       = this.y
    this.sprite.visible = this.counter !== 0
  }
}
