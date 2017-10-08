module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    UNIT,
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
    }

    get group()    {return this._group }
    set group(val) {       this._group = val }

    create(panel){
      this.panel  = panel
      this.sprite = game.add.sprite(0,0, 'garbage',0)
      this.sprite.visible = false
    }

    update(){
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
