import game          from 'core/game'
import controls      from 'core/controls'
import fade          from 'core/fade'
import {px}          from 'core/filters'
import ComponentMenuMain from 'components/menu_main'
import ComponentMenuVs   from 'components/menu_vs'
import State         from './base'
import {
  MENU_MAIN,
  MENU_VS
} from 'common/data'

/**
 * Higher Order Menu that keeps the menu updated - Adds Background
 */
export default class MenuState extends State {
  public state : string
  private menu_main : ComponentMenuMain
  private menu_vs   : ComponentMenuVs

  private bg : Phaser.TileSprite
  private logo : Phaser.Sprite

  get name(): string {
    return 'menu'
  }

  constructor() {
    super()
    this.menu_main = new ComponentMenuMain()
    this.menu_vs   = new ComponentMenuVs()
  }

  /** loads the gamebackground, creates the menu object */
  create() {
    this.state = MENU_MAIN
    this.create_bg()
    this.create_logo()
    this.menu_main.create(this)
    fade.in()
  }

  create_bg(){
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')
  }

  create_logo(){
    this.logo = game.add.sprite(px(40),0,'logo')
    this.logo.y = game.world.centerY - this.logo.centerY
  }

  /** controls & and menu are updated to move around,
   *  tilepos is changed to act as a parralax
   */
  update() {
    controls.update()
    this.menu_main.update()
    this.menu_vs.update()
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    controls.disable()
  }
}
