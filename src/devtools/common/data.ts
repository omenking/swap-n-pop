import {STATIC} from 'core/data'

export const COMP_STAGE = 'stage'
export const COMP_GARBA = 'garbage'

class State {
  private static _instance: State;
  public stage : String
  public snapshots: {
    tick : number
    len  : number
  }
  public snapshot        : any
  public snapshot_prev   : any
  public selected_tick   : number
  public selected_panel  : Array<number>
  public state_component : string
  public garbage_queue : {
    pi: number,
    combo: number,
    chain: number
  }
  public stack_actions_rows : {
    inv: boolean,
    vis: boolean
  }
  public stack_actions_playfields : {
    pl0: boolean,
    pl1: boolean
  }
  seed: string

  public panel_form : {
    kind: string,
    state: string,
    counter: number,
    chain: number
  }

  public levels : Array<number>

  constructor(){
    this.stage           = null
    this.snapshots       = { tick: 0, len: 0}
    this.selected_tick   = null
    this.state_component = COMP_STAGE
    this.garbage_queue   = {pi: 0, combo: 0, chain: 0}
    this.levels = [1,1]
    this.selected_panel  = [null,null]
    this.stack_actions_rows = {
        inv: false,
        vis: true
    }
    this.stack_actions_playfields = {
      pl0: true,
      pl1: false
    }
    this.seed = ''
    this.reset_panel_form(null)

  }

  public static get Instance(){
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this())
  }

  public reset_panel_form(data){
    if (data) {
      this.panel_form = {
        kind    : data[2],
        state   : data[3],
        counter : data[4],
        chain   : data[5]
      }
    } else {
      this.panel_form = {
        state: STATIC,
        kind: null,
        counter: 0,
        chain: 0
      }
    }
  }

  public clear(){
    this.stage          = null
    this.snapshots.tick = 0
    this.snapshots.len  = 0
    this.snapshot       = null
    this.snapshot_prev  = null
    this.selected_tick  = 0
    this.selected_panel  = [null,null]
    this.reset_panel_form(null)
    this.levels = [1,1]
  }
}

export const state = State.Instance
