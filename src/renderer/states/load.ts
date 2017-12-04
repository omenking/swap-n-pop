import State    from 'states/base'
import game     from 'core/game'
import controls from 'core/controls'
import filters  from 'core/filters'

const {px} = filters

  /** Loads all sprites, spritesheets, sound effects, etc to the phaser game
   *  Uses signals to detect once everything has been loaded correctly
   */
export default class LoadState extends State {
  private loader : Phaser.Text
  private files : Phaser.Text
  private file : Phaser.Text

  get name(): string {
    return 'load';
  }

  create() {
    const x = game.world.centerX
    const y = game.world.centerY
    const font_style1 = { font: '20px Verdana', fill: '#FFF', align: 'center' }
    const font_style2 = { font: '12px Verdana', fill: '#FFF', align: 'center' }
    this.loader = game.add.text(0,y    , `Loading ${0}%`, font_style1)
    this.files  = game.add.text(0,y+40 , "Files 0 / 0"  , font_style2)
    this.file   = game.add.text(0,y+70 , ""             , font_style2)
    this.loader.visible = false
    this.files.visible  = false
    this.file.visible   = false
    
    game.load.onLoadStart.add(this.load_start   , this)
    game.load.onFileComplete.add(this.file_complete, this)
    game.load.onLoadComplete.add(this.load_complete, this)
    this.load_all()
  }

  load_start() {

  }
  
  file_complete =(progress,key,success,cur,total)=> {
    this.files.setText(`Files ${cur} / ${total}`)
    this.file.setText(key)
  } 

  load_complete() {
    controls.create()
    game.sounds.create()
    game.state.start('menu')
  }

  update() {
    this.loader.setText(`Loading ${game.load.progress}%`);
  }

  render() {
    //this.loader.visible = true
    //this.files.visible  = true
    //this.file.visible   = true
  }

  load_all() {
    // Music --------
    game.load.audio('msx_stage'         , './assets/music/stage.mp3')
    game.load.audio('msx_stage_critical', './assets/music/stage_critical.mp3')
    game.load.audio('msx_stage_results' , './assets/music/stage_results.mp3')
    // SFX ----------
    game.load.audio('sfx_confirm', './assets/sound_effects/pause.ogg')
    game.load.audio('sfx_select' , './assets/sound_effects/confirm.ogg')
    game.load.audio('sfx_swap'   , './assets/sound_effects/swap.ogg')

    game.load.audio('sfx_countdown_blip'   , './assets/sound_effects/countdown_blip.ogg')
    game.load.audio('sfx_countdown_ding'   , './assets/sound_effects/countdown_ding.ogg')

    game.load.audio('sfx_drop0'   , './assets/sound_effects/drop0.ogg')
    game.load.audio('sfx_drop1'   , './assets/sound_effects/drop1.mp3')
    game.load.audio('sfx_drop2'   , './assets/sound_effects/drop2.mp3')
    game.load.audio('sfx_drop3'   , './assets/sound_effects/drop3.mp3')

    game.load.audio('sfx_pop0', './assets/sound_effects/pop0.ogg');
    game.load.audio('sfx_pop1', './assets/sound_effects/pop1.ogg');
    game.load.audio('sfx_pop2', './assets/sound_effects/pop2.ogg');
    game.load.audio('sfx_pop3', './assets/sound_effects/pop3.ogg');
    // Bg -----------
    game.load.image('bg_blue'  , './assets/images/bg_blue.png')
    game.load.image('bg_green' , './assets/images/bg_green.png')
    game.load.image('bg_purple', './assets/images/bg_purple.png')
    // UI -----------
    game.load.spritesheet('ints_small' , './assets/images/ints_small.png'  , px(8), px(8 ), 18)
    game.load.spritesheet('ints_large' , './assets/images/ints_large.png'  , px(8), px(14),18)
    // Menus --------
    game.load.image('menu'             , './assets/images/menu.png')
    game.load.image('menu_cursor'      , './assets/images/menu_cursor.png')
    game.load.image('menu_pause_cursor', './assets/images/menu_pause_cursor.png')
    game.load.image('menu_pause'       , './assets/images/menu_pause.png')
    game.load.image('pause'            , './assets/images/pause.png')
    game.load.image('puzzle_menu'       , './assets/images/puzzle_menu.png')
    // Playfield ----
    game.load.spritesheet('playfield_cursor'    , './assets/images/playfield_cursor.png'  , px(38), px(22), 2)
    game.load.image('playfield_vs_frame'        , './assets/images/playfield_vs_frame.png')
    game.load.image('playfield_vs_bg'           , './assets/images/playfield_vs_bg.png')
    game.load.image('mode_puzzle_bg'            , './assets/images/mode_puzzle_bg.png')
    game.load.spritesheet('playfield_countdown' , './assets/images/playfield_countdown.png', px(62), px(38), 4)

    game.load.spritesheet('panels'              , './assets/images/panels.png'   , px(16), px(16), 136)
    game.load.spritesheet('garbage'             , './assets/images/garbage.png'  , px(16), px(16), 14)

    game.load.image('playfield_char00', './assets/images/characters/char00.png')
    game.load.image('playfield_char01', './assets/images/characters/char01.png')
    game.load.image('playfield_char02', './assets/images/characters/char02.png')
    game.load.image('playfield_char03', './assets/images/characters/char03.png')
    game.load.image('playfield_char04', './assets/images/characters/char04.png')
    game.load.image('playfield_char05', './assets/images/characters/char05.png')
    game.load.image('playfield_char06', './assets/images/characters/char06.png')
    game.load.image('playfield_char07', './assets/images/characters/char07.png')
    game.load.image('playfield_char08', './assets/images/characters/char08.png')
    game.load.image('playfield_char09', './assets/images/characters/char09.png')
    game.load.image('playfield_char10', './assets/images/characters/char10.png')
    game.load.image('playfield_char11', './assets/images/characters/char11.png')
    game.load.image('playfield_char12', './assets/images/characters/char12.png')

    game.load.image('playfield_wall0', './assets/images/playfield_wall0.png')
    game.load.image('playfield_wall1', './assets/images/playfield_wall1.png')

    game.load.spritesheet('star_counter', './assets/images/star_counter.png',px(16),px(16),12)

    game.load.spritesheet('bauble'          , './assets/images/bauble.png',px(3),px(16),6)
    game.load.image(      'bauble_times'    , './assets/images/bauble_times.png')
    game.load.spritesheet('bauble_num'      , './assets/images/bauble_num.png',px(6),px(9),10)
    game.load.spritesheet('bauble_num_small', './assets/images/bauble_num_small.png',px(5),px(9),10)

    game.load.spritesheet('panel_particles', './assets/images/pop_frames.png', px(16), px(16), 8);
    game.load.spritesheet('zephyr', './assets/images/zephyr_all.png', 48, 48, 84);

    game.load.start()
  }
}
