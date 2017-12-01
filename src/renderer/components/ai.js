import game from 'core/game'

export default class ComponentAi {
  create(playfield, cursor) {
    this.playfield = playfield;
    this.cursor = cursor;
    return this.plan = false;
  }

  update() {
    this.cursor.mv_up();

    if (this.plan === false) {
      const stack = [];
      for (let x = 0, end = this.playfield.rows, asc = 0 <= end; asc ? x < end : x > end; asc ? x++ : x--) {
        for (let y = 0, end1 = this.playfield.cols, asc1 = 0 <= end1; asc1 ? y < end1 : y > end1; asc1 ? y++ : y--) {
          const panel = this.playfield.stack[x][y];
          stack.push(panel.i);
        }
      }
      console.log('ai stack', stack);
    }
    return this.plan = true;
  }
}
