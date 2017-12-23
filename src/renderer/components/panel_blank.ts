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
  public stable            : boolean
  public static_stable       : boolean
  public hidden_during_clear : boolean
  public empty             : boolean
  public garbage           : any
  public chain             : number
  public swappable         : boolean

  constructor(){
    this.kind              = null
    this.x                 = null
    this.y                 = null
    this.state             = STATIC
    this.counter           = 0
    this.animation_state   = null
    this.animation_counter = 0
    this.comboable         = false
    this.empty             = false
    this.swappable          = false
    this.stable            = false
    this.static_stable        = false
    this.hidden_during_clear   = true
    this.garbage           = { 'group': -1, 'state': null, 'kind': null }
    this.chain             = null
  }

  clear(){
  }

  change_state(state: any){
  }
}

const blank = new ComponentPanelBlank()
export default blank
