//log_stack(tick,format=null) {
  //this.roll_log_heading.push({tick: tick, format: format})
  //for (let i = 0; i < ROWS; i++){
    //let line = ''
    //line += this.playfield0._stack[0+(i*COLS)].log()
    //line += this.playfield0._stack[1+(i*COLS)].log()
    //line += this.playfield0._stack[2+(i*COLS)].log()
    //line += ' '
    //line += this.playfield0._stack[3+(i*COLS)].log()
    //line += this.playfield0._stack[4+(i*COLS)].log()
    //line += this.playfield0._stack[5+(i*COLS)].log()
    //line += '  '
    //line += this.playfield1._stack[0+(i*COLS)].log()
    //line += this.playfield1._stack[1+(i*COLS)].log()
    //line += this.playfield1._stack[2+(i*COLS)].log()
    //line += ' '
    //line += this.playfield1._stack[3+(i*COLS)].log()
    //line += this.playfield1._stack[4+(i*COLS)].log()
    //line += this.playfield1._stack[5+(i*COLS)].log()
    //if (this.roll_log_data[i] === undefined){
      //this.roll_log_data[i] = []
    //}
    //this.roll_log_data[i].push(line)
  //}
//}

//log_roll() {
  //let str    = ""
  //let format = null
  //let tick   = null

  //str   += "\n"
  //for (let i = 0; i < this.roll_log_heading.length; i++){
    //tick   = `${this.roll_log_heading[i].tick}`
    //tick   = tick.substr(0,22)
    //format = this.roll_log_heading[i].format
    //str += tick
  //}

  //for (let i = 0; i < ROWS; i++){
    //str   += "\n"

    //if (Math.floor(ROWS/2) === i) {
      //for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
        //format = this.roll_log_heading[ii].format
        //str += this.roll_log_data[i][ii]
        //if (ii < this.roll_log_data[i].length-1){
           //if (format === 'start' ||
               //format === 'end') {
             //str += ' -|-> '
           //} else {
             //str += ' ---> '
           //}
        //}
      //}
    //} else {
      //for (let ii = 0; ii < this.roll_log_data[i].length; ii++){
        //format = this.roll_log_heading[ii].format
        //str += this.roll_log_data[i][ii]
        //if (ii < this.roll_log_data[i].length-1){
           //if (format === 'start' ||
               //format === 'end') {
             //str += '  |   '
           //} else {
             //str += '      '
           //}
        //}
      //}
    //}
  //}
  //return str
//}

//log_stack_setup(){
  //this.roll_log_heading = []
  //this.roll_log_data    = []
  //this.log_stack(this.tick,'start')
  //if (this.roll.ready){
    //ipc.send(
      //'log',
      //`RL ${this.tick}: ${this.roll.from} ${this.roll.to}`
    //)
    //this.roll_to(this.roll.from,this.roll.to)
  //}
//}
