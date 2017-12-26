export const ROWS_INV = 12;
export const ROWS_VIS = 11;
export const ROWS = ROWS_INV + ROWS_VIS;
export const COLS = 6;
export const PANELS = ROWS * COLS;

export const STOPTIME = 60 * 3;

/** Number of starting blocks. */
export const NRBLOCK = 17;

// States
export const STATIC = Symbol('static');
export const HANG = Symbol('hang');
export const FALL = Symbol ('fall');
export const LAND = Symbol('land');
export const SWAP_L = Symbol('swap_l');
export const SWAP_R = Symbol('swap_r');
export const SWAPPING_L = Symbol('swaping_l');
export const SWAPPING_R = Symbol('swaping_r');
export const CLEAR = Symbol('clear');
export const GARBAGE = Symbol('garbage');
// STAGE States
export const STARTING = Symbol('starting');
export const RUNNING  = Symbol('running');
export const PAUSE    = Symbol('pause');
export const GAMEOVER = Symbol('gameover');

// COUNTDOWN States
export const MOVING = Symbol('moving')
export const COUNT3 = Symbol('3')
export const COUNT2 = Symbol('2')
export const COUNT1 = Symbol('1')
export const DONE   = Symbol('done')

// Garbage Kinds
export const COMBO = Symbol('combo');
export const CHAIN = Symbol('chain');

// Animation Frame
export const FRAME_CLEAR_PARTICLE     = [1,0,1,0,1 ,1 ,0 ,1 ,2 ,2 ,3 ,3 ,3 ,4 ,4 ,5 ,5 ,6 ,6 ,6 ,7 ,7 ,7 ,7 ,7 ]
export const ANIM_CLEAR_PARTICLE_MOVE = [4,6,9,9,10,11,11,12,12,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14]



export const FRAME_LAND = [4, 4, 4, 2, 2, 2, 3, 3, 3, 0];
export const FRAME_CLEAR = [5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
                            5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
                            5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0,
                            5, 0, 5, 0, 5, 0, 5, 0, 6, 6, 6, 6,
                            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
export const FRAME_LIVE = 0;
export const FRAME_DANGER = [0, 0, 0, 0,
                             2, 2, 2, 2,
                             0, 0, 0, 0,
                             3, 3, 3, 3,
                             4, 4, 4, 4];
export const FRAME_DEAD = 6;
export const FRAME_NEWLINE = 1;
export const FRAME_STAR = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1];

// Timing
/** The time it takes before the first panel is ready to start popping. */
export const TIME_CLEAR = 60;
/** When a panel is ready to pop is needs to wait for time_pop before popping. */
export const TIME_POP = 9;
/** How long to wait after popping last panel before panel falls. */
export const TIME_FALL = 3;
export const TIME_SWAP = 4;
export const TIME_PUSH = 1000;
/** The time the particle stays on the screen for. */
export const TIME_CLEAR_PARTICLE = FRAME_CLEAR_PARTICLE.length;
export const TIME_GARBAGE_CLEAR = 30;
export const TIME_GARBAGE_POP = 12;

export const UNIT = 32;
export const WIN_WIDTH = 398 * 2; // 256
export const WIN_HEIGHT = 224 * 2;

export const MENUCURSORBLINK = 12;

export const STARTPOS_PANELCURSOR_SPEED = 6;
export const PLAYFIELD_CURSOR_SPEED = 10;

export const GARBAGE_SHAKE = [
  [
    1, 1, 1,
    2, 2, 2,
    1, 1, 1,
    0, 0, 0,
    -1, -1, -1,
    0, 0, 0
  ]
];

export const WALL_ROLLUP = [
  0, 1, 0, 1, 0, 1, 0, 2, 0, 2, 0,
  2, 0, 3, 3, 0, 3, 0, 4, 4, 0,
  4, 0, 5, 5, 0, 5, 0, 6, 0, 6,
  0, 7, 7, 0, 7, 0, 0, 8, 0, 0,
  8, 0, 0, 8, 0, 9, 9, 0, 16, 32,
  48, 64, 80, 96, 112, 128, 144, 160, 176, 192,
  192, 188, 185, 185, 188, 192, 192, 189, 187, 187,
  189, 192, 192, 190, 189, 189, 190, 192, 192, 190,
  192, 190, 192, 191, 192, 191, 192, 191, 192
];

export const BAUBLE_FLOAT = [
  -1, -1, 0, 1, 2, 3, 4,
  4, 5, 5, 6, 6, 7,
  7, 8, 8, 8, 9, 9,
  9, 9, 9, 10, 10,
  10, 10, 10, 10, 10,
  10, 10, 10, 10, 10,
  10, 10, 10, 11, 11,
  11, 11, 11
];
