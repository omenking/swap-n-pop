console.log('pp',process.env.NODE_ENV)
let _env;
let _host;
if        (process.env.NODE_ENV === 'production') {
  _env  = 'production'
  _host = 'http://www.swapnpop.com'
} else if (process.env.NODE_ENV === 'development') {
  _env  = 'development'
  _host = 'http://localhost:3000'
}

export const ENV  = _env
export const HOST = _host
export const ROWS_INV = 12;
export const ROWS_VIS = 11;
export const ROWS = ROWS_INV + ROWS_VIS;
export const COLS = 6;
export const PANELS = ROWS * COLS;

export const STOPTIME = 60 * 3;

/** Number of starting blocks. */
export const NRBLOCK = 17;

// States
export const STATIC     = 'static'
export const HANG       = 'hang'
export const FALL       = 'fall'
export const LAND       = 'land'
export const SWAP_L     = 'swap_l'
export const SWAP_R     = 'swap_r'
export const SWAPPING_L = 'swaping_l'
export const SWAPPING_R = 'swaping_r'
export const CLEAR      = 'clear'
export const GARBAGE    = 'garbage'
// STAGE States
export const STARTING = 'starting'
export const RUNNING  = 'running'
export const PAUSE    = 'pause'
export const GAMEOVER = 'gameover'

// COUNTDOWN States
export const MOVING = 'moving'
export const COUNT3 = '3'
export const COUNT2 = '2'
export const COUNT1 = '1'
export const DONE   = 'done'

// Garbage Kinds
export const COMBO = 'combo'
export const CHAIN = 'chain'

// Animation Frame
export const FRAME_CLEAR_PARTICLE     = [1,0,1,0,1 ,1 ,0 ,1 ,2 ,2 ,3 ,3 ,3 ,4 ,4 ,5 ,5 ,6 ,6 ,6 ,7 ,7 ,7 ,7 ,7 ]
export const ANIM_CLEAR_PARTICLE_MOVE = [4,6,9,9,10,11,11,12,12,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14]

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
// time it takes for garbage payload to arrive to garbage thumb
export const TIME_PARTICLE_GARAGE = 40

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
