module.exports = function(game) {
  const APP = require('../../../app')('../../../')
  const { 
    UNIT,
    TIME_PARTICLE
  } = require(APP.path.core('data'));

  class PanelParticle {
    create(panel, dir) {
      this.sprite = game.add.sprite(0, 0, "panel_particles", 0);
      this.sprite.visible = false;

      this.x = 0;
      this.y = 0;
      this.dir = dir;     // 0 top left, 1 top right, 2 bottom right, 3 bottom left

      this.panel = panel;

      this.counter = 0;
      this.ct = 0;
    }

    /** sets the pos of the particle, also sets the dir based on its dir  */
    update() {
      this.x = this.panel.playfield.layer_block.x + (this.panel.x * UNIT)
      this.y = this.panel.playfield.layer_block.y + (this.panel.y * UNIT)

      if (this.counter > 0) {
        this.counter--
        const cur = TIME_PARTICLE - this.counter

        switch (this.dir) {
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

    /**
     * Calculus for sprite animation - the Time each frame has with 8 frames would be 0.125s
     * returns true when 0.125 would have been passed and waits for the next 0.125 so 0.300s to be crossed
     * @param {integer} frames amt of frames to set intervals
     * @param {integer} ct upgoing counter
     * @param {integer} current real num from 0 to 1
     * @returns true when current has crossed over ct+1/frames
     */
    animate_in_intervals(frames, ct, current) {
      return (((this.ct + 1) / 8) <= current);
    }

    /** draws the sprite contents, animates the sprite when visible */
    render() {
      if (this.counter > 0) {
        const cur = (TIME_PARTICLE - this.counter) / TIME_PARTICLE;

        if (this.animate_in_intervals(8, this.ct, cur))
          this.sprite.frame = this.ct++;
      }

      this.sprite.x = this.x
      this.sprite.y = this.y
      this.sprite.visible = (this.counter > 0)
    }
  }

  return PanelParticle;
}
