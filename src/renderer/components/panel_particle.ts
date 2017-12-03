import game from 'core/game'
import data from 'core/data'
import ComponentPanel from 'components/panel'

const {
  UNIT,
  TIME_PARTICLE
} = data
const normalType = [
  {x:  1, y:  1},
  {x: -1, y:  1},
  {x:  1, y: -1},
  {x: -1, y: -1}
]

/**
 * A Panel has a particle that gets shown when the Panel gets cleared
 * A Panel_Particle has 4 directions right now, top left - top right - bottom right - bottom left
 * Once the counter has been set to the TIME_PARTICLE a counter runs down and the particle will animate
 */
export default class ComponentPanelParticle {
  private sprite        : Phaser.Sprite
  private x             : number
  private y             : number
  private xdir          : number
  private ydir          : number
  private id            : number
  private type          : string
  private panel         : ComponentPanel
  private angle         : number
  public  counter       : number
  private frame_counter : number
  /**
   * Initializes the sprite defaulted to not visible, inits vars and has arguments
   * @param {object} panel parent which the pos will depend on
   * @param {integer} dir which direction to go - 1 = top left, 2 = top right, 3 = bottom right, ...
   */
  create =({panel, type = "normal", id, angle = 0})=> {
    this.sprite = game.add.sprite(0, 0, "panel_particles", 0);
    this.sprite.visible = false;

    this.x = 0;
    this.y = 0;

    // these shouldnt change over time, they dont get snapped
    this.id = id;
    this.type = type;
    this.panel = panel;

    // which type and angle set 
    this.angle = angle;

    // orientation
    if (this.type === "normal") {
      this.xdir = normalType[this.id].x;
      this.ydir = normalType[this.id].y;
    }

    // handling animation
    this.counter = 0;
    this.frame_counter = 0;
  }

  /** @returns an Array of the vars that can be rerolled to to recreate a state completely */
  get snap() {
    return [
      this.x,
      this.y,
      this.xdir,
      this.ydir,
      this.counter,
      this.frame_counter,
      this.angle
    ]
  }

  /** loads an Array with integer values that each var should get set to */
  load =(data)=> {
    this.x             = data[0]
    this.y             = data[1]
    this.xdir          = data[2]
    this.ydir          = data[3]
    this.counter       = data[4]
    this.frame_counter = data[5]
    this.angle         = data[6]
  }

  /** sets the pos of the particle, also sets the dir based on its dir  */
  update =()=> {
    this.x = this.panel.playfield.layer_block.x + (this.panel.x * UNIT)
    this.y = this.panel.playfield.layer_block.y + (this.panel.y * UNIT)

    if (this.counter > 0) {
      this.counter--;
      const cur = TIME_PARTICLE - this.counter

      switch (this.type) {
        case "normal": 
          this.x += this.xdir * cur
          this.y += this.ydir * cur
          break;
      
        case "rotate": 
          this.x += Math.cos(this.angle) * cur * 2
          this.y += Math.sin(this.angle) * cur * 2
          
          this.angle += 0.1;

          break;
      }
    }
  }

  /**
   * Calculus for sprite animation - the Time each frame has with 8 frames would be 0.125s
   * returns true when 0.125 would have been passed and waits for the next 0.125 so 0.300s to be crossed
   * @param {integer} frames amt of frames to set intervals
   * @param {integer} ct upgoing counter
   * @param {integer} current real num from 0 to 1
   * @returns true when current has crossed over ct+1/frames
   */
  animate_in_intervals =(frames, current)=> {
    return (((this.frame_counter + 1) / frames) <= current)
  }

  /** draws the sprite contents, animates the sprite when visible */
  render =()=> {
    if (this.counter > 0) {
      const cur = (TIME_PARTICLE - this.counter) / TIME_PARTICLE

      if (this.animate_in_intervals(8, cur))
        this.sprite.frame = this.frame_counter++
    }
    else this.frame_counter = 0

    this.sprite.x = this.x
    this.sprite.y = this.y
    this.sprite.visible = (this.counter > 0)
  }
}
