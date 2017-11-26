module.exports = function(game) {
  /** a Boilerplate class to be used for characters,
   *  you should only define the sprite animations and pos of the sprite
   */
  return class CharacterTemplate {
    create(sprite, x = 0, y = 0, pi) {
      this.playfield_num = pi;
      this.animation_speed = 10;
      
      // sprite creation
      this.sprite = game.add.sprite(x, y, sprite, 0);
      this.sprite.anchor.setTo(0.5);
      this.sprite.scale.set(2);
      this.sprite.smoothed = false;
      this.x = x;
      this.y = y;

      if (pi == 1) {
        this.sprite.scale.x = -2;
        this.x -= -60;
      }

      // adding all animations - connecting them 
      this.add_animation("stand", 8, 0, true);
      this.add_animation("attack", 9, 12, false, true);
      this.add_animation("attacked", 9, 24, false, true);
      this.add_animation("lost", 12, 36, false);
      this.add_animation("losing", 4, 48, true);

      this.sprite.play('stand');
    }

    add_animation(anim_name, hframes, offset, loop, callback = false) {
      this.sprite.animations.add(anim_name, this.animiation_frames(hframes, offset), this.animation_speed, loop);

      if (callback)
        this.sprite.animations.getAnimation(anim_name).onComplete.add(() => {
          this.sprite.play("stand");
        })
    }

    animiation_frames(hframes, offset) {
      var temp = [];

      for (var i = offset; i < offset + hframes; i++)
        temp.push(i);

      return temp;
    }

    update() {
      this.sprite.x = this.x;
      this.sprite.y = this.y;
    }
  }
}