import { PANELS } from 'core/data';

export default function levels() {
  const _ = 0;   // empty panel
  const b = 1;      // blue
  const g = 2;      // green
  const p = 3;      // purple
  const r = 4;      // red
  const y = 5;      // yellow

  /**
   * private method to help with array creation
   * @param {Array} old_array array to enhance with _ spaces
   * @param {Array} combined arrays
   */
  var fill = function(old_array) {
    // spawns nulls until the last 6 lines were chosen
    let new_array = new Array((PANELS - old_array.length)).fill(_);
    return new_array.concat(old_array);
  }

  // each new {} inside is a new level
  this.puzzle_levels = [
    // stage 1 - 01
    {
      panels: fill([
        _, r, _, r, r, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, _, _, _,
        _, b, b, _, b, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, g, r, _, _,
        _, _, r, g, _, _,
        _, _, r, g, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, y, _, _,
        _, _, b, y, _, _,
        _, _, y, b, _, _,
        _, _, b, y, _, _,
        _, _, b, y, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, g, _, _, _,
        g, g, b, _, b, b
      ]),
      steps: 1
    },

    {
      panels: fill([
        r, r, p, r, p, p
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, b, _, _, _,
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, b, b, _, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, _, _, y, _,
        _, _, _, _, y, _,
        _, p, p, y, p, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, b, _, _, _,
        _, _, g, b, _, _,
        _, _, g, g, b, _
      ]),
      steps: 1
    },

    {
      panels: fill([
        _, _, y, r, _, _,
        _, _, r, y, _, _,
        _, _, y, r, _, _,
        _, _, r, y, _, _,
        _, _, y, r, _, _
      ]),
      steps: 3
    },

    // stage 2 - 01
    {
      panels: fill([
        _, _, y, _, _, _,
        _, _, r, _, _, _,
        _, _, r, _, _, _,
        _, _, y, _, _, _,
        _, _, r, y, y, _
      ]),
      steps: 1
    }
  ]
}
