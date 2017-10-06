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
		/**
		 * Panels Array that saves the numbers being generated 
		 * 
		 * 
		 * @param {object} rng seed that the randomness is based on 
		 */
		constructor(rng) {
			this.create = this.create.bind(this);
			this.logArrayLikeAPlayfield = this.logArrayLikeAPlayfield.bind(this);
		
			this.rng = rng;
			this.panels = 0;
		}

		/**
     * from top to bottom creation of all playfields stack sprites
     * numbers are being generated - regenerated if recent numbers are the same
     * @param {integer} range 
     */
		create(range, wellPercentage) {
			this.panels = new Array(PANELS).fill(null);

			var lastNumber = -1;
			var amountOfSprites = [0, 1, 2, 3, 4];

			var amountOfWellSpace = new Array(wellPercentage).fill(0);
			amountOfWellSpace[0] = 1;

      // fill with nulls so empty space will result in unvisible blocks
      var savedNumbers = new Array(PANELS).fill(null);

      for (var i = range * COLS; i < PANELS; i++) {
        let currentNumber = ss.shuffle(amountOfSprites, this.rng())[0];

        // x and y pos to move in the array and detect things
        let indexes = _f.i2xy(i);

        // save the top number, if top number is set the number below it should never be the same
        let topNumber = savedNumbers[_f.xy2i(indexes[0], indexes[1] - 1)];

				// random chance that currentnumber is simply null
				if (ss.shuffle(amountOfWellSpace, this.rng())[0] == 1) 
					currentNumber = null;
				
					// if x = 0 we dont need to detect the left neighbor color so we set last to something different
				if (indexes[0] == 0) 
					lastNumber == -1;

				// generate new number until currentNumber is unique
				// not when its already null, do when its top / last number is same
				while (currentNumber != null &&
								currentNumber == topNumber ||
								currentNumber == lastNumber) {
					currentNumber = ss.shuffle(amountOfSprites, this.rng())[0];
				}

				// set last number and send current to array
        lastNumber = currentNumber;
        savedNumbers[i] = currentNumber;
			}

			this.logArrayLikeAPlayfield(savedNumbers);

			/* not currently working, gotta sleep
			for (var i = PANELS; i > 0; i--) {
				if (savedNumbers[i] == null) {
					savedNumbers[i - COLS] = null;
				}
			}*/

			this.panels = savedNumbers;
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