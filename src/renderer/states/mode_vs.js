module.exports = function(game){
  const ComponentPlayfield = require('./../components/playfield')(game)
  const {ipcRenderer: ipc} = require('electron')
  class controller {
    constructor() {
      this.create_bg = this.create_bg.bind(this);
      this.create_frame = this.create_frame.bind(this);
      this.create = this.create.bind(this);
      this.stage_music = this.stage_music.bind(this);
      this.pause = this.pause.bind(this);
      this.resume = this.resume.bind(this);
      this.game_over = this.game_over.bind(this);
      this.danger_check = this.danger_check.bind(this);
      this.update_input = this.update_input.bind(this);
      this.update_replay = this.update_replay.bind(this);
      this.update = this.update.bind(this);
      this.shutdown = this.shutdown.bind(this);
      this.playfield1 = new ComponentPlayfield(0);
      this.playfield2 = new ComponentPlayfield(1);
    }
    create_bg() {
      this.bg = game.add.sprite(-89,0, 'playfield_vs_bg');
    }
    create_frame(offset){
      this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
    }
    create() {
      game.stage.backgroundColor = 0x000000;

      this.tick   = -1;
      // input history for replay.
      // [tick, times, key inputs]
      this.inputs = [
        [[-1,0,'000000']],
        [[-1,0,'000000']]
      ];
      this.replay = [{},{}];

      this.state_music = 'none';

      this.danger = false;
      this.msx_stage_results  = game.add.audio('msx_stage_results');
      this.msx_stage          = game.add.audio('msx_stage');
      this.msx_stage_critical = game.add.audio('msx_stage_critical');

      const offset = 0;
      this.create_bg();
      this.playfield1.create(this, {push: true, x: offset+8  , y: 24});
      this.playfield2.create(this, {push: true, x: offset+152, y: 24});
      this.create_frame(offset);
      this.playfield1.create_after();
      this.playfield2.create_after();
    }
    stage_music(state){
      switch (state) {
        case 'pause':
          switch (this.state_music) {
            case 'active':
              this.msx_stage.pause();
              break;
            case 'danger': 
              this.msx_stage_critical.pause();
              break;
          }
          break;
        case 'resume':
          switch (this.state_music) {
            case 'active':
              this.msx_stage.resume();
              break;
            case 'danger':
              this.msx_stage_critical.resume();
              break;
          }
          break;
        case 'none':
          this.state_music = state;
          this.msx_stage.stop();
          this.msx_stage_critical.stop();
          this.msx_stage_results.stop();
          break;
        case 'active':
          if (this.state_music != 'active') {
            this.state_music = state;
            this.msx_stage.play();
            this.msx_stage_critical.stop();
            this.msx_stage_results.stop();
          }
          break;
        case 'danger':
          if (this.state_music != 'danger') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.play();
            this.msx_stage_results.stop();
          }
          break;
        case 'results':
          if (this.state_music != 'results') {
            this.state_music = state;
            this.msx_stage.stop();
            this.msx_stage_critical.stop();
            this.msx_stage_results.play();
          }
          break;
      }
    }
    pause(pi){
      this.stage_music('pause')
      this.playfield1.pause(pi)
      this.playfield2.pause(pi)
    }
    resume() {
      this.stage_music('resume')
      this.playfield1.resume()
      this.playfield2.resume()
    }
    game_over() {
      ipc.send('replay-save', {inputs: this.inputs});
      this.stage_music('results')
      this.playfield1.game_over()
      this.playfield2.game_over()
    }
    danger_check() {
      const d1 = this.playfield1.is_danger(1);
      const d2 = this.playfield2.is_danger(2);

      if (d1 || d2) {
        if (this.danger === false) {
          this.stage_music('danger');
        }
        return this.danger = true;
      } else {
        if (this.danger === true) {
          this.stage_music('active');
        }
        return this.danger = false;
      }
    }
    update_input(pi){
      const bitset = game.controls.seralize(pi)
      if (bitset === this.inputs[pi][this.inputs[pi].length-1][2]) {
        this.inputs[pi][this.inputs[pi].length-1][1]++
      } else {
        this.inputs[pi].push([this.tick,0,bitset])
      }
    }
    update_replay() {
      this.update_input(0)
      this.update_input(1)
      //let i, panel;
      //let stack   = [];
      //let newline = [];
      //for (i = 0; i < this.playfield1.stack.length;   i++) { stack[i].push(stack[i].get_data()); }
      //for (i = 0; i < this.playfield1.newline.length; i++) { newline[i].push(stack[i].get_data()); }
      //this.replay[0][this.tick] = {
        //playfield: this.playfield1.get_data(),
        //stack,
        //newline
      //};

      //stack   = [];
      //newline = [];
      //for (i = 0; i < this.playfield2.stack.length; i++  ) { stack[i].push(stack[i].get_data()); }
      //for (i = 0; i < this.playfield2.newline.length; i++) { newline[i].push(stack[i].get_data()); }
      //this.replay[1][this.tick]({
        //playfield: this.playfield2.get_data(),
        //stack,
        //newline
      //});
    }
    update() {
      this.tick++;
      this.playfield1.update();
      this.playfield2.update();

      this.danger_check();

      this.playfield1.render();
      this.playfield2.render();
      this.update_replay();
    }
    shutdown() {
      this.stage_music('none');
      this.playfield1.shutdown();
    }
  }

  return controller
}
