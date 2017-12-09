import game from 'core/game'
import { STATIC } from 'core/data';

class ComponentPanelBlank{
  get [Symbol.toStringTag](){ return 'PanelBlank' }
  public kind              : number
  public x                 : number
  public y                 : number
  public state             : Symbol
  public counter           : number
  public animation_state   : string
  public animation_counter : number
  public comboable         : boolean
  public support           : boolean
  public hidden            : boolean
  public empty             : boolean
  public panel_garbage     : any
  public chain             : number

  constructor(){
    this.kind              = null
    this.x                 = null
    this.y                 = null
    this.state             = STATIC
    this.counter           = 0
    this.animation_state   = null
    this.animation_counter = 0
    this.comboable         = false
    this.support           = true
    this.empty             = false
    this.hidden            = true
    this.panel_garbage     = null
    this.chain             = null
  }

  clear(){
  }
}

const blank = new ComponentPanelBlank()
export default blank
