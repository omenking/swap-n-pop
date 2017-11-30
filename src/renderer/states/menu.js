import game          from 'core/game'
import ComponentMenu from 'components/menu'

/**
 * Higher Order Menu that keeps the menu updated - Adds Background
 */
export default class StatesMenu {
  constructor() {
    this.menu   = new ComponentMenu();
  }

  /** loads the gamebackground, creates the menu object */
  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green');
    this.menu.create();
  }

  /** controls & and menu are updated to move around,
   *  tilepos is changed to act as a parralax
   */
  update() {
    game.controls.update();
    this.menu.update();
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    game.controls.disable()
  }
}
