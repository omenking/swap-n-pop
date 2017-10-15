module.exports = function(game) {
  const APP = require('../../../app')('../../../')
  const { 
    UNIT,
    TIME_PARTICLE
  } = require(APP.path.core('data'));

  class PanelParticle {
    constructor() {
      this.create = this.create.bind(this);
      this.update = this.update.bind(this);
      this.render = this.render.bind(this);
    }

    create(panel, i) {
      this.sprite = game.add.sprite(0, 0, "panel_particles", 0);
      this.sprite.visible = false;

      this.x = 0;
      this.y = 0;
      this.i = i;     // 0 top left, 1 top right, 2 bottom right, 3 bottom left

      this.panel = panel;

      this.counter = 0;
    }

    get counter()    {return this._counter }
    set counter(val) {       this._counter = val }

    update() {
      this.x = this.panel.playfield.layer_block.x + (this.panel.x * UNIT);
      this.y = this.panel.playfield.layer_block.y + (this.panel.y * UNIT);

      if (this.counter > 0) {
        this.counter--;
        const cur = TIME_PARTICLE - this.counter;

        switch (this.i) {
          case 0:     // top left
            this.x -= cur;
            this.y -= cur;
            break;
        
          case 1:     // top right
            this.x += cur;
            this.y -= cur;
            break;
            
          case 2:     // bottom right
            this.x += cur;
            this.y += cur;
            break;
  
          case 3:     // bottom left 
            this.x -= cur;
            this.y += cur;
            break;
        }
      }
    }

    render() {
      const cur = TIME_PARTICLE - this.counter;
      if (cur > 7) {
        this.sprite.frame = 7;  
      }
      else {
        this.sprite.frame = cur;
      }

      this.sprite.x = this.x;
      this.sprite.y = this.y;
      
      this.sprite.visible = (this.counter > 0);
    }
  }

  return PanelParticle;
}