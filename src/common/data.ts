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
// WALL States
export const ROLLUP   = 'rollup'
export const ROLLDOWN = 'rolldown'
export const WAIT     = 'wait'

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

// Timing TODO: phase out single values in favour of difficulty-oriented tables
/** The time it takes before the first panel is ready to start popping. */
export const TIME_CLEAR = 60;
/** When a panel is ready to pop is needs to wait for time_pop before popping. */
export const TIME_POP = 9;
/** How long to wait after popping last panel before panel falls. */
export const TIME_FALL = 3;
export const TIME_SWAP = 4;


export const TIME_WALL_WAIT = 60 * 3

export const TIME_PUSH = 1000;
/** The time the particle stays on the screen for. */
export const TIME_CLEAR_PARTICLE = FRAME_CLEAR_PARTICLE.length;
export const TIME_GARBAGE_CLEAR = 30;
export const TIME_GARBAGE_POP = 12;
// time it takes for garbage payload to arrive to garbage thumb
export const TIME_PARTICLE_GARAGE = 40

// ENDLESS MODE:
// Some of these values seem to be off in panel attack's globals file (tested in emu, but double check later)
export const ENDLESS_HOVER = [12,  9,  6]
export const ENDLESS_FACE  = [25, 20, 15]
export const ENDLESS_FLASH = [44, 36, 28]
export const ENDLESS_POP   = [ 9,  8,  7]

export const STOP_TIME_COMBO = [120, 120, 120]
export const STOP_TIME_CHAIN = [300, 180, 120]
export const STOP_TIME_DANGER= [600, 420, 240]

// NOTE: these values must be divided by 16 when read (hard-code? ask sharpobject why it was set up like this)
export const SPEED_TO_RISE_TIME = [
    942, 983, 838, 790, 755, 695, 649, 604, 570, 515,
    474, 444, 394, 370, 347, 325, 306, 289, 271, 256,
    240, 227, 213, 201, 189, 178, 169, 158, 148, 138,
    129, 120, 112, 105,  99,  92,  86,  82,  77,  73,
     69,  66,  62,  59,  56,  54,  52,  50,  48,  47,
     47,  47,  47,  47,  47,  47,  47,  47,  47,  47,
     47,  47,  47,  47,  47,  47,  47,  47,  47,  47,
     47,  47,  47,  47,  47,  47,  47,  47,  47,  47,
     47,  47,  47,  47,  47,  47,  47,  47,  47,  47,
     47,  47,  47,  47,  47,  47,  47,  47,  47 
 ]
     
// Endless *AND* 1P Time Attack increase speed level based on number of panels cleared
export const PANELS_TO_NEXT_SPEED = [
   9, 12, 12, 12, 12, 12, 15, 15, 18, 18,
  24, 24, 24, 24, 24, 24, 21, 18, 18, 18,
  36, 36, 36, 36, 36, 36, 36, 36, 36, 36,
  39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
  45, 45, 45, 45, 45, 45, 45, 45, Infinity
]

// VS and 2P Time Attack increase speed level once every 15 seconds
// Additionally, instead of 3 difficulties, they have 10 levels
export const LEVEL_TO_STARTING_SPEED    = [  1,  5,  9, 13, 17, 21, 25, 29, 27, 32]
export const LEVEL_TO_HANG_TIME         = [121,100, 80, 65, 50, 40, 30, 20, 10,  1]
export const LEVEL_TO_NCOLORS_VS        = [  5,  5,  5,  5,  5,  5,  5,  5,  6,  6]
export const LEVEL_TO_NCOLORS_TA        = [  5,  5,  6,  6,  6,  6,  6,  6,  6,  6]
export const LEVEL_TO_HOVER             = [ 12, 12, 11, 10,  9,  6,  5,  4,  3,  6]
export const LEVEL_TO_POP               = [  9,  9,  8,  8,  8,  8,  8,  7,  7,  7]
export const LEVEL_TO_FLASH             = [ 44, 44, 42, 42, 38, 36, 34, 32, 30, 28]
export const LEVEL_TO_FACE              = [ 15, 14, 14, 13, 12, 11, 10, 10,  9,  8]
export const LEVEL_TO_COMBO_CONSTANT    = [ 20,-16,-12, -8, -3,  2,  7, 12, 17, 22]
export const LEVEL_TO_COMBO_COEFFICIENT = [ 20, 18, 16, 14, 12, 10,  8,  6,  4,  2]
export const LEVEL_TO_CHAIN_CONSTANT    = [ 80, 77, 74, 71, 68, 65, 62, 60, 58, 56]
export const LEVEL_TO_CHAIN_COEFFICIENT = [ 20, 18, 16, 14, 12, 10,  8,  6,  4,  2]

// Scoring
export const SCORE_COMBO = [0,    0,    0,   20,   30,
                           50,   60,   70,   80,  100,
                          140,  170,  210,  250,  290,
                          340,  390,  440,  490,  550,
                          610,  680,  750,  820,  900,
                          980, 1060, 1150, 1240, 1330]

export const SCORE_CHAIN = [0,   50,   80,  150,  300,
                          400,  500,  700,  900, 1100,
                         1300, 1500, 1800]

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
