module.exports = function(game) {
	const APP = require('../../../app')('../../../');
	const {
		COLS, 
		ROWS, 
		PANELS
	} = require(APP.path.core('data'));
	const _f = require(APP.path.core('filters'));

	/** 
	 * Creates a randomized 1d Array with numbers 
	 * that can be assigned to a Stack to form all Sprites
	 * The Algorithm creates the Numbers carefully so 
	 * no combos are done once finished
	 */
	class stackTwo {
		/** bindings */
		constructor() {
			this.create = this.create.bind(this);
			this.logPanelsLikeBlocks = this.logPanelsLikeBlocks.bind(this);
		
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
      var amountOfSprites = 5;

      // fill with nulls so empty space will result in unvisible blocks
      var savedNumbers = new Array(PANELS).fill(null);

      for (var i = range * COLS; i < PANELS; i++) {
        let currentNumber = game.rnd.integerInRange(0, amountOfSprites);

        // x and y pos to move in the array and detect things
        let indexes = _f.i2xy(i);

        // save the top number, if top number is set the number below it should never be the same
        let topNumber = savedNumbers[_f.xy2i(indexes[0], indexes[1] - 1)];

        // if x = 0 we dont need to detect the left neighbor color so we set last to something different
        if (indexes[0] == 0) 
          lastNumber == -1;

        // generate new number until currentNumber is unique
        while (currentNumber == topNumber ||
               currentNumber == lastNumber) {
          currentNumber = game.rnd.integerInRange(0, amountOfSprites);
        }

				/* well testing!! currently bugging
				// at a given parameter replace current with null
				if (game.rnd.integerInRange(0, wellPercentage) == 0) 
					currentNumber = null;
				*/
				
				// set last number and send current to array
        lastNumber = currentNumber;
        savedNumbers[i] = currentNumber;
			
				/*
				// if topNumber was actually null, set this too
				if (topNumber == null) {
					currentNumber = null;
					savedNumbers[i] = null;
				}*/
			}

			this.panels = savedNumbers;
			this.logPanelsLikeBlocks();
		}

		/** logs the this.panels created in a game stack readable way for debug */
    logPanelsLikeBlocks() {
      for (var i = 0; i < ROWS; i++) {
        let str = "";

        for (var j = 0; j < COLS; j++) {
          
          str += this.panels[_f.xy2i(j, i)] + "  ";
        }

        console.log(str);
      }
    }
	}

	return stackTwo;
}