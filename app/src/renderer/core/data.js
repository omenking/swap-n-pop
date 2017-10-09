const N = null
module.exports = {
  PUZZLE: {
    test: [
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, N, N, N, N,
      N, N, 1, N, N, N,
      N, N, 2, N, N, N,
      N, N, 2, N, N, N,
      N, 1, 2, 1, N, N
    ],
    skill_chain_demo_2: {
      demo_4: [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, 5, 2, 2, N,
        N, N, 2, 5, 0, N,
        N, N, 4, 2, 4, N,
        N, 3, 5, 2, 3, N,
        N, 3, 0, 4, 0, N,
        N, 5, 5, 3, 4, N,
        2, 3, 2, 5, 3, 4
      ]
    }
  },
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
                   4,4,4,
                   0,0,0,
                   3,3,3,
                   2,2,2,
                   3,3,3],
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
  ],


  // scan bottom to top, left to right.
  // I was too lazy to use math so I wrote out
  // the indexes by hand.
  SCAN_BTLR : [60,54,48,42,36,30,24,18,12,6 ,0,
               61,55,49,43,37,31,25,19,13,7 ,1,
               62,56,50,44,38,32,26,20,14,8 ,2,
               63,57,51,45,39,33,27,21,15,9 ,3,
               64,58,52,46,40,34,28,22,16,10,4,
               65,59,53,47,41,35,29,23,17,11,5]

}
