module.exports = function(game) {
  const APP = require('../../../app')('../../../');
  const {px} = require(APP.path.core('filters'));

  /** a Boilerplate class to be used for characters,
   *  you should only define the sprite animations and pos of the sprite
   */
  return class CharacterTemplate {
    create(all_sprites, {x = 0, y = 0}, pi) {
      this.playfield_num = pi;
      this.sprite_names = all_sprites;
      this.animation_speed = 10;
      
      // sprite creation
      this.current_sprite = game.add.sprite(x, y, this.sprite_names[0], 0);
      this.current_sprite.anchor.setTo(0.5);
      this.current_sprite.scale.set(2);
      this.current_sprite.smoothed = false;
      this.x = x;
      this.y = y;

      if (this.playfield_num == 1)
        this.current_sprite.visible = false;
      
      // standing animation
      this.current_sprite.animations.add('stand');
      this.current_sprite.animations.play('stand', this.animation_speed, true);
    }

    attack() {
      this.current_sprite.loadTexture(this.sprite_names[1], 0);
      this.current_sprite.animations.add('attack');
      this.current_sprite.animations.play('attack', this.animation_speed, false);
      
      this.current_sprite.animations.getAnimation('attack').onComplete.add(() => {
        this.current_sprite.loadTexture(this.sprite_names[0], 0);
        this.current_sprite.play('stand', this.animation_speed, true);
      })
    }

    update() {
      this.current_sprite.x = this.x;
      this.current_sprite.y = this.y;
    }
  }
}