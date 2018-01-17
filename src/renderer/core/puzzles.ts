import { PANELS } from 'common/data'
const _ = null // empty panel
const b = 0 // blue
const g = 1 // green
const p = 2 // purple
const r = 3 // red
const y = 4 // yellow

/**
 * private method to help with array creation
 * @param {Array} old_array array to enhance with _ spaces
 * @param {Array} combined arrays
 */
function fill(arr) {
  return new Array((PANELS - arr.length))
    .fill(_)
    .concat(arr)
}

export default [
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
