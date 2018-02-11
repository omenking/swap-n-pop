import game from "core/game";
import State from "./base"
import controls from 'core/controls'
import ComponentMenuItem from 'components/menu_item'
import ComponentMenu from "../components/menu";

/** quick mockup of a credits page state */
export default class CreditsState extends State {
  private bg : Phaser.TileSprite
  private creditText : Phaser.Group
  private font_size : number
  private items : Array<ComponentMenuItem>
  private names : any
  private counter : number

  constructor() { 
    super() 
  
    this.names = [
      {role: "Developers", alias: "Omenking", name: "Andrew Brown"},
      {role: "Developers", alias: "Halfbakedprophet", name: ""},
      {role: "Developers", alias: "Cappu", name: ""},
      {role: "Developers", alias: "Skytrias", name: "Michael Kutowski"},
      {role: "Concept Artists", alias: "Wish", name: "Camryn Tanner"},
      {role: "Spritists", alias: "Neweegee", name: ""},
      {role: "Spritists", alias: "Gaem", name: ""},
      {role: "Spritists", alias: "RJ", name: ""},
      {role: "Ui", alias: "Jash", name: ""},
      {role: "Music and SFX", alias: "Jaxcheese", name: ""},
      {role: "Special Thanks to", alias: "Jon", name: ""}
    ]
  }

  get name(): string { return 'credits' }

  /** simulates the menu background, draws text and assigns controls */
  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')

    this.creditText = game.add.group()
    this.creditText.y = game.world.height
    this.font_size = 36
    
    this.counter = 0
    for (var i = 0; i < this.names.length; i++) {
      if (i === 0 || this.names[i].role !== this.names[i - 1].role) {
        this.set_text(this.names[i].role, 0xE74475, i, 3)
        this.counter += 2
      }
    
      if (this.names[i].name != "") {
        this.set_text(this.names[i].name, 0x814fbc, i, 2)
        this.counter++
        this.set_text(this.names[i].alias, 0x5185db, i, 2)
        this.counter++
      }
      else {
        this.set_text(this.names[i].alias, 0x5185db, i, 2)
        this.counter++
      }

      // shift all text after a role switches to something different
      if (i < (this.names.length - 1))
        if (this.names[i].role !== this.names[i + 1].role)
          this.counter++
    }

    controls.map(0, {
      a       : this.leave.bind(this),
      b       : this.leave.bind(this),
      start   : this.leave.bind(this),
      cancel  : this.leave.bind(this),
    });
  }

  /** creates retro font and an image that will get text and be added to a group */
  set_text(text, hex_color, i, scale_amount) {
    let font = game.add.retroFont('font', 10, 18, Phaser.RetroFont.TEXT_SET10)
    let role = game.add.image(game.world.centerX, (i + this.counter) * this.font_size, font)
    role.anchor.setTo(0.5)
    role.scale.setTo(scale_amount)
    role.tint = hex_color
    font.setText(text, false, 2)
    this.creditText.add(role)
  }

  /** starts the menu */
  leave() {
    game.state.start('menu', true, false)
  }

  /** updates the controls, changes the tilesprite position */
  update() {
    controls.update();

    // estimated end. bad
    if (this.creditText.y > (-1 * (this.font_size * 2) * this.creditText.length) + game.world.centerY)
      this.creditText.y -= 1

    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** closes control updates */
  shutdown() {
    controls.disable()
  }
}