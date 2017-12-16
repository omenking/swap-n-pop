import * as electron       from 'electron'
import game                from 'core/game'
import ComponentMenuCursor from 'components/menu_cursor'

const {ipcRenderer: ipc} = electron

/** Class representing a menu. */
export default class ComponentMenu {
  private sprite : Phaser.Sprite
  private cursor : ComponentMenuCursor
  private testing : Phaser.Tween

  constructor() {
    this.cursor = new ComponentMenuCursor()
  }

  create() {
    // create sprite, choose centerXY and anchor to the middle of the sprite - remembered when rescaling
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'menu');
    this.sprite.anchor.setTo(0.5);

    var spr = game.add.sprite(0, 0, "black_pixel")
    spr.scale.setTo(game.world.width, game.world.height)
    spr.alpha = 0

    this.testing = game.add.tween(spr)
    this.testing.to(
      { alpha: 1 },   // properties
      400,            // delay 
      Phaser.Easing.Sinusoidal.Out,     // console.log(Phaser.Easing) for more options
      true            // autostart - or start manually through this.testing.start()
    )

    this.cursor.create(this, -90, -46, [
      this.mode_1p_vs_2p_local.bind(this),
      this.mode_1p_vs_2p_online.bind(this),
      this.mode_1p_vs_cpu.bind(this),
      this.mode_improve.bind(this),
      this.mode_option.bind(this)
    ]);
  }

  update() {
    this.cursor.update()
  }

  mode_1p_vs_2p_local() {
    //this.testing.start() doesnt work since async state switch
    ipc.send('play-vs',{online: false, cpu: [false,false]})
  }

  mode_1p_vs_2p_online() {
    ipc.send('settings','network')
  }

  mode_1p_vs_cpu() {
    ipc.send('play-vs',{online: false, cpu: [false,true]})
  }

  /** starts the mode_puzzle state */
  mode_improve() {
    game.state.start('puzzle_menu', true, false);
  }

  mode_option() {
    ipc.send('settings','replay')
  }
}
