module.exports = function(game){
  class controller {
    constructor() {
      this.map = this.map.bind(this);
      this.map_key = this.map_key.bind(this);
    }
    create() {
      this.keys = game.input.keyboard.createCursorKeys();
      this.keys.pl1_up    = game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.keys.pl1_down  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.keys.pl1_left  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.keys.pl1_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.keys.pl1_a     = game.input.keyboard.addKey(Phaser.Keyboard.X);
      this.keys.pl1_b     = game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.keys.pl1_l     = game.input.keyboard.addKey(Phaser.Keyboard.C);
      this.keys.pl1_r     = game.input.keyboard.addKey(Phaser.Keyboard.C);
      this.keys.pl1_start = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      this.keys.pl2_up    = game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.keys.pl2_down  = game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.keys.pl2_left  = game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.keys.pl2_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.keys.pl2_a     = game.input.keyboard.addKey(Phaser.Keyboard.K);
      this.keys.pl2_b     = game.input.keyboard.addKey(Phaser.Keyboard.L);
      this.keys.pl2_l     = game.input.keyboard.addKey(Phaser.Keyboard.J);
      this.keys.pl2_r     = game.input.keyboard.addKey(Phaser.Keyboard.J);
      return this.keys.pl2_start = game.input.keyboard.addKey(Phaser.Keyboard.P);
    }
    map(player_num,opts){
      const keys = "up down left right a b l r start".split(' ');
      return Array.from(keys).map((key) =>
        this.map_key(player_num,key,opts));
    }
    map_key(i,key,opts){
      const fun = opts[key] ? opts[key] : function() {};
      this.keys[`pl${i}_${key}`].onDown.removeAll();
      return this.keys[`pl${i}_${key}`].onDown.add(fun, this);
    }
  };

  return controller
}
