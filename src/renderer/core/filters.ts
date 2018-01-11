import { COLS, ROWS } from 'core/data';

/* upscale base pixels to the correct size */
export function px(px: number): number {
  return px * 2;
}

export function i2xy(i: number): number[] {
  const y = Math.floor(i / COLS);
  const x = i % COLS;

  return [x, y];
}

export function xy2i(x: number, y: number): number {
  // x left-right
  // y top-down
  return (y * COLS) + x;
}

export function stack_log(s: number[]) {
  console.log('   -','0', '1', '2', '3', '4', '5');
  console.log(' 0 -',s[0] ,s[1] ,s[2] ,s[3] ,s[4] ,s[5]);
  console.log(' 1 -',s[6] ,s[7] ,s[8] ,s[9] ,s[10],s[11]);
  console.log(' 2 -',s[12],s[13],s[14],s[15],s[16],s[17]);
  console.log(' 3 -',s[18],s[19],s[20],s[21],s[22],s[23]);
  console.log(' 4 -',s[24],s[25],s[26],s[27],s[28],s[29]);
  console.log(' 5 -',s[30],s[31],s[32],s[33],s[34],s[35]);
  console.log(' 6 -',s[36],s[37],s[38],s[39],s[40],s[41]);
  console.log(' 7 -',s[42],s[43],s[44],s[45],s[46],s[47]);
  console.log(' 8 -',s[48],s[49],s[50],s[51],s[52],s[53]);
  console.log(' 9 -',s[54],s[55],s[56],s[57],s[58],s[59]);
  console.log('10 -',s[60],s[61],s[62],s[63],s[64],s[65]);
}

export function out_of_bounds(x: number, y: number): boolean {
  return x < 0 || x > (COLS-1) ||
         y < 0 || y > (ROWS-1);
}
