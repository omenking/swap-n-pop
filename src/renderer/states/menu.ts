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
    this.menu = new ComponentMenu(9);
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
        game.world.width - (220 + px(70)),
        game.world.centerY - ((10 + (28 * 9) + 10)/2) + 20,
        220,[
      {name: 'Versus Online' , action: this.mode_1p_vs_2p_online},
      {name: 'Story'         , action: this.mode_story},
      {name: 'Time Trial'    , action: this.mode_time_trial},
      {name: 'Endless'       , action: this.mode_story},
      {name: 'Versus Local'  , action: this.mode_1p_vs_2p_local},
      {name: 'Challenges'    , action: this.mode_challenges},
      {name: 'Puzzles'       , action: this.mode_puzzles},
      {name: 'Training'      , action: this.mode_sandox},
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

  mode_time_trial(){
  }

  mode_endless(){
  }

  mode_story(){
  }
  /** starts the mode_puzzle state */
  mode_challenges() {
  }

  mode_puzzles(){
    game.state.start('puzzle_menu', true, false);
  }

  mode_option() {
    ipc.send('settings','replay')
  }

  mode_sandox(){
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
