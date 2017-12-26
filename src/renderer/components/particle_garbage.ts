import game from 'core/game'
import ComponentBauble from 'components/bauble'
import {
  UNIT,
  BAUBLE_FLOAT
} from 'core/data'
import {px} from 'core/filters'

const TIME_PARTICLE_GARAGE = 40

export default class ComponentPanelGarbage {
  private bauble   : ComponentBauble
  private sprite  : Phaser.Sprite
  private x       : number
  private y       : number
  private xdest   : number
  private ydest   : number
  public  counter : number

  get snap(){
    return [
      this.x,
      this.y,
      this.counter
    ]
  }

  public set_counter(){
    if (this.pi === 0) {
      this.xdest = 500
      this.ydest = 0
    }
    else {
      this.xdest = 40
      this.ydest = 0
    }
    this.counter = TIME_PARTICLE_GARAGE
  }

  create(bauble){
    this.bauble = bauble
    this.sprite = game.add.sprite(0, 0, 'particle_garbage', 0)
    //this.sprite.visible = false
  }
  update(){
    if (this.counter > 0) {
      this.counter--
    }
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



  get render_x(){
    let x = this.playfield.layer_block.x
    x += (this.panel.x * UNIT)
    return x
  }

  get render_y(){
    let y = this.playfield.layer_block.y
    y += (this.panel.y * UNIT)
    //if (this.panel.time_cur) {
      //y -= BAUBLE_FLOAT[this.panel.time_cur]
    //}
    return y
  }

  render(){
    let p0 = { x: this.render_x       , y: this.render_y }
    let p1
    if (this.pi === 0)
      p1 = { x: this.render_x - px(80) , y: this.render_y - px(20) }
    else
      p1 = { x: this.render_x + px(80) , y: this.render_y + px(20) }
    let p2 = { x: this.xdest          , y: this.ydest }
    let t  = 1 - this.counter / TIME_PARTICLE_GARAGE

    let pos = this.bezier_point(p0,p1,p2,p2,t)
    this.sprite.x = pos.x
    this.sprite.y = pos.y
    this.sprite.visible =  this.counter !== 0
  }
}
