module.exports = function(game){
  const {ipcRenderer: ipc} = require('electron')
  const Store = require('electron-store')
  const store = new Store()
  class controller {
    constructor() {
      this.create = this.create.bind(this)
      this.update = this.update.bind(this)

      this.update_pl   = this.update_pl.bind(this)
      this.load        = this.load.bind(this)
      this.map         = this.map.bind(this)
      this.map_key     = this.map_key.bind(this)
      this.serialize   = this.serialize.bind(this)
      this.execute     = this.execute.bind(this)
      this.execute_key = this.execute_key.bind(this)
      this.is_down     = this.is_down.bind(this)
      this.check_down  = this.check_down.bind(this)
      this.rebind      = this.rebind.bind(this)
      this.trigger     = this.trigger.bind(this)
      this.add_input   = this.add_input.bind(this)
      this.disable     = this.disable.bind(this)
      this.toggle_menu = this.toggle_menu.bind(this)
    }
    create() {
      this.callbacks = {
        pl0_up    : function(){},
        pl0_down  : function(){},
        pl0_left  : function(){},
        pl0_right : function(){},
        pl0_a     : function(){},
        pl0_b     : function(){},
        pl0_l     : function(){},
        pl0_r     : function(){},
        pl0_start : function(){},
        pl1_up    : function(){},
        pl1_down  : function(){},
        pl1_left  : function(){},
        pl1_right : function(){},
        pl1_a     : function(){},
        pl1_b     : function(){},
        pl1_l     : function(){},
        pl1_r     : function(){},
        pl1_start : function(){}
      }

      game.input.gamepad.start()
      this.pad = game.input.gamepad.pad1

      this._simdown = {
        pl0_up    : false,
        pl0_down  : false,
        pl0_left  : false,
        pl0_right : false,
        pl0_a     : false,
        pl0_b     : false,
        pl0_l     : false,
        pl0_r     : false,
        pl0_start : false,
        pl1_up    : false,
        pl1_down  : false,
        pl1_left  : false,
        pl1_right : false,
        pl1_a     : false,
        pl1_b     : false,
        pl1_l     : false,
        pl1_r     : false,
        pl1_start : false
      } //simulated down
      this._down = {}
      this.keys  = []
      this.rebind()

      ipc.on('controls-rebind', (event) => {
        this.rebind()
        this.map(0,{
          up:    this.callbacks.pl0_up,
          down:  this.callbacks.pl0_down,
          left:  this.callbacks.pl0_left,
          right: this.callbacks.pl0_right,
          a:     this.callbacks.pl0_a,
          b:     this.callbacks.pl0_b,
          l:     this.callbacks.pl0_l,
          r:     this.callbacks.pl0_r,
          start: this.callbacks.pl0_start
        })
        this.map(1,{
          up:    this.callbacks.pl1_up,
          down:  this.callbacks.pl1_down,
          left:  this.callbacks.pl1_left,
          right: this.callbacks.pl1_right,
          a:     this.callbacks.pl1_a,
          b:     this.callbacks.pl1_b,
          l:     this.callbacks.pl1_l,
          r:     this.callbacks.pl1_r,
          start: this.callbacks.pl1_start
        })
      })
    }
    rebind(){
      let inputs = store.get('inputs')
      game.input.keyboard.reset()
      this.keys = {}
      this.keys.pl0_up    = this.add_input(inputs[0])
      //player 1
      this.keys.pl0_down  = this.add_input(inputs[1])
      this.keys.pl0_left  = this.add_input(inputs[2])
      this.keys.pl0_right = this.add_input(inputs[3])
      this.keys.pl0_a     = this.add_input(inputs[4])
      this.keys.pl0_b     = this.add_input(inputs[5])
      this.keys.pl0_l     = this.add_input(inputs[6])
      this.keys.pl0_r     = this.add_input(inputs[7])
      this.keys.pl0_start = this.add_input(inputs[8])
      //player 2
      this.keys.pl1_up    = this.add_input(inputs[9])
      this.keys.pl1_down  = this.add_input(inputs[10])
      this.keys.pl1_left  = this.add_input(inputs[11])
      this.keys.pl1_right = this.add_input(inputs[12])
      this.keys.pl1_a     = this.add_input(inputs[13])
      this.keys.pl1_b     = this.add_input(inputs[14])
      this.keys.pl1_l     = this.add_input(inputs[15])
      this.keys.pl1_r     = this.add_input(inputs[16])
      this.keys.pl1_start = this.add_input(inputs[17])
      //global binding

      // AB - This should work but refuses to do so.
      const key = game.input.keyboard.addKey(Phaser.Keyboard.ESC)
      key.onDown.add(this.toggle_menu,this)
    }
    toggle_menu(){
      console.log('toggle menu')
    }
    add_input(i){
      if(typeof(i) === 'string'){
        if (i.charAt(1) === 'P') { // check for button
          return [
            parseInt(i.charAt(0)),
            parseInt(i.substr(4,i.length-1))
          ]
        } else if (i.charAt(1) === 'A') { // check for axis
          return [
            parseInt(i.charAt(0)),
            parseInt(i.charAt(4)),
            i.substr(5)
          ]
        }
      } else {
        return game.input.keyboard.addKey(i)
      }
    }
    is_down(pi,key){
      const name = `pl${pi}_${key}`
      return this._down[name] > 0
    }
    disable(){
      this.map(0,{})
      this.map(1,{})
    }
    map(pi,opts){
      const keys = "up down left right a b l r start".split(' ');
      for (let key of keys) {
        this.map_key(pi,key,opts)
      }
    }
    map_key(pi,key,opts){
      const fun = opts[key] ? opts[key] : function() {};
      this.callbacks[`pl${pi}_${key}`] = fun
    }
    serialize(pi){
      var byte = 0x00
      if(this.check_down(false,`pl${pi}_up`   )){byte = byte | 0x01} //0000 0001
      if(this.check_down(false,`pl${pi}_down` )){byte = byte | 0x02} //0000 0010
      if(this.check_down(false,`pl${pi}_left` )){byte = byte | 0x04} //0000 0100
      if(this.check_down(false,`pl${pi}_right`)){byte = byte | 0x08} //0000 1000
      if(this.check_down(false,`pl${pi}_a`    )){byte = byte | 0x10} //0001 0000
      if(this.check_down(false,`pl${pi}_b`    )){byte = byte | 0x20} //0010 0000
      if(this.check_down(false,`pl${pi}_r`    )||
         this.check_down(false,`pl${pi}_l`    )){byte = byte | 0x40} //0100 0000
      if(this.check_down(false,`pl${pi}_start`)){byte = byte | 0x80} //1000 0000
      return byte
    }
    execute(pi,byte){
      this.execute_key(byte,pi,0x01,'up')
      this.execute_key(byte,pi,0x02,'down')
      this.execute_key(byte,pi,0x04,'left')
      this.execute_key(byte,pi,0x08,'right')
      this.execute_key(byte,pi,0x10,'a')
      this.execute_key(byte,pi,0x20,'b')
      this.execute_key(byte,pi,0x40,'r')
      this.execute_key(byte,pi,0x80,'start')
    }
    execute_key(byte,pi,at,key){
      const name = `pl${pi}_${key}`
      if ((byte & at) === at) {
        this._simdown[name] = true
      } else {
        this._simdown[name] = false
      }
    }
    trigger(name){
      this.callbacks[name](this._down[name]++)
    }
    load(snapshot){
      this._down.pl0_up    = snapshot[0][0]
      this._down.pl0_down  = snapshot[0][1]
      this._down.pl0_left  = snapshot[0][2]
      this._down.pl0_right = snapshot[0][3]
      this._down.pl0_a     = snapshot[0][4]
      this._down.pl0_b     = snapshot[0][5]
      this._down.pl0_l     = snapshot[0][6]
      this._down.pl0_r     = snapshot[0][7]
      this._down.pl0_start = snapshot[0][8]
      this._down.pl1_up    = snapshot[0][9]
      this._down.pl1_down  = snapshot[0][10]
      this._down.pl1_left  = snapshot[0][11]
      this._down.pl1_right = snapshot[0][12]
      this._down.pl1_a     = snapshot[0][13]
      this._down.pl1_b     = snapshot[0][14]
      this._down.pl1_l     = snapshot[0][15]
      this._down.pl1_r     = snapshot[0][16]
      this._down.pl1_start = snapshot[0][17]

      this._simdown.pl0_up    = snapshot[1][0]
      this._simdown.pl0_down  = snapshot[1][1]
      this._simdown.pl0_left  = snapshot[1][2]
      this._simdown.pl0_right = snapshot[1][3]
      this._simdown.pl0_a     = snapshot[1][4]
      this._simdown.pl0_b     = snapshot[1][5]
      this._simdown.pl0_l     = snapshot[1][6]
      this._simdown.pl0_r     = snapshot[1][7]
      this._simdown.pl0_start = snapshot[1][8]
      this._simdown.pl1_up    = snapshot[1][9]
      this._simdown.pl1_down  = snapshot[1][10]
      this._simdown.pl1_left  = snapshot[1][11]
      this._simdown.pl1_right = snapshot[1][12]
      this._simdown.pl1_a     = snapshot[1][13]
      this._simdown.pl1_b     = snapshot[1][14]
      this._simdown.pl1_l     = snapshot[1][15]
      this._simdown.pl1_r     = snapshot[1][16]
      this._simdown.pl1_start = snapshot[1][17]
    }
    get snap(){
      return [[
         this._down.pl0_up
        ,this._down.pl0_down
        ,this._down.pl0_left
        ,this._down.pl0_right
        ,this._down.pl0_a
        ,this._down.pl0_b
        ,this._down.pl0_l
        ,this._down.pl0_r
        ,this._down.pl0_start
        ,this._down.pl1_up
        ,this._down.pl1_down
        ,this._down.pl1_left
        ,this._down.pl1_right
        ,this._down.pl1_a
        ,this._down.pl1_b
        ,this._down.pl1_l
        ,this._down.pl1_r
        ,this._down.pl1_start
      ],[
         this._simdown.pl0_up
        ,this._simdown.pl0_down
        ,this._simdown.pl0_left
        ,this._simdown.pl0_right
        ,this._simdown.pl0_a
        ,this._simdown.pl0_b
        ,this._simdown.pl0_l
        ,this._simdown.pl0_r
        ,this._simdown.pl0_start
        ,this._simdown.pl1_up
        ,this._simdown.pl1_down
        ,this._simdown.pl1_left
        ,this._simdown.pl1_right
        ,this._simdown.pl1_a
        ,this._simdown.pl1_b
        ,this._simdown.pl1_l
        ,this._simdown.pl1_r
        ,this._simdown.pl1_start
      ]]
    }
    check_down(sim,key){
      const input = this.keys[key]
      if(sim) {
        if (this._simdown[key]){ 
          return true
        } else {
          return false
        }
      } else {
        if (Array.isArray(input)) {
          if (game.input.gamepad.supported && game.input.gamepad.active && this.pad.connected){
            if (input.length === 2){
              return this.pad.isDown(input[1])
            }
            else if (input.length === 3){
              if      (input[2] === 'U') { return this.pad.axis(input[1]) < -0.1}
              else if (input[2] === 'D') { return this.pad.axis(input[1]) >  0.1}
              else if (input[2] === 'L') { return this.pad.axis(input[1]) < -0.1}
              else if (input[2] === 'R') { return this.pad.axis(input[1]) >  0.1}
              else { return false }
            }
          } else {
            return false
          }
        } else if (input !== undefined){
          return input.isDown
        } else {
          return false
        }
      }
    }
    update(sim0=false,sim1=false){
      this.update_pl(sim0,0)
      this.update_pl(sim1,1)
    }
    update_pl(sim,pi){
      if      (this.check_down(sim,`pl${pi}_left`) ){ this.trigger(`pl${pi}_left`) }
      else if (this.check_down(sim,`pl${pi}_right`)){ this.trigger(`pl${pi}_right`)}
      else {
        this._down[`pl${pi}_left`]  = 0
        this._down[`pl${pi}_right`] = 0
      }

      if      (this.check_down(sim,`pl${pi}_up`)  ){ this.trigger(`pl${pi}_up`)  }
      else if (this.check_down(sim,`pl${pi}_down`)){ this.trigger(`pl${pi}_down`) }
      else {
        this._down[`pl${pi}_up`]   = 0
        this._down[`pl${pi}_down`] = 0
      }

      if (this.check_down(sim,`pl${pi}_a`))    { this.trigger(`pl${pi}_a`)     } else { this._down[`pl${pi}_a`]     = 0 }
      if (this.check_down(sim,`pl${pi}_b`))    { this.trigger(`pl${pi}_b`)     } else { this._down[`pl${pi}_b`]     = 0 }
      if (this.check_down(sim,`pl${pi}_l`))    { this.trigger(`pl${pi}_l`)     } else { this._down[`pl${pi}_l`]     = 0 }
      if (this.check_down(sim,`pl${pi}_r`))    { this.trigger(`pl${pi}_r`)     } else { this._down[`pl${pi}_r`]     = 0 }
      if (this.check_down(sim,`pl${pi}_start`)){ this.trigger(`pl${pi}_start`) } else { this._down[`pl${pi}_start`] = 0 }
    }

  }

  return controller
}
