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
      this.rebind      = this.rebind.bind(this)
      this.trigger     = this.trigger.bind(this)
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

      this.simulated_down = {}
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
      game.input.keyboard.reset();
      this.keys = []
      //player 1
      this.keys.pl0_up    = game.input.keyboard.addKey(inputs[0])
      this.keys.pl0_down  = game.input.keyboard.addKey(inputs[1])
      this.keys.pl0_left  = game.input.keyboard.addKey(inputs[2])
      this.keys.pl0_right = game.input.keyboard.addKey(inputs[3])
      this.keys.pl0_a     = game.input.keyboard.addKey(inputs[4])
      this.keys.pl0_b     = game.input.keyboard.addKey(inputs[5])
      this.keys.pl0_l     = game.input.keyboard.addKey(inputs[6])
      this.keys.pl0_r     = game.input.keyboard.addKey(inputs[7])
      this.keys.pl0_start = game.input.keyboard.addKey(inputs[8])
      //player 2
      this.keys.pl1_up    = game.input.keyboard.addKey(inputs[9])
      this.keys.pl1_down  = game.input.keyboard.addKey(inputs[10])
      this.keys.pl1_left  = game.input.keyboard.addKey(inputs[11])
      this.keys.pl1_right = game.input.keyboard.addKey(inputs[12])
      this.keys.pl1_a     = game.input.keyboard.addKey(inputs[13])
      this.keys.pl1_b     = game.input.keyboard.addKey(inputs[14])
      this.keys.pl1_l     = game.input.keyboard.addKey(inputs[15])
      this.keys.pl1_r     = game.input.keyboard.addKey(inputs[16])
      this.keys.pl1_start = game.input.keyboard.addKey(inputs[17])
    }
    is_down(pi,key){
      const name = `pl${pi}_${key}`
      return this.keys[name].isDown || (this.simulated_down[name] > 0)
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
      this.keys[name].onDown.removeAll();
      this.keys[name].onDown.add(fun, this);
      this.callbacks[name]      = fun
      this.simulated_down[name] = 0
    }
    seralize(pi){
      var byte = 0x00
      if(this.keys[`pl${pi}_up`].isDown   ){byte = byte | 0x01} //0000 0001
      if(this.keys[`pl${pi}_down`].isDown ){byte = byte | 0x02} //0000 0010
      if(this.keys[`pl${pi}_left`].isDown ){byte = byte | 0x04} //0000 0100
      if(this.keys[`pl${pi}_right`].isDown){byte = byte | 0x08} //0000 1000
      if(this.keys[`pl${pi}_a`].isDown    ){byte = byte | 0x10} //0001 0000
      if(this.keys[`pl${pi}_b`].isDown    ){byte = byte | 0x20} //0010 0000
      if(this.keys[`pl${pi}_r`].isDown ||
        this.keys[`pl${pi}_l`].isDown     ){byte = byte | 0x40} //0100 0000
      if(this.keys[`pl${pi}_start`].isDown){byte = byte | 0x80} //1000 0000
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
        this.simulated_down[name] = 0
      }
    }
    trigger(name){
      this.callbacks[name](this.simulated_down[name]++)
    }
    update(){
      if (game.input.gamepad.supported && game.input.gamepad.active && this.pad.connected) {
        if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 ){
          this.trigger("pl0_left")
        }
        else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 ){
          this.trigger("pl0_right")
        } else {
          this.simulated_down["pl0_left"]  = 0
          this.simulated_down["pl0_right"] = 0
        }
        if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1){
          this.trigger("pl0_up")
        }
        else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1){
          this.trigger("pl0_down")
        } else {
          this.simulated_down["pl0_up"]   = 0
          this.simulated_down["pl0_down"] = 0
        }

        if (this.pad.isDown(Phaser.Gamepad.XBOX360_A)){
          this.trigger("pl0_b")
        } else {
          this.simulated_down["pl0_b"] = 0
        }

        if (this.pad.isDown(Phaser.Gamepad.XBOX360_B)){
          this.trigger("pl0_a")
        } else {
          this.simulated_down["pl0_a"] = 0
        }

        if (this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER) || this.pad.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER)){
          this.trigger("pl0_l")
        } else {
          this.simulated_down["pl0_l"] = 0
        }

        if (this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) || this.pad.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)){
          this.trigger("pl0_r")
        } else {
          this.simulated_down["pl0_r"] = 0
        }

      }
    }
  };

  return controller
}
