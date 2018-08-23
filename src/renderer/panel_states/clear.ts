import State from "panel_states/state"
import {
  STATIC,
  HANG,
  CLEAR,
  TIME_CLEAR,
  TIME_POP
} from 'common/data';
import blank from 'components/panel_blank'

export default class Clear extends State {
  enter() {
    this.p.chain++
    this.p.playfield.clearing.push(this.p)
    this.p.group = this.p.playfield.stage.tick
  }
  
  execute() { 
    if (this.p.counter > 0) {
      const [xi,xlen] = this.p.clear_index
      this.p.clear_i    = xi
      this.p.clear_len  = xlen

      const time_max = TIME_CLEAR + (TIME_POP[this.p.playfield.level]*(this.p.clear_len - 1) + 1)
        this.p.time_pop = TIME_CLEAR + (TIME_POP[this.p.playfield.level]*this.p.clear_i)
      this.p.time_cur = time_max - this.p.counter

      this.p.set_particle_garbage()
      this.p.set_particles_clear()

    } else {
      // Propogate upwards, setting all stable panels to be chainable
      let panel = this.p.above
      while (panel !== blank && panel.kind !== null && panel.state !== CLEAR) {
          if (panel.static_stable) { 
            panel.chain = this.p.chain; 
            panel.fsm.change_state(HANG)
          }
          panel = panel.above
      }

      this.p.fsm.change_state(STATIC)
    }
  } 
  
  exit() {
    this.p.kind    = null
    this.p.counter = 0
    this.p.chain   = 0
    this.p.group   = null
  }
}

