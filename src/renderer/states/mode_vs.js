module.exports = function(game){
  const Stack = require('./../core/stack')(game)
  const ComponentPlayfield = require('./../components/playfield')(game)
  const {ipcRenderer: ipc} = require('electron')
  const seedrandom         = require('seedrandom')
  class controller {
    constructor() {
      this.init   = this.init.bind(this);
      this.create_bg = this.create_bg.bind(this);
      this.create_frame = this.create_frame.bind(this);
      this.create = this.create.bind(this);
      this.stage_music = this.stage_music.bind(this);
      this.pause = this.pause.bind(this);
      this.resume = this.resume.bind(this);
      this.game_over = this.game_over.bind(this);
      this.danger_check = this.danger_check.bind(this);
      this.update_input = this.update_input.bind(this);
      this.replay_input = this.replay_input.bind(this);
      this.update_replay = this.update_replay.bind(this);
      this.update = this.update.bind(this);
      this.shutdown = this.shutdown.bind(this);
      this.playfield1 = new ComponentPlayfield(0);
      this.playfield2 = new ComponentPlayfield(1);
    }
    init(data){
      this.tick = -1
      this.seed = data.seed
      this.rng  = seedrandom(this.seed)
      if (data.inputs) {
        this.replay = true
        this.replaying = [null,null]
        this.inputs = data.inputs
      } else {
        this.replay    = false
        this.inputs = [
          [[-1,0,'000000']],
          [[-1,0,'000000']]
        ]
      }
    }
    create_bg() {
      this.bg = game.add.sprite(-89,0, 'playfield_vs_bg');
    }
    create_frame(offset){
      this.frame = game.add.sprite(offset,0, 'playfield_vs_frame');
    }
    create() {
      game.stage.backgroundColor = 0x000000;
      this.state_music = 'none';

      this.danger = false;
      this.msx_stage_results  = game.add.audio('msx_stage_results');
      this.msx_stage          = game.add.audio('msx_stage');
      this.msx_stage_critical = game.add.audio('msx_stage_critical');

      const offset = 0;
      this.create_bg();

      const stack = new Stack(this.rng)

      this.playfield1.create(this, {push: true, x: offset+8  , y: 24, panels: stack.panels});
      this.playfield2.create(this, {push: true, x: offset+152, y: 24, panels: stack.panels});
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
      ipc.send('replay-save', {seed: this.seed, inputs: this.inputs});
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
        return this.danger = false
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
    replay_input(pi){
      if (this.replaying[pi] === null) {
        this.replaying[pi] = this.inputs[pi].shift()
      }
      if ((this.replaying[pi][0]+this.replaying[pi][1]) < this.tick){
        while((this.replaying[pi][0]+this.replaying[pi][1]) < this.tick){
          this.replaying[pi] = this.inputs[pi].shift()
        }
        console.log('+',this.tick,this.replaying[pi][0],this.replaying[pi][1],this.replaying[pi][2])
        game.controls.execute(pi,this.replaying[pi][2])
      } else {
        //console.log('~',this.tick,this.replaying[pi][0],this.replaying[pi][1],this.replaying[pi][2])
      }
    }
    update_replay() {
      if (this.replay){
        this.replay_input(0)
        this.replay_input(1)
      } else {
        this.update_input(0)
        this.update_input(1)
      }
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
