import game          from 'core/game'
import controls      from 'core/controls'
import fade          from 'core/fade'
import {px}          from 'core/filters'
import ComponentMenu from 'components/menu'
import State         from './base'
import {ipcRenderer as ipc} from 'electron'

/**
 * Higher Order Menu that keeps the menu updated - Adds Background
 */
export default class MenuState extends State {
  private menu : ComponentMenu
  private bg : Phaser.TileSprite
  private logo : Phaser.Sprite

  constructor() {
    super()
    this.menu = new ComponentMenu(5);
  }

  get name(): string {
    return 'menu';
  }

  /** loads the gamebackground, creates the menu object */
  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')
    this.logo = game.add.sprite(px(40),0,'logo')
    this.logo.y = game.world.centerY - this.logo.centerY
    this.menu.create(
        game.world.centerX,
        game.world.centerY - ((10 + (28 * 5) + 10)/2),
        220,[
      {name: 'Play VS'       , action: this.mode_1p_vs_2p_local},
      {name: 'Play VS Online', action: this.mode_1p_vs_2p_online},
      {name: 'Play VS CPU'   , action: this.mode_1p_vs_cpu},
      {name: 'Puzzle Mode'   , action: this.mode_improve},
      {name: 'Options'       , action: this.mode_option},
    ])
    fade.in()
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


  /** controls & and menu are updated to move around,
   *  tilepos is changed to act as a parralax
   */
  update() {
    controls.update();
    this.menu.update();
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    controls.disable()
  }
}
