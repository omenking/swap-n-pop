module.exports = {
  VERSION_MAJOR: 0,
  VERSION_MINOR: 1,
  VERSION_PATCH :0,
  PUZZLE: {
    test: [
      null, null, 2, null, null, null,
      null, null, 2, null, null, null,
      null, null, 3, null, null, null,
      null, null, 3, null, null, null,
      null, null, 1, null, null, null,
      null, null, 1, null, null, null,
      null, null, 1, null, null, null,
      null, null, 3, null, null, null,
      null, null, 2, null, null, null
    ],
    skill_chain_demo_2: {
      demo_4: [
        null, null, 5, 2, 2, null,
        null, null, 2, 5, 0, null,
        null, null, 4, 2, 4, null,
        null, 3   , 5, 2, 3, null,
        null, 3   , 0, 4, 0, null,
        null, 5   , 5, 3, 4, null,
        2   , 3   , 2, 5, 3, 4
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
  // Animation Frame
  FRAME_LAND    : [4,4,4,2,2,2,3,3,3,0],
  FRAME_CLEAR   : [6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,6,0,6,0,
                   6,0,6,0,6,0,6,0,5,5,5,5,
                   5,5,5,5,5,5,5,5,5,5,5,5],

  FRAME_LIVE    :  0,
  FRAME_DANGER  : [0,4,0,3,2,3],
  FRAME_DEAD    : 5,
  FRAME_NEWLINE : 1,

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
