module.exports = function(game) {
  return class controller {
    create() {
      
      this.msx_stage_results  = game.add.audio('msx_stage_results')
      this.msx_stage          = game.add.audio('msx_stage')
      this.msx_stage_critical = game.add.audio('msx_stage_critical')
      
      this.state_music = 'none'
      
      this.sfx_land = []
      this.sfx_land[0]  = game.add.audio('sfx_drop0')
      this.sfx_land[1]  = game.add.audio('sfx_drop1')
      this.sfx_land[2]  = game.add.audio('sfx_drop2')
      this.sfx_land[3]  = game.add.audio('sfx_drop3')
      
      this.sfx_confirm = game.add.audio('sfx_confirm')
      this.sfx_select  = game.add.audio('sfx_select')
      
      this.sfx_blip  = game.add.audio('sfx_countdown_blip')
      this.sfx_ding  = game.add.audio('sfx_countdown_ding')
      this.sfx_swap = game.add.audio('sfx_swap')
      
      this.msx_volume = 0.5;
      this.sfx_volume = 0.5;
    } 

    set_sfx_volume(decimal_volume) {
      this.sfx_land.forEach(sfx => sfx.volume = decimal_volume);
      this.sfx_confirm.volume = decimal_volume;
      this.sfx_select.volume = decimal_volume;
      this.sfx_blip.volume = decimal_volume;
      this.sfx_ding.volume = decimal_volume;
      this.sfx_swap.volume = decimal_volume;
    }

    set_msx_volume(decimal_volume) {
      this.msx_stage_results.volume = decimal_volume;
      this.msx_stage.volume = decimal_volume;
      this.msx_stage_critical.volume = decimal_volume;
    }

    mute_all(bool) {
      this.sfx_land.forEach(sfx => sfx.mute = bool);
      this.sfx_confirm.mute = bool;
      this.sfx_select.mute = bool;
      this.sfx_blip.mute = bool;
      this.sfx_ding.mute = bool;
      this.sfx_swap.mute = bool;
      this.msx_stage_results.mute = bool;
      this.msx_stage.mute = bool;
      this.msx_stage_critical.mute = bool;
    }

    land() {
      this.sfx_land[0].play()
    }

    swap() {
      this.sfx_swap.play()
    }

    confirm() {
      this.sfx_confirm.play()
    }

    select() {
      this.sfx_select.play()
    }

    blip() {
      this.sfx_blip.play()
    }

    ding() {
      this.sfx_ding.play()
    }

    stage_music(state) {
      switch (state) {
        case 'pause':
          switch (this.state_music) {
            case 'active':
              this.msx_stage.pause();
              break;
            case 'danger': 
              this.msx_stage_critical.pause();
              break;
          }
          break;
        case 'resume':
          switch (this.state_music) {
            case 'active':
              this.msx_stage.resume();
              break;
            case 'danger':
              this.msx_stage_critical.resume();
              break;
          }
          break;
        case 'none':
          this.state_music = state;
          this.msx_stage.stop();
          this.msx_stage_critical.stop();
          this.msx_stage_results.stop();
          break;
        case 'active':
          if (this.state_music != 'active') {
            this.state_music = state;
            this.msx_stage.loopFull(this.msx_volume);
            this.msx_stage_critical.stop();
            this.msx_stage_results.stop();
          }
          break;
        case 'danger':
          if (this.state_music != 'danger') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.loopFull(this.msx_volume);
            this.msx_stage_results.stop();
          }
          break;
        case 'results':
          if (this.state_music != 'results') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.stop();
            this.msx_stage_results.loopFull(this.msx_volume);
          }
          break;
      }
    }
  }
}
