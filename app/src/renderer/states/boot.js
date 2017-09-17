module.exports = function(game){
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.load_start = this.load_start.bind(this);
      this.file_complete = this.file_complete.bind(this);
      this.load_complete = this.load_complete.bind(this);
      this.update = this.update.bind(this);
      this.load = this.load.bind(this);
    }

    preload() {}
    create() {
      const x = game.world.centerX
      const y = game.world.centerY
      const font_style1 = { font: '30px Verdana', fill: '#FFF', align: 'center' }
      const font_style2 = { font: '20px Verdana', fill: '#FFF', align: 'center' }
      this.loader = game.add.text(x,y    , `Loading ${0}%`, font_style1)
      this.files  = game.add.text(x,y+40 , "Files 0 / 0"  , font_style2)
      this.file   = game.add.text(x,y+70 , ""             , font_style2)

      game.stage.disableVisibilityChange = true
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
      game.renderer.renderSession.roundPixels = true
      Phaser.Canvas.setImageRenderingCrisp(game.canvas)

      game.load.onLoadStart.add(this.load_start   , this)
      game.load.onFileComplete.add(this.file_complete, this)
      game.load.onLoadComplete.add(this.load_complete, this)
      this.load()
    }
    load_start() {
    }
    file_complete(progress,key,success,cur,total){
      this.files.setText(`Files ${cur} / ${total}`)
      this.file.setText(key)
    }
    load_complete() {
      game.controls.create()
      game.sounds.create()
      game.state.start('menu')
    }
    update() {
      this.loader.setText(`Loading ${game.load.progress}%`);
    }
    load() {
      // Music --------
      game.load.audio('msx_stage'         , './assets/msx_stage.mp3')
      game.load.audio('msx_stage_critical', './assets/msx_stage_critical.mp3')
      game.load.audio('msx_stage_results' , './assets/msx_stage_results.mp3')
      // SFX ----------
      game.load.audio('sfx_confirm', './assets/sfx_confirm.mp3')
      game.load.audio('sfx_select' , './assets/sfx_select.mp3')
      game.load.audio('sfx_swap'   , './assets/sfx_swap.mp3')

      game.load.audio('sfx_countdown_blip'   , './assets/sfx_countdown_blip.mp3')
      game.load.audio('sfx_countdown_ding'   , './assets/sfx_countdown_ding.mp3')

      game.load.audio('sfx_drop0'   , './assets/sfx_drop0.mp3')
      game.load.audio('sfx_drop1'   , './assets/sfx_drop1.mp3')
      game.load.audio('sfx_drop2'   , './assets/sfx_drop2.mp3')
      game.load.audio('sfx_drop3'   , './assets/sfx_drop3.mp3')
      // Bg -----------
      game.load.image('bg_blue'  , './assets/bg_blue.png')
      game.load.image('bg_green' , './assets/bg_green.png')
      game.load.image('bg_purple', './assets/bg_purple.png')
      // UI -----------
      game.load.spritesheet('ints_small' , './assets/ints_small.png'  , 8, 8, 18)
      game.load.spritesheet('ints_large' , './assets/ints_large.png'  , 8, 14,18)
      // Menus --------
      game.load.image('menu'             , './assets/menu.png')
      game.load.image('menu_cursor'      , './assets/menu_cursor.png')
      game.load.image('menu_pause_cursor', './assets/menu_pause_cursor.png')
      game.load.image('menu_pause'       , './assets/menu_pause.png')
      game.load.image('pause'            , './assets/pause.png')
      // Playfield ----
      game.load.spritesheet('playfield_cursor'        , './assets/playfield_cursor.png'  , 38, 22, 2)
      game.load.image('playfield_vs_frame'            , './assets/playfield_vs_frame.png')
      game.load.image('playfield_vs_bg'               , './assets/playfield_vs_bg.png')
      game.load.spritesheet('playfield_countdown'     , './assets/playfield_countdown.png', 62, 38, 4)
      game.load.spritesheet('panels'                  , './assets/panels.png'  , 16, 16, 136)

      game.load.start()
    }
  }
  return controller
}
