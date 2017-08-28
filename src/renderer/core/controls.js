module.exports = function(game){
  class controller {
    constructor() {
      this.map      = this.map.bind(this)
      this.map_key  = this.map_key.bind(this)
      this.seralize = this.seralize.bind(this)
      this.execute  = this.execute.bind(this)
      this.execute_key = this.execute_key.bind(this)
      this.is_down  = this.is_down.bind(this)
    }
    create() {
      this.callbacks = {}
      this.simulated_down = {}
      this.keys = game.input.keyboard.createCursorKeys();
      //player 1
      this.keys.pl0_up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.keys.pl0_down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.keys.pl0_left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.keys.pl0_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.keys.pl0_a     = game.input.keyboard.addKey(Phaser.Keyboard.X);
      this.keys.pl0_b     = game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.keys.pl0_l     = game.input.keyboard.addKey(Phaser.Keyboard.C);
      this.keys.pl0_r     = game.input.keyboard.addKey(Phaser.Keyboard.C);
      this.keys.pl0_start = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      //player 2
      this.keys.pl1_up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.keys.pl1_down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.keys.pl1_left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.keys.pl1_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.keys.pl1_a     = game.input.keyboard.addKey(Phaser.Keyboard.K);
      this.keys.pl1_b     = game.input.keyboard.addKey(Phaser.Keyboard.L);
      this.keys.pl1_l     = game.input.keyboard.addKey(Phaser.Keyboard.J);
      this.keys.pl1_r     = game.input.keyboard.addKey(Phaser.Keyboard.J);
      this.keys.pl1_start = game.input.keyboard.addKey(Phaser.Keyboard.P);
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
