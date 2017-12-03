import game from 'core/game'

export default class ComponentDebugFrame {
  private lbl : Phaser.Text
  create() {
    this.lbl = game.add.text(116, 4, '', {font: 'normal 10px Arial',fill: '#FFFFFF'})
  }

  render =(i)=> {
    this.lbl.setText(`F${i}`)
  }
}
