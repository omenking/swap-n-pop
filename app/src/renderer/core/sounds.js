module.exports = function(game){
  class controller {
    constructor() {
      this.create      = this.create.bind(this)

      this.land         = this.land.bind(this)
      this.swap         = this.swap.bind(this)
      this.confirm      = this.confirm.bind(this)
      this.select       = this.select.bind(this)
      this.stage_music  = this.stage_music.bind(this)
    }
    create(){

      this.sfx_swap = game.add.audio('sfx_swap')

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
    }
    land(){
      this.sfx_land[0].play()
    }
    swap(){
      this.sfx_swap.play()
    }
    confirm(){
      //this.sfx_confirm.play()
    }
    select(){
      this.sfx_select.play()
    }

    stage_music(state){
      return
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
            this.msx_stage.play();
            this.msx_stage_critical.stop();
            this.msx_stage_results.stop();
          }
          break;
        case 'danger':
          if (this.state_music != 'danger') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.play();
            this.msx_stage_results.stop();
          }
          break;
        case 'results':
          if (this.state_music != 'results') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.stop();
            this.msx_stage_results.play();
          }
          break;
      }
    }

  }
  return controller
}
