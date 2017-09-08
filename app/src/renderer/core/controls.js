module.exports = function(game){
  const Store = require('electron-store')
  const store = new Store()
  const {ipcRenderer: ipc} = require('electron')

  class controller {
    constructor() {
      this.map         = this.map.bind(this)
      this.map_key     = this.map_key.bind(this)
      this.seralize    = this.seralize.bind(this)
      this.execute     = this.execute.bind(this)
      this.execute_key = this.execute_key.bind(this)
      this.is_down     = this.is_down.bind(this)
      this.check_down  = this.check_down.bind(this)
      this.rebind      = this.rebind.bind(this)
      this.trigger     = this.trigger.bind(this)
      this.add_input   = this.add_input.bind(this)
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
      //this.pad = [
        //game.input.gamepad.pad1,
        //game.input.gamepad.pad2
      //]

      this._down = {} //simulated down
      this.keys = []
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
      //player 1
      this.keys.pl0_up    = this.add_input(inputs[0])
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
    }
    add_input(i){
      if(typeof(i) === 'string'){
        if (i.charAt(1) === 'P') {
          return [
            parseInt(i.charAt(0)),
            parseInt(i.substr(4,i.length-1))
          ]
        } else if (i.charAt(1) === 'A') {
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
    map(pi,opts){
      const keys = "up down left right a b l r start".split(' ');
      for (let key of keys) {
        this.map_key(pi,key,opts)
      }
    }
    map_key(pi,key,opts){
      const fun = opts[key] ? opts[key] : function() {};
      var name = `pl${pi}_${key}`
      this.callbacks[name] = fun
      this._down[name]     = 0
    }
    seralize(pi){
      var byte = 0x00
      if(this.check_down(`pl${pi}_up`   )){byte = byte | 0x01} //0000 0001
      if(this.check_down(`pl${pi}_down` )){byte = byte | 0x02} //0000 0010
      if(this.check_down(`pl${pi}_left` )){byte = byte | 0x04} //0000 0100
      if(this.check_down(`pl${pi}_right`)){byte = byte | 0x08} //0000 1000
      if(this.check_down(`pl${pi}_a`    )){byte = byte | 0x10} //0001 0000
      if(this.check_down(`pl${pi}_b`    )){byte = byte | 0x20} //0010 0000
      if(this.check_down(`pl${pi}_r`    )||
         this.check_down(`pl${pi}_l`    )){byte = byte | 0x40} //0100 0000
      if(this.check_down(`pl${pi}_start`)){byte = byte | 0x80} //1000 0000
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
      if (byte & at === at) {
        this.trigger(name)
      } else {
        this._down[name] = 0
      }
    }
    trigger(name){
      this.callbacks[name](this._down[name]++)
    }
    check_down(key){
      const input = this.keys[key]
      if (Array.isArray(input)) {
        if (game.input.gamepad.supported && game.input.gamepad.active && this.pad.connected){
          if      (input.length === 2){
            return this.pad.isDown(input[1])
          }
          else if (input.length === 3){
            if      (input[2] === 'U') { return this.pad.axis(input[1]) < -0.1}
            else if (input[2] === 'D') { return this.pad.axis(input[1]) >  0.1}
            else if (input[2] === 'L') { return this.pad.axis(input[1]) < -0.1}
            else if (input[2] === 'R') { return this.pad.axis(input[1]) >  0.1}
          }
        } else {
          return false
        }
      } else if (input !== undefined){
        return input.isDown
      }
    }
    update(){
      // Player 1 #####
      if      (this.check_down("pl0_left") ){ this.trigger("pl0_left") }
      else if (this.check_down("pl0_right")){ this.trigger("pl0_right")}
      else {
        this._down["pl0_left"]  = 0
        this._down["pl0_right"] = 0
      }

      if      (this.check_down("pl0_up")  ){ this.trigger("pl0_up")  }
      else if (this.check_down("pl0_down")){ this.trigger("pl0_down")}
      else {
        this._down["pl0_up"]   = 0
        this._down["pl0_down"] = 0
      }

      if (this.check_down("pl0_a")){ this.trigger("pl0_a") }
      else { this._down["pl0_a"] = 0 }

      if (this.check_down("pl0_b")){ this.trigger("pl0_b") }
      else { this._down["pl0_b"] = 0 }

      if (this.check_down("pl0_l")){ this.trigger("pl0_l") }
      else { this._down["pl0_l"] = 0 }

      if (this.check_down("pl0_r")){ this.trigger("pl0_r") }
      else { this._down["pl0_r"] = 0 }

      if (this.check_down("pl0_start")){ this.trigger("pl0_start") }
      else { this._down["pl0_start"] = 0 }
      // Player 2 #####
      if      (this.check_down("pl1_left") ){ this.trigger("pl1_left") }
      else if (this.check_down("pl1_right")){ this.trigger("pl1_right")}
      else {
        this._down["pl1_left"]  = 0
        this._down["pl1_right"] = 0
      }

      if      (this.check_down("pl1_up")  ){ this.trigger("pl1_up")  }
      else if (this.check_down("pl1_down")){ this.trigger("pl1_down")}
      else {
        this._down["pl1_up"]   = 0
        this._down["pl1_down"] = 0
      }

      if (this.check_down("pl1_a")){ this.trigger("pl1_a") }
      else { this._down["pl1_a"] = 0 }

      if (this.check_down("pl1_b")){ this.trigger("pl1_b") }
      else { this._down["pl1_b"] = 0 }

      if (this.check_down("pl1_l")){ this.trigger("pl1_l") }
      else { this._down["pl1_l"] = 0 }

      if (this.check_down("pl1_r")){ this.trigger("pl1_r") }
      else { this._down["pl1_r"] = 0 }

      if (this.check_down("pl1_start")){ this.trigger("pl1_start") }
      else { this._down["pl1_start"] = 0 }
    }
  };

  return controller
}
