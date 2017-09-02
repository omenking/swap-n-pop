module.exports = function(game){
  class controller {
    constructor() {
      this.land    = this.land.bind(this)
      this.swap    = this.swap.bind(this)
      this.confirm = this.confirm.bind(this)
      this.select  = this.select.bind(this)
    }
    create(){
      this.sfx_swap = game.add.audio('sfx_swap')

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
      this.sfx_confirm.play()
    }
    select(){
      this.sfx_select.play()
    }
  }
  return controller
}
