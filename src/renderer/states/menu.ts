import game          from 'core/game'
import controls      from 'core/controls'
import fade          from 'core/fade'
import {px}          from 'core/filters'
import ComponentMenu from 'components/menu'
import State         from './base'

/**
 * Higher Order Menu that keeps the menu updated - Adds Background
 */
export default class MenuState extends State {
  private menu : ComponentMenu
  private bg : Phaser.TileSprite
  private logo : Phaser.Sprite

  constructor() {
    super()
    this.menu   = new ComponentMenu();
  }

  get name(): string {
    return 'menu';
  }

  /** loads the gamebackground, creates the menu object */
  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')
    this.logo = game.add.sprite(px(40),0,'logo')
    this.logo.y = game.world.centerY - this.logo.centerY
    this.menu.create()
    fade.in()
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
