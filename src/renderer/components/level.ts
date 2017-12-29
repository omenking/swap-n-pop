import game from 'core/game'

export default class ComponentLevel {
  private sprite : any
  private pi     : number
  private level  : number

  constructor(pi : number){
    this.pi = pi
  }
  create(x : number, y : number, level: number){
    this.level  = level
    this.sprite = game.add.sprite(x,y,'mode_vs_level',this.frame)
  }

  get frame(){
    return (this.pi * 10) + (this.level-1)
  }
  render(){
    this.sprite.frame = this.frame
  }
}
