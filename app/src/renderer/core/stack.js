module.exports = function(game) {
	const APP = require('../../../app')('../../../');
	const {
		COLS, 
		ROWS, 
		PANELS
	} = require(APP.path.core('data'));
	const _f = require(APP.path.core('filters'));
  const ss = require('shuffle-seed');
	
	/** 
	 * Creates a randomized 1d Array with numbers 
	 * that can be assigned to a Stack to form all Sprites
	 * The Algorithm creates the Numbers carefully so 
	 * no combos are done once finished
	 */
	class Stack {
		/** Panels Array that saves the numbers being generated 
		 * @param {object} rng seed that the randomness is based on 
		 */
		constructor(rng) {
			this.create = this.create.bind(this);
			this.setArrayToSize = this.setArrayToSize.bind(this);
			this.logArrayLikeAPlayfield = this.logArrayLikeAPlayfield.bind(this);

			this.rng = rng;
			this.panels = 0;

			// null block generation
			this.kinds = [0, 1, 2, 3, 4, 5];
			this.wellArray = [];
			this.chipArray = [];
		}

		/**
		 * from top to bottom creation of all playfields stack sprites
     * numbers are being generated - regenerated if recent numbers are the same
		 * @param {object} object of parameters, so you now what youre changing to what 
		 */
		create({ range = 5, ground = 1, wells = "average", chips = "average" }) {
			this.panels = new Array(PANELS).fill(null);

			this.wellArray = this.setArrayToSize({ noun: wells, lowest: 10, average: 20, highest: 40});
			this.chipArray = this.setArrayToSize({ noun: chips, lowest: 2, average: 4, highest: 8 });
			
      // fill with nulls so empty space will result in unvisible blocks
      let savedNumbers = new Array(PANELS).fill(null);
			let lastNumber = -1;
			
			// generate numbers from top range to bottom
      for (var i = (PANELS - range * COLS); i < PANELS; i++) {
        let currentNumber = ss.shuffle(this.kinds, this.rng())[0];

        // x and y pos to move in the array and detect things
        let indexes = _f.i2xy(i);

        // save the top number, if top number is set the number below it should never be the same
        let topNumber = savedNumbers[_f.xy2i(indexes[0], indexes[1] - 1)];

				// random chance that currentnumber is simply null
				if (this.wellArray.length != 1) 							// only if wellArray size has been set
					if (i < (PANELS - ground * COLS))						// only generate nulls above ground
						if (ss.shuffle(this.wellArray, this.rng())[0] == 1) 
							currentNumber = null;

				// random chance to have null blocks through chips sets created
				if (this.chipArray.length != 1) 
					if (i < PANELS - ((range - 1) * COLS))		// chips are only the top layer
						if (ss.shuffle(this.chipArray, this.rng())[0] == 1)
							currentNumber = null;

				// if x = 0 we dont need to detect the left neighbor color so we set last to something different
				if (indexes[0] == 0) 
					lastNumber == -1;

				// generate new number until currentNumber is unique
				// not when its already null, do when its top / last number is same
				while (currentNumber != null &&
							 currentNumber == topNumber ||
							 currentNumber == lastNumber) {
					currentNumber = ss.shuffle(this.kinds, this.rng())[0];
				}

				// set last number and send current to array
        lastNumber = currentNumber;
        savedNumbers[i] = currentNumber;
			}

			// nullifyBlocksAboveNulls
			for (var i = PANELS; i > 0; i--)
				if (savedNumbers[i] === null) 		// important === ... == caused bugs
					savedNumbers[i - COLS] = null;

			this.panels = savedNumbers;
		}

		/**
		 * sets an Array to a size acording to prechosen sizes 
		 * @param {object} noun and supposed to be array sizes, the larger the less chances
		 * @returns {Array} 
		 */
		setArrayToSize({noun, lowest, average, highest}) {
			let size = 0;
			
			switch (noun) {
				case "none": break;
			
				case "many":
					size = lowest; 
					break;

				case "average": 
					size = average;
					break;

				case "few": 
					size = highest;
					break;

				default: console.log("not existing statement sent"); break;
			}

			// set space for wellArray
			let arr = new Array(size).fill(0);
			arr[0] = 1;

			return arr;
		}

		/**
		 * logs the array created in a readable way for debugging purposes
		 * @param {Array} arrayToLog 1d array of numbers/elements
		 */
    logArrayLikeAPlayfield(arrayToLog) {
      for (var i = 0; i < ROWS; i++) {
        let str = "";

        for (var j = 0; j < COLS; j++)
          str += arrayToLog[_f.xy2i(j, i)] + "  ";

        console.log(str);
      }
    }
	}

	return Stack;
}
