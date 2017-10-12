const N = null
module.exports = {
  ROWS: 11,
  COLS: 6,
  PANELS: 66,

  //number of starting blocks
  NRBLOCK : 17,
  // States
  STATIC     : 0,
  HANG       : 1,
  FALL       : 2,
  LAND       : 3,
  SWAP_L     : 4,
  SWAP_R     : 5,
  SWAPPING_L : 6,
  SWAPPING_R : 7,
  CLEAR      : 8,
  POPPING    : 9,
  GARBAGE    : 10,
  // Animation Frame
  FRAME_LAND    : [4,4,4,2,2,2,3,3,3,0],
  FRAME_CLEAR   : [6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,5,5,5,5,
                   5,5,5,5,5,5,5,5,5,5,5,5],

  FRAME_LIVE    :  0,
  FRAME_DANGER  : [0,0,0,
                   2,2,2,
                   0,0,0,
                   3,3,3,
                   4,4,4],
  FRAME_DEAD    : 5,
  FRAME_NEWLINE : 1,

  FRAME_STAR: [1,1,2,2,3,3,4,4,5,5,5,5,5,5,4,4,3,3,2,2,1,1,1,1,1,1,1],

  // Timing
  TIME_CLEAR : 60, //the time it takes before the first panel is ready to start popping
  TIME_POP   : 9,  //when a panel is ready to pop is needs to wait for time_pop before popping
  TIME_FALL  : 3,  //how long to wait after popping last panel before panel falls
  TIME_SWAP : 4,
  TIME_PUSH : 1000,

  UNIT : 16,
  WIN_WIDTH  : 256,
  WIN_HEIGHT : 224,

  MENUCURSORBLINK : 12,

  STARTPOS_PANELCURSOR_SPEED : 6,

  WALL_ROLLUP: [
    0,1,0,1,0,1,0,2,0,2,0,
    2,0,3,3,0,3,0,4,4,0,
    4,0,5,5,0,5,0,6,0,6,
    0,7,7,0,7,0,0,8,0,0,
    8,0,0,8,0,9,9,0,16,32,
    48,64,80,96,112,128,144,160,176,192,
    192,188,185,185,188,192,192,189,187,187,
    189,192,192,190,189,189,190,192,192,190,
    192,190,192,191,192,191,192,191,192
  ],

  BAUBLE_FLOAT: [
    -1,-1,0,1,2,3,4,
    4,5,5,6,6,7,
    7,8,8,8,9,9,
    9,9,9,10,10,
    10,10,10,10,10,
    10,10,10,10,10,
    10,10,10,11,11,
    11,11,11
  ]

}
