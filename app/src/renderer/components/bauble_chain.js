module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {
    UNIT,
    CLEAR,
    BAUBLE_FLOAT
  } = require(APP.path.core('data'))
  class BaubleChain {
    get [Symbol.toStringTag](){ return 'BaubleChain' }

    /** */
    constructor() {
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)

      this.set = this.set.bind(this)
    }

    create(panel){
      this.panel = panel
      this.group = game.add.group()
      this.group.x = 0
      this.group.y = 0
      this.group.visible = false

      this.left   = game.make.sprite(0, 0, 'bauble_chainl') // 3px wide
      this.middle = game.make.sprite(3, 0, 'bauble_chainm')
      this.right  = game.make.sprite(3+20, 0, 'bauble_chainr') // 3px wide

      this.times       = game.make.sprite(2, 8, 'bauble_chain_times') // 4px wide

      this.large_int   = game.make.sprite(7, 3, 'bauble_chain_num',0) // 6px wide

      this.small_int0  = game.make.sprite(7   , 3, 'bauble_chain_num_small',0) // 5px wide
      this.small_int1  = game.make.sprite(7+6 , 3, 'bauble_chain_num_small',0) // 5px wide
      this.small_int2  = game.make.sprite(7+12, 3, 'bauble_chain_num_small',0) // 5px wide

      this.group.add(this.left)
      this.group.add(this.middle)
      this.group.add(this.right)
      this.group.add(this.large_int)
      // need to be in reverse order so 1 doesn't cover previous number.
      this.group.add(this.small_int2)
      this.group.add(this.small_int1)
      this.group.add(this.small_int0)
      this.group.add(this.times)
    }

    get value(){ return this._value }
    set value(v){ this._value = v }

    set(v){
      this.value = v
    }

    update(){
    }

    render(){
      if (this.panel.state   === CLEAR &&
          this.panel.clear_i === 0     &&
          this.panel.clear_len > 3     &&
           this.panel.time_cur > 0
      ){
        this.set(this.panel.clear_len)

        let x = this.panel.playfield.layer_block.x
        let y = this.panel.playfield.layer_block.y

        x += (this.panel.x * UNIT)
        y += (this.panel.y * UNIT)

        y -= BAUBLE_FLOAT[this.panel.time_cur]

        this.group.x = x
        this.group.y = y

        this.group.visible = true
      } else {
        this.group.visible = false
      }


      if (this.value <= 9) {
        this.large_int.visible  = true
        this.small_int0.visible = false
        this.small_int1.visible = false
        this.small_int2.visible = false

        this.large_int.frame = this.value-2

        this.middle.width = 10
        this.right.x      = this.left.width+this.middle.width
      } else {
        let str = this.value.toString()
        this.large_int.visible  = false
        if (str.length === 2) {
          this.small_int0.visible = true
          this.small_int1.visible = true
          this.small_int2.visible = false

          this.small_int0.frame = parseInt(str[0])
          this.small_int1.frame = parseInt(str[1])

          const i0 = parseInt(str[0]) === 1 ? 3 : 5
          const i1 = parseInt(str[1]) === 1 ? 3 : 5

          this.small_int0.x = 2 + i0
          this.small_int1.x = 2 + i0 + i1 + 1

          this.middle.width = 2+i0+1+i1+1 // times, int, space, int, pad
          this.right.x      = this.left.width+this.middle.width
        } else if (str.length > 2) {
          this.small_int0.visible = true
          this.small_int1.visible = true
          this.small_int2.visible = true

          this.small_int0.frame = parseInt(str[0])
          this.small_int1.frame = parseInt(str[1])
          this.small_int2.frame = parseInt(str[2])

          const i0 = parseInt(str[0]) === 1 ? 3 : 5
          const i1 = parseInt(str[1]) === 1 ? 3 : 5
          const i2 = parseInt(str[2]) === 1 ? 3 : 5

          this.small_int0.x = 2 + i0
          this.small_int1.x = 2 + i0 + i1 + 1
          this.small_int2.x = 2 + i0 + i1 + 1 + i2 + 1

          this.middle.width = 2+i0+1+i1+1+i2+1 // times, int, space, int, space, int, pad
          this.right.x      = this.left.width+this.middle.width
        }
      }
    }
    shutdown(){}
  } // klass
  return BaubleChain
}
