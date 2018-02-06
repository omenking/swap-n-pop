import game from "core/game";
import State from "./base"
import controls from 'core/controls'

/** quick mockup of a credits page state */
export default class CreditsState extends State {
  private bg : Phaser.TileSprite
  private creditText : any
  private font_size : number
  
  constructor() { super() }
  get name(): string { return 'credits' }

  /** simulates the menu background, draws text and assigns controls */
  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green')

    let names = [
      {role: "Developers", name: "Omenking"},
      {role: "Developers", name: "Halfbakedprophet"},
      {role: "Developers", name: "Cappu"},
      {role: "Developers", name: "Skytrias"},
      {role: "Concept Artists", name: "Wish"},
      {role: "Spritists", name: "Neweegee"},
      {role: "Spritists", name: "Gaem"},
      {role: "Spritists", name: "RJ"},
      {role: "Ui", name: "Jash"},
      {role: "Music and SFX", name: "Jaxcheese"},
    ]

    this.creditText = game.add.group()
    this.creditText.y = game.world.height
    this.font_size = 48
    
    let get_style = (hex) => ({ font: `${this.font_size}px Arial`, fill: hex})

    let counter = 0
    for (var i = 0; i < names.length; i++) {
      if (i === 0 || names[i].role !== names[i - 1].role) {
        let role = game.add.text(game.world.centerX, (i + counter++) * this.font_size, names[i].role, get_style("#e2402d"))
        role.anchor.setTo(0.5)
        role.setShadow(3, 3, "rgba(0, 0, 0, 0.5)", 0)
        this.creditText.add(role)
      }
    
      let name = game.add.text(game.world.centerX, (i + counter) * this.font_size, names[i].name, get_style("#ffffff"))
      name.anchor.setTo(0.5)
      name.setShadow(3, 3, "rgba(0, 0, 0, 0.5)", 0)
      this.creditText.add(name)
      
      // shift all text after a role switches to something different
      if (i < (names.length - 1))
        if (names[i].role !== names[i + 1].role)
          counter++
    }

    controls.map(0, {
      a       : this.leave.bind(this),
      b       : this.leave.bind(this),
      start   : this.leave.bind(this),
      cancel  : this.leave.bind(this),
    });
  }

  /** starts the menu */
  leave() {
    game.state.start('menu', true, false)
  }

  /** updates the controls, changes the tilesprite position */
  update() {
    controls.update();

    if (this.creditText.y > (-this.font_size * this.creditText.length) + game.world.centerY)
      this.creditText.y -= 1
    
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** closes control updates */
  shutdown() {
    controls.disable()
  }
}