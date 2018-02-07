import game    from 'core/game'
import { FRAME_STAR } from 'common/data';
import { px } from 'core/filters';

export default class StarCounter {
  private stage   : any
  private group   : Phaser.Group
  private sprites : Array<Phaser.Sprite>
  private counter : number

  create(stage, x : number, y : number) {
    this.stage = stage
    this.group = game.add.group()
    this.group.x = x
    this.group.y = y
    this.sprites = []
    this.sprites[0] = game.make.sprite(x       , y       , `star_counter`,0)
    this.sprites[1] = game.make.sprite(x+px(18), y       , `star_counter`,6)
    this.sprites[2] = game.make.sprite(x       , y+px(17), `star_counter`,0)
    this.sprites[3] = game.make.sprite(x+px(18), y+px(17), `star_counter`,6)

    this.group.add(this.sprites[0])
    this.group.add(this.sprites[1])
    this.group.add(this.sprites[2])
    this.group.add(this.sprites[3])

    this.counter = 0
  }

  update() {
    if (this.counter > FRAME_STAR.length){
      this.counter = 0
    } else {
      this.counter++
    }
  }

  render() {
    this.sprites[0].frame = this.stage.rounds_won[0] > 0 ? FRAME_STAR[this.counter] : 0
    this.sprites[2].frame = this.stage.rounds_won[0] > 1 ? FRAME_STAR[this.counter] : 0
    this.sprites[1].frame = this.stage.rounds_won[1] > 0 ? FRAME_STAR[this.counter] + 6: 6
    this.sprites[3].frame = this.stage.rounds_won[1] > 1 ? FRAME_STAR[this.counter] + 6: 6
  }
}
