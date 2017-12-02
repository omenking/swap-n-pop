import game    from 'core/game'
import filters from 'core/filters'
import ComponentMenuPauseCursor from 'components/menu_pause_cursor'
import ModeVs from 'states/mode_vs'

const {px} = filters

/** A ComponentPauseMenu handles the pausing of a stage
 *  new controls are provided to move in the menu and use various options
 */
export default class ComponentPauseMenu {
  /** bindings & new menu cursor created */
  private cursor : ComponentMenuPauseCursor
  private paused : boolean
  private stage  : ModeVs
  private sprite : Phaser.Sprite

  constructor() {
    this.cursor = new ComponentMenuPauseCursor()
  }

  /**
   * pausing turned of normally
   * add a sprite to this object but turn it off for now
   * create a cursor with no controls provided yet 
   * @param {mode_vs} stage reference to call both playfields 
   */
  create(stage) {
    this.paused = false;

    this.stage = stage;

    // for now playfield.x changed to a value
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'menu_pause');
    this.sprite.anchor.setTo(0.5);   
    this.sprite.visible = false;

    // create a controller with this menu given as a reference, push 2 methods of the menu
    return this.cursor.create(this, -70, -16, [
      this.continue,
      this.cancel
    ]);
  }

  /** leave the game */
  cancel() {
    game.state.start('menu');
  }

  /** called through cursor, unpauses the menu and turns of the sprite again
   * also calls the mode_vs||stage resume method which will return new cursor controls
   */
  continue() {
    this.paused         = false;
    this.sprite.visible = false;
    this.stage.resume();
  }

  /** unpauses update method of the menu, 
   * make this object visible and 
   * reassigns controls to both playfields registered players */
  pause() {
    this.paused = true;
    this.sprite.visible = true;

    if (this.stage.playfield0 !== undefined &&
        this.stage.playfield1 !== undefined) {
      // give player control
      this.cursor.map_controls(this.stage.playfield0.pi);
      // below possibly gives 2nd player controls of the menu (didnt test, but didnt break p1.pi control)
      this.cursor.map_controls(this.stage.playfield1.pi);
    }
    else {
      this.cursor.map_controls(this.stage.playfield0.pi);
    }
  }

  /** once unpaused the menu will update its cursor */
  update() {
    if (!this.paused) 
      return; 

    // check for any Input and if any pressed - continue or cancel may be called here
    this.cursor.update();
  }
}
