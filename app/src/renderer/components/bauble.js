module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    UNIT,
    CLEAR,
    BAUBLE_FLOAT
  } = require(APP.path.core('data'))
  class Bauble {
    get [Symbol.toStringTag](){ return 'Bauble' }

    /** */
    constructor() {
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.create_chain   = this.create_chain.bind(this)
      this.create_combo   = this.create_combo.bind(this)
      this.render_chain   = this.render_chain.bind(this)
      this.render_combo   = this.render_combo.bind(this)
    }

    create(panel){
      this.panel = panel
      this.create_chain()
      this.create_combo()
    }

    create_chain(){
      this.chain = game.add.group()
      this.chain.visible = false
      this.chain_left   = game.make.sprite(0   , 0, 'bauble',0) // 3px wide
      this.chain_middle = game.make.sprite(3   , 0, 'bauble',1)
      this.chain_right  = game.make.sprite(3+20, 0, 'bauble',2) // 3px wide

      this.chain_times = game.make.sprite(2, 8, 'bauble_times') // 4px wide

      this.chain_int   = game.make.sprite(7, 3, 'bauble_num',0) // 6px wide

      this.chain_small_int0  = game.make.sprite(7   , 3, 'bauble_num_small',0) // 5px wide
      this.chain_small_int1  = game.make.sprite(7+6 , 3, 'bauble_num_small',0) // 5px wide
      this.chain_small_int2  = game.make.sprite(7+12, 3, 'bauble_num_small',0) // 5px wide

      this.chain.add(this.chain_left)
      this.chain.add(this.chain_middle)
      this.chain.add(this.chain_right)
      this.chain.add(this.chain_int)
      this.chain.add(this.chain_times)
      this.chain.add(this.chain_small_int0)
      this.chain.add(this.chain_small_int1)
      this.chain.add(this.chain_small_int2)
    }

    create_combo(){
      this.combo = game.add.group()
      this.combo.visible = false
      this.combo_left   = game.make.sprite(0   , 0, 'bauble',3) // 3px wide
      this.combo_middle = game.make.sprite(3   , 0, 'bauble',4)
      this.combo_right  = game.make.sprite(3+20, 0, 'bauble',5) // 3px wide

      this.combo_int0   = game.make.sprite(7, 3, 'bauble_num',0) // 6px wide
      this.combo_small_int0  = game.make.sprite(7, 3, 'bauble_num_small',0) // 5px wide

      this.combo.add(this.combo_left)
      this.combo.add(this.combo_middle)
      this.combo.add(this.combo_right)
      this.combo.add(this.combo_int0)
      this.combo.add(this.combo_small_int0)
    }


    update(){
    }

    render(){
      let x = this.panel.playfield.layer_block.x
      let y = this.panel.playfield.layer_block.y
      x    += (this.panel.x * UNIT)
      y    += (this.panel.y * UNIT)
      y    -= BAUBLE_FLOAT[this.panel.time_cur]
      this.render_chain(x,y)
      this.render_combo(x,y)
    }

    render_chain(x,y){
      const chain = this.panel.chain
      if (this.panel.state   === CLEAR &&
          this.panel.clear_i === 0     &&
          chain                > 3     &&
          this.panel.time_cur  > 0
      ){
        this.chain.x = x
        this.chain.y = y

        this.chain.visible      = true
        this.chain_left.y       = 0
        this.chain_middle.y     = 0
        this.chain_right.y      = 0
        this.chain_int.y        = 3
        this.chain_small_int0.y = 3
        this.chain_small_int1.y = 3
        this.chain_small_int2.y = 3
        this.chain_times.y      = 8

        if (chain <= 9) {
          this.chain_int.frame = chain

          this.chain_middle.width = 10
          this.chain_right.x      = this.chain_left.width+this.chain_middle.width

          this.chain_int.visible  = true
          this.chain_small_int0.visible = false
          this.chain_small_int1.visible = false
          this.chain_small_int2.visible = false
        } else {
          let str = chain.toString()
          this.chain_int.visible  = false
          if (str.length === 2) {
            this.chain_small_int0.frame = parseInt(str[0])
            this.chain_small_int1.frame = parseInt(str[1])

            const i0 = parseInt(str[0]) === 1 ? 3 : 5
            const i1 = parseInt(str[1]) === 1 ? 3 : 5

            this.chain_small_int0.x = 2 + i0
            this.chain_small_int1.x = 2 + i0 + i1 + 1

            this.chain_middle.width = 2+i0+1+i1+1 // times, int, space, int, pad
            this.chain_right.x      = this.chain_left.width+this.chain_middle.width

            this.chain_small_int0.visible = true
            this.chain_small_int1.visible = true
            this.chain_small_int2.visible = false
          } else if (str.length > 2) {
            this.chain_small_int0.frame = parseInt(str[0])
            this.chain_small_int1.frame = parseInt(str[1])
            this.chain_small_int2.frame = parseInt(str[2])

            const i0 = parseInt(str[0]) === 1 ? 3 : 5
            const i1 = parseInt(str[1]) === 1 ? 3 : 5
            const i2 = parseInt(str[2]) === 1 ? 3 : 5

            this.chain_small_int0.x = 2 + i0
            this.chain_small_int1.x = 2 + i0 + i1 + 1
            this.chain_small_int2.x = 2 + i0 + i1 + 1 + i2 + 1

            this.chain_middle.width = 2+i0+1+i1+1+i2+1 // times, int, space, int, space, int, pad
            this.chain_right.x      = this.chain_left.width+this.chain_middle.width

            this.chain_small_int0.visible = true
            this.chain_small_int1.visible = true
            this.chain_small_int2.visible = true
          }
        }
      } else {
        this.chain.visible = false
      }
    }
    render_combo(x,y){
      const combo = this.panel.clear_len
      const chain = this.panel.chain
      if (this.panel.state   === CLEAR &&
          this.panel.clear_i === 0     &&
          combo                > 3     &&
          this.panel.time_cur  > 0
      ){
        this.combo.x = x
        this.combo.y = y

        const offset = 0
        if (chain > 0){ offset = 16 }
        this.combo.visible      = true
        this.combo_left.y       = offset
        this.combo_middle.y     = offset
        this.combo_right.y      = offset
        this.combo_int0.y       = offset + 3
        this.combo_small_int0.y = offset + 3


        if (combo <= 9) {
          this.combo_int0.frame = combo

          this.combo_middle.width = 10
          this.combo_right.x      = this.combo_left.width+this.combo_middle.width

          this.combo_int0.visible       = true
          this.combo_small_int0.visible = false
        } else {
          let str = combo.toString()
          this.combo_small_int0.frame = parseInt(str[0])
          this.combo_int0.frame       = parseInt(str[1])

          const i0 = parseInt(str[0]) === 1 ? 3 : 5
          const i1 = parseInt(str[1]) === 1 ? 3 : 6

          this.combo_small_int0.x = 2
          this.combo_int0.x = 2 + i0 + 1

          this.combo_middle.width = 10
          this.combo_right.x      = this.combo_left.width+this.combo_middle.width

          this.combo_int0.visible       = true
          this.combo_small_int0.visible = true
        }
      } else {
        this.combo.visible = false
      }
    }

    shutdown(){}
  } // klass
  return Bauble
}
