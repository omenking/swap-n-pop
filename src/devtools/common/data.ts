export const COMP_STAGE = Symbol('stage')
export const COMP_GARBA = Symbol('garbage')
export const ROWS_INV   = 12
export const ROWS_VIS   = 11
export const ROWS       = ROWS_INV + ROWS_VIS
export const COLS       = 6

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
  public state_component : Symbol
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

  constructor(){
    this.stage           = null
    this.snapshots       = { tick: 0, len: 0}
    this.selected_tick   = null
    this.state_component = COMP_STAGE
    this.garbage_queue   = {pi: 0, combo: 0, chain: 0}
    this.stack_actions_rows = {
        inv: false,
        vis: true
    }
    this.stack_actions_playfields = {
      pl0: true,
      pl1: false
    }
  }

  public static get Instance(){
    // Do you need arguments? Make it a regular method instead.
    return this._instance || (this._instance = new this())
  }

  public clear(){
    this.stage          = null
    this.snapshots.tick = 0
    this.snapshots.len  = 0
    this.snapshot       = null
    this.snapshot_prev  = null
    this.selected_tick  = 0
  }
}

export const state = State.Instance
