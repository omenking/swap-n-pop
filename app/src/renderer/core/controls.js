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
    }
    create() {
      this.callbacks = {}
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
      this.keys.pl0_up    = game.input.keyboard.addKey(inputs[0]);
      this.keys.pl0_down  = game.input.keyboard.addKey(inputs[1]);
      this.keys.pl0_left  = game.input.keyboard.addKey(inputs[2]);
      this.keys.pl0_right = game.input.keyboard.addKey(inputs[3]);
      this.keys.pl0_a     = game.input.keyboard.addKey(inputs[4]);
      this.keys.pl0_b     = game.input.keyboard.addKey(inputs[5]);
      this.keys.pl0_l     = game.input.keyboard.addKey(inputs[6]);
      this.keys.pl0_r     = game.input.keyboard.addKey(inputs[7]);
      this.keys.pl0_start = game.input.keyboard.addKey(inputs[8]);
      //player 2
      this.keys.pl1_up    = game.input.keyboard.addKey(inputs[9]);
      this.keys.pl1_down  = game.input.keyboard.addKey(inputs[10]);
      this.keys.pl1_left  = game.input.keyboard.addKey(inputs[11]);
      this.keys.pl1_right = game.input.keyboard.addKey(inputs[12]);
      this.keys.pl1_a     = game.input.keyboard.addKey(inputs[13]);
      this.keys.pl1_b     = game.input.keyboard.addKey(inputs[14]);
      this.keys.pl1_l     = game.input.keyboard.addKey(inputs[15]);
      this.keys.pl1_r     = game.input.keyboard.addKey(inputs[16]);
      this.keys.pl1_start = game.input.keyboard.addKey(inputs[17]);
    }
    is_down(pi,key){
      const name = `pl${pi}_${key}`
      return this.keys[name].isDown || this.simulated_down[name]
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
      this.callbacks[name] = fun
      this.simulated_down[name] = false
    }
    seralize(pi){
      var bitset = ''
      bitset += this.keys[`pl${pi}_up`].isDown    ? '1' : '0'
      bitset += this.keys[`pl${pi}_down`].isDown  ? '1' : '0'
      bitset += this.keys[`pl${pi}_left`].isDown  ? '1' : '0'
      bitset += this.keys[`pl${pi}_right`].isDown ? '1' : '0'
      bitset += this.keys[`pl${pi}_b`].isDown || this.keys[`pl${pi}_a`].isDown ? '1' : '0'
      bitset += this.keys[`pl${pi}_r`].isDown || this.keys[`pl${pi}_l`].isDown ? '1' : '0'
      return bitset
    }
    execute(pi,bitset){
      this.execute_key(bitset,pi,0,'up')
      this.execute_key(bitset,pi,1,'down')
      this.execute_key(bitset,pi,2,'left')
      this.execute_key(bitset,pi,3,'right')
      this.execute_key(bitset,pi,4,'a')
      this.execute_key(bitset,pi,5,'r')
    }
    execute_key(bitset,pi,at,key){
      const name = `pl${pi}_${key}`
      if (bitset.charAt(at) === '1') {
        this.callbacks[name]()
        this.simulated_down[name] = true
      } else {
        this.simulated_down[name] = false
      }
    }
  };

  return controller
}
