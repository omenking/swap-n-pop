import game from 'core/game'
import * as ss   from 'shuffle-seed'
import { 
  COLS, 
  PANELS, 
  ROWS, 
  ROWS_VIS, 
  PANEL_COLORS, 
  NUMBER_COLORS_VS 
} from 'common/data';
import { i2xy, xy2i } from 'core/filters';

/**
_ready() {
	randomize()

	let dims = Vector2(6, 2)

	for i in range(0, 10) {
		let rows = create_rows(dims)

		print_numbers(rows, dims.y)
		check_previous_numbers(rows, dims)
		check_above_numbers(rows, dims)
		print("-")
test code"""*/

export default class PanelGenerator {
  // reference to now about the playfields level
  // the level will be used to now how many numbers or colors should exist
  // to be generated in general
  public playfield = null
  public rng : any

  // create reference
  create(playfield) {
    this.playfield = playfield
    this.rng = playfield.stage.rng
  }

  // returns a stack of PANELS where no numbers are the same next to each other
  // also nulls PANELS randomly and creates holes throughout the stack
  // also has zones in which all PANELS will definitely be nulled
  // and a safe zone where no nulling happens
  create_stack(safe: number = 8, nulling: number = 5) : Array<number> {
    let safe_zone = safe * COLS
    let nulling_zone = nulling * COLS

    // empty array to destined length
    let size = PANELS - ROWS_VIS * COLS
    let nums = Array(size)
    
    // scoped previous number that saves the newest generated number
    let prev_before = null
    
    for (let rev = 0; rev < size; rev++) {
      let i = size - rev - 1
      let new_num = 0
      let bot_num = null // by default null
      let skip = false
      
      // set bot_num once it respects the boundaries
      if (i < size - COLS) {
        bot_num = nums[i + COLS]
      
        // if bot_num is null just set new_num to null and skip everything
        if (bot_num === null) {
          skip = true
          new_num = null
        }
      }

      if (!skip) {
        // when over start go through
        if (i !== 0) {
          // if the right wall is hit (after i * 6) then be true
          if (i % COLS + 1 !== 0) {
            new_num = this.get_number_in_zone(prev_before, bot_num, i, safe_zone, nulling_zone)
          }
          else {
            // otherwhise only care about bot_number if it exists
            new_num = this.get_number_in_zone(null, bot_num, i, safe_zone, nulling_zone)
          }
        }
      }
      else {
        // at start just generate a number
        new_num = this.get_number_in_zone(null, null, i, safe_zone, nulling_zone)
      }
          
      prev_before = new_num
      nums[i] = new_num

    }
    
    return nums
  }

  // creats rows defined by the size of the dimensions parameter,
  // the generated array will not have any same numbers next to each number
  // be it right to left or up and down
  create_rows(dimensions = {x: 6, y: 1}) {
    let size = dimensions.x * dimensions.y

    // empty array to destined length
    let generated_rows = Array(size)
    
    // scoped previous number that saves the newest generated number
    let prev_before = null
    
    for (let rev = 0; rev < size; rev++) {
      let i = size - rev - 1
      let new_num = 0
      let bot_num = null // by default null

      // set bot_num once it respects the boundaries
      if (i < size - COLS) 
        bot_num = generated_rows[i + COLS]

      // when over start go through
      // if the right wall is hit (after i * 6) then be true
      if (i % COLS + 1 !== 0) 
        new_num = this.get_number(prev_before, bot_num)
      else {
        // otherwhise only care about bot_number if it exists
        new_num = this.get_number(null, bot_num)
      }
          
      prev_before = new_num
      generated_rows[i] = new_num
    }

    return generated_rows
  }

  // returns a randomly chosen number out of an array,
  // erases contents of the inside array if conditions are provided
  get_number(cond1: any = null, cond2: any = null) : number {
    let numbers = Array.from(PANEL_COLORS[NUMBER_COLORS_VS[this.playfield.level]])
    
    if (cond1 != null) 
      numbers = numbers.filter(condition => condition === cond1)
    
    if (cond2 != null) 
      numbers = numbers.filter(condition => condition === cond2)
    
    return ss.shuffle(numbers, this.rng())[0]
  }

  // returns a randomly chosen number out of an array, 
  // you can erase contens inside by spefifying them in the parameters
  // otherwhise theyll remain available to be chosen randomly
  get_number_in_zone(cond1, cond2, iterator, safe_zone, null_zone) {
    let numbers = Array.from(PANEL_COLORS[NUMBER_COLORS_VS[this.playfield.level]])
    numbers.push(null)
    
    if (iterator <= null_zone) 
      return null
    
    if (safe_zone <= iterator) 
      numbers = numbers.filter(condition => condition === null)
    
    if (cond1 != null) 
      numbers = numbers.filter(condition => condition === cond1)
      
    if (cond2 != null) 
      numbers = numbers.filter(condition => condition === cond2)
    
    return ss.shuffle(numbers, this.rng())[0]
  }

  // print like a playfield stack
  print_numbers(nums, dimensions_y) {
    for (let j = 0; j < dimensions_y; j++) {
      j *= 6
      console.log(
        nums[j + 0], nums[j + 1], 
        nums[j + 2], nums[j + 3], 
        nums[j + 4], nums[j + 5]
      )
    }
  }

  // checks wether any nearing wall PANELS can have the same kind
  check_previous_numbers(nums, dimensions) {
    let size = dimensions.x * dimensions.y

    for (let i = 0; i < size - 1; i++) 
      if (nums[i] === nums[i + 1]) 
        console.log(i, "Jumper", nums[i], nums[i + 1])
  }

  // check for any same kinds over each number	
  check_above_numbers(nums, dimensions) {
    let size = dimensions.x * dimensions.y

    for (let i = COLS; i < size; i++) 
      if (nums[i] === nums[i - COLS])
        console.log(i, "above", nums[i], nums[i - COLS]) 
  }
}
