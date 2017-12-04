import * as electron       from 'electron'
import game                from 'core/game'
import filters             from 'core/filters'
import ComponentMenuCursor from 'components/menu_cursor'

const {ipcRenderer: ipc} = electron
const {px} = filters

/** Class representing a menu. */
export default class ComponentMenu {
  private sprite : Phaser.Sprite
  private cursor : ComponentMenuCursor

  constructor() {
    this.cursor = new ComponentMenuCursor()
  }
  
  create() {
    // create sprite, choose centerXY and anchor to the middle of the sprite - remembered when rescaling
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'menu');
    this.sprite.anchor.setTo(0.5);

    this.cursor.create(this, -90, -46, [
      this.mode_1p_vs_2p_local,
      this.mode_1p_vs_2p_online,
      this.mode_1p_vs_cpu,
      this.mode_improve,
      this.mode_option
    ]);
  }
  
  update() {
    this.cursor.update()
  }
  
  mode_1p_vs_2p_local() {
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
