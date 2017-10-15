module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const _f = require(APP.path.core('filters'))
  const {
    COLS,
    UNIT,
    FALL,
    CLEAR,
    STATIC,
    GARBAGE
  } = require(APP.path.core('data'))
  class PanelGarbage {
    get [Symbol.toStringTag](){ return 'PanelGarbage' }

    /** */
    constructor() {
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.fall_check = this.fall_check.bind(this)
    }

    get state()    {return this._state }
    set state(val) {       this._state = val }

    get group()    {return this._group }
    set group(val) {       this._group = val }

    create(panel){
      this.panel  = panel
      this.sprite = game.add.sprite(0,0, 'garbage',0)
      this.sprite.visible = false
    }

    update(){
      switch (this.state) {
        case STATIC:
          if (this.fall_check()) {
            this.state = FALL
          } else if  (
            this.panel.under.state === CLEAR ||
            this.panel.above.state === CLEAR ||
            this.panel.left.state  === CLEAR ||
            this.panel.right.state === CLEAR
          ){
            const i = this.panel.playfield.clearing_garbage.indexOf(this.group)
            if (i === -1){
              this.panel.playfield.clearing_garbage.push(this.group)
            }
          }
          break;
        case FALL:
          if (this.fall_check()) {
            this.panel.under.state               = GARBAGE
            this.panel.under.panel_garbage.group = this.group
            this.panel.under.panel_garbage.state = this.state

            this.group = null
            this.state = null

            this.panel.kind    = null
            this.panel.state   = STATIC
            this.panel.counter = 0
            this.panel.chain   = 0
          } else {
            this.state = STATIC
          }
          break;
      }
    }

    /** 
     * This looks at the current row for panels that belong
     * to this garbage panel group and then check below each one to
     * see if all of them are empty underneath so it should fall.
     *
     * */
    fall_check(){
      let fall = true
      for (let x = 0; x < COLS; x++){
        let panel = this.panel.playfield.stack(x,this.panel.y)
        if (panel.state               === GARBAGE &&
            panel.panel_garbage.group === this.group) {
          if (panel.under.empty === false || panel.under.hang) { fall = false}
        }
      }
      return fall
    }

    /** */
    render(){
      let str = ''
      if (this.panel.left.state  === GARBAGE && this.panel.left.panel_garbage.group  === this.group){ str += '1' } else { str += '0' }
      if (this.panel.right.state === GARBAGE && this.panel.right.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
      if (this.panel.above.state === GARBAGE && this.panel.above.panel_garbage.group === this.group){ str += '1' } else { str += '0' }
      if (this.panel.under.state === GARBAGE && this.panel.under.panel_garbage.group === this.group){ str += '1' } else { str += '0' }

      if      (str === '0000'){ this.sprite.frame = 0}

      else if (str === '0100'){ this.sprite.frame = 1}
      else if (str === '1100'){ this.sprite.frame = 2}
      else if (str === '1000'){ this.sprite.frame = 3}

      else if (str === '0101'){ this.sprite.frame = 4}
      else if (str === '1101'){ this.sprite.frame = 5}
      else if (str === '1001'){ this.sprite.frame = 6}

      else if (str === '0111'){ this.sprite.frame = 7}
      else if (str === '1111'){ this.sprite.frame = 8}
      else if (str === '1011'){ this.sprite.frame = 9}

      else if (str === '0110'){ this.sprite.frame = 10}
      else if (str === '1110'){ this.sprite.frame = 11}
      else if (str === '1010'){ this.sprite.frame = 12}

      let x = this.panel.playfield.layer_block.x
      let y = this.panel.playfield.layer_block.y
      x    += (this.panel.x * UNIT)
      y    += (this.panel.y * UNIT)
      this.sprite.x = x
      this.sprite.y = y

      this.sprite.visible = this.panel.state === GARBAGE
    }
    /** */
    shutdown(){}
  } // klass
  return PanelGarbage
}
