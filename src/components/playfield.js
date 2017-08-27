module.exports = function(game){
  const _f = require('./../core/filters')
  const ComponentMenuPause          = require('./menu_pause')(game)
  const ComponentPlayfieldCountdown = require('./playfield_countdown')(game)
  const ComponentPlayfieldCursor    = require('./playfield_cursor')(game)
  const ComponentScore              = require('./score')(game)
  const ComponentPanel              = require('./panel')(game)
  const ComponentAi                 = require('./ai')(game)
  const {
    ROWS,
    COLS,
    PANELS,
    UNIT,
    TIME_PUSH,
    SCAN_BTLR
  } = require('./../core/data')

  class controller {
    static initClass() {
      this.prototype.history = {};
      this.prototype.pi          = null; // player number, used to detect input
      this.prototype.unit        = null;
      this.prototype.rows        = null;
      this.prototype.cols        = null;
      this.prototype.combo       = null;
      this.prototype.chain       = null;
      this.prototype.cursor      = null;
      this.prototype.blank       = null;
      this.prototype.score       = 0;
      this.prototype.scoreText   = null;
      this.prototype.pushTime    = 0;
      this.prototype.pushCounter = 0;
      this.prototype.has_ai = false;
      this.prototype.running = false;
      this.prototype.land = false;
       // when any panel has landed in the stac
    }
    constructor(pi){
      this.get_data = this.get_data.bind(this);
      this.create = this.create.bind(this);
      this.create_after = this.create_after.bind(this);
      this.create_stack = this.create_stack.bind(this);
      this.push = this.push.bind(this);
      this.create_newline = this.create_newline.bind(this);
      this.pause = this.pause.bind(this);
      this.resume = this.resume.bind(this);
      this.game_over = this.game_over.bind(this);
      this.new_panels = this.new_panels.bind(this);
      this.fill_panels = this.fill_panels.bind(this);
      this.update_panels = this.update_panels.bind(this);
      this.update_chain_and_combo = this.update_chain_and_combo.bind(this);
      this.swap = this.swap.bind(this);
      this.chain_over = this.chain_over.bind(this);
      this.is_danger = this.is_danger.bind(this);
      this.tick_push = this.tick_push.bind(this);
      this.track_panel = this.track_panel.bind(this);
      this.track_tick = this.track_tick.bind(this);
      this.print_tick = this.print_tick.bind(this);
      this.score_current = this.score_current.bind(this);
      this.update_stack = this.update_stack.bind(this);
      this.update_newline = this.update_newline.bind(this);
      this.panel_i = this.panel_i.bind(this);
      this.update = this.update.bind(this);
      this.shutdown = this.shutdown.bind(this);
      this.pi = pi;
      this.menu_pause = new ComponentMenuPause();
      this.countdown  = new ComponentPlayfieldCountdown();
      this.cursor     = new ComponentPlayfieldCursor();
      this.score_lbl  = new ComponentScore();
      this.blank      = new ComponentPanel();
      this.ai         = new ComponentAi();
    }
    get_data() {
      return [
        this.running,this.score
      ];
    }
    create(stage,opts){
      this.stage = stage;
      if (opts == null) { opts = {}; }
      this.sfx_swap  = game.add.audio('sfx_swap');
      this.sfx_land = [];
      this.sfx_land[0]  = game.add.audio('sfx_drop0');
      this.sfx_land[1]  = game.add.audio('sfx_drop1');
      this.sfx_land[2]  = game.add.audio('sfx_drop2');
      this.sfx_land[3]  = game.add.audio('sfx_drop3');

      this.should_push = opts.push || false;

      this.height = (ROWS+1) * UNIT;
      this.width  = COLS     * UNIT;

      this.x = opts.x;
      this.y = opts.y;

      this.layer_block  = game.add.group();
      this.layer_block.x  = this.x;
      this.layer_block.y  = this.y;

      this.create_stack(opts.panels);
      this.create_newline('unique');

      this.score       = 0;
      this.chain       = 0;
      this.pushTime    = TIME_PUSH;
      this.pushCounter = this.pushTime;

      this.score_lbl.create();
      return this.blank.create(this, null, null, true);
    }
    create_after() {
      this.layer_cursor = game.add.group();
      this.layer_cursor.x = this.x;
      this.layer_cursor.y = this.y;

      this.countdown.create(this);
      this.cursor.create(this, {ai: this.has_ai});
      if (this.has_ai) { this.ai.create(this, this.cursor); }

      this.menu_pause.create(this);

      return this.render();
    }
    create_stack(data){
      this.stack = this.new_panels(ROWS);
      if (data) {
        this.fill_panels(false, this.stack, data);
      } else {
        this.fill_panels(false, this.stack, 5, 'unique');
      }
      return Array.from(this.stack).map((panel, i) =>
        panel.update_neighbours(i));
    }

    push() {
      let i;
      let asc, end;
      if (this.is_danger(0)) {
        this.stage.game_over();
        return 0;
      }

      const stack = new Array(PANELS);
      for (i = COLS, end = PANELS, asc = COLS <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        stack[i-COLS] = this.stack[i];
      }

      for (i = 0; i < this.newline.length; i++) {
        const panel = this.newline[i];
        const ii = (PANELS-COLS)+i;
        stack[ii] = panel;
        stack[ii].newline = false;
        stack[ii].play_live();
      }

      this.stack = stack;
      this.create_newline('random');

      if (this.cursor.y > 1) { this.cursor.y--; }
      return 1;
    }
    create_newline(mode){
      if (!this.should_push) { return; }
      this.newline = this.new_panels(1, mode);
      return this.fill_panels(true, this.newline, 1, mode);
    }
    pause(pi){
      this.menu_pause.pause(pi);
      return this.running = false;
    }
    resume() {
      this.running = true;
      return this.cursor.map_controls();
    }
    game_over() {
      let i, panel;
      const is_dead = this.is_danger(0);
      for (i = 0; i < this.stack.length; i++) { panel = this.stack[i]; panel.check_dead(i, is_dead); }
      for (i = 0; i < this.newline.length; i++) { panel = this.newline[i]; panel.check_dead(i, is_dead); }
      this.running = false;
      console.log('gameover',
        this.stack[0].i,
        this.stack[1].i,
        this.stack[2].i,
        this.stack[3].i,
        this.stack[4].i,
        this.stack[5].i);
      this.pushCounter = 0;
    }
    //grid of blocks
    new_panels(rows){
      const size   = COLS * rows;
      const panels = new Array(size);
      for (let i = 0, end = size, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        const [x,y] = Array.from(_f.i_2_xy(i));
        panels[i] = new ComponentPanel();
        panels[i].create(this, x, y);
      }
      return panels;
    }
    fill_panels(newline, stack, rows, mode=null){
      let i, offset;
      if (Array.isArray(rows)) {
        const data    = rows;
        offset  = (ROWS - (data.length / COLS)) * COLS;

        return (() => {
          const result = [];
          for (i = 0; i < data.length; i++) {
            const color = data[i];
            result.push(stack[offset+i].set(color));
          }
          return result;
        })();
      } else {
        offset = ((stack.length / COLS) - rows) * COLS;

        const size = rows * COLS;
        return (() => {
          let asc, end;
          const result1 = [];
          for (i = offset, end = offset+size, asc = offset <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            switch (mode) {
              case 'unique': stack[i].set('unique'); break;
              case 'random': stack[i].set('random'); break;
              default:
                stack[i].set(mode[i]);
            }
            if (newline) {
              stack[i].newline = true;
              result1.push(stack[i].play_newline());
            } else {
              result1.push(undefined);
            }
          }
          return result1;
        })();
      }
    }
    update_panels() {
      return Array.from(SCAN_BTLR).map((i) =>
        this.stack[i].update(i, this.is_danger(1)));
    }
    // Update the combos and chain for the entire grid.
    // Returns [combo, chain] where
    // combo is the amount of blocks participating in the combo
    // chain is whether a chain is currently happening.
    update_chain_and_combo() {
      //@track_tick()
      let i, panel;
      let combo = 0;
      let chain = false;
      this.panels_clearing = [];
      for (i = 0; i < this.stack.length; i++) {
        panel = this.stack[i];
        const cnc    = panel.chain_and_combo();
        combo += cnc[0];
        if (cnc[1]) { chain  = true; }
      }
      for (i = 0; i < this.panels_clearing.length; i++) {
        panel = this.panels_clearing[i];
        panel.popping(i);
      }
      //console.log 'chain_over_check', chain, @chain, @chain_over()
      if (this.chain && this.chain_over()) { this.chain = 0; }
      return [combo, chain];
    }
    // Swaps two blocks at location (x,y) and (x+1,y) if swapping is possible
    swap(x, y){
      const i = _f.xy_2_i(x, y);
      if (this.stack[i].is_swappable() && this.stack[i+1].is_swappable()) {
        return this.stack[i].swap();
      }
    }
    // Checks if the current chain is over.
    // returns a boolean
    chain_over() {
      let chain = true;
      for (let panel of Array.from(this.stack)) {
        if (panel.chain) { console.log('chained!'); }
        if (panel.chain) { chain = false; }
      }
      return chain;
    }
    is_danger(within){
      const offset = COLS*within;
      const cols  = [];
      for (let i = 0, end = COLS, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        if (this.stack[offset+i] && (this.stack[offset+i].i >= 0) && (this.stack[offset+i].i !== null)) {
          cols.push(i);
        }
      }
      if (cols.length > 0) { return cols; } else { return false; }
    }
    /* The tick function is the main function of the TaGame object.
     * It gets called every tick and executes the other internal functions.
     * It will update the grid,
     * calculate the current score,
     * spawn possible garbage,
     * updates the sprites to the correct locations in the canvas.
     */
    tick_push() {
      if (this.cursor.can_push()) {
        this.pushCounter -= 100;
      } else {
        this.pushCounter--;
      }
      if (this.pushCounter <= 0) {
        this.pushCounter = this.pushTime;
        return this.score      += this.push();
      }
    }
    track_panel(panel,name,v){
      if ((this.tick >= 0) && (panel.newline !== true)) {
        const i = _f.xy_2_i(panel.x, panel.y);
        if (!this.history) { this.history = {}; }
        if (!this.history[`${this.tick}`]) { this.history[`${this.tick}`] = []; }
        if (!this.history[`${this.tick}`][i]) { this.history[`${this.tick}`][i] = []; }
        return this.history[`${this.tick}`][i].push(`${name}: ${v}`);
      }
    }

    track_tick() {
      if (!(this.tick >= 0)) { return this.tick = 0; }
    }
    print_tick(with_time){
      if (with_time == null) { with_time = false; }
      if (this.tick >= 0) {
        if (with_time) {
          console.log(`~ ${this.tick} ${Date.now()}`);
        } else {
          console.log(`~ ${this.tick}`);
        }
        return this.tick++;
      }
    }

    score_combo(combo){
      switch (combo) {
        case 4: return 20;
        case 5: return 30;
        case 6: return 50;
        case 7: return 60;
        case 8: return 70;
        case 9: return 80;
        case 10: return 100;
        case 11: return 140;
        case 12: return 170;
        default:
          return 0;
      }
    }
    score_chain(chain){
      switch (chain) {
        case 2:  return 50;
        case 3:  return 80;
        case 4:  return 150;
        case 5:  return 300;
        case 6:  return 400;
        case 7:  return 500;
        case 8:  return 700;
        case 9:  return 900;
        case 10: return 1100;
        case 11: return 1300;
        case 12: return 1500;
        case 13: return 1800;
        default:
          return 0;
      }
    }
    score_current(cnc){
      if (cnc[0] > 0) {
        console.log('combo is ', cnc);
        this.score += cnc[0] * 10;
        this.score += this.score_combo(cnc[0]);
        if (cnc[1]) {
          this.chain++;
          console.log('chain is ', this.chain + 1);
        }
        if (this.chain) {
          this.score += this.score_chain(this.chain + 1);
        }
        return console.log('Score: ', this.score);
      }
    }
    update_stack() {
      return Array.from(this.stack).map((panel) =>
        panel.render());
    }
    update_newline() {
      return Array.from(this.newline).map((panel) =>
        panel.render(true));
    }
    panel_i(i){
      if (this.stack[i] && (this.stack[i].i !== null)) {
        return this.stack[i].i;
      } else {
        return null;
      }
    }
    render() {
      this.update_stack();
      if (this.should_push) { this.update_newline(); }
      if (this.land === true) {
        const i = game.rnd.integerInRange(0,3);
        this.sfx_land[i].play();
        this.land = false;
      }

      this.cursor.update();
      this.countdown.update();
      this.menu_pause.update();

      this.score_lbl.update(this.chain, this.score);

      if (this.should_push) {
        const lift = this.y + ((this.pushCounter / this.pushTime) * UNIT);
        this.layer_block.y  = lift;
        return this.layer_cursor.y = lift;
      }
    }
    update() {
      if (!this.running) { return; }
      //this.print_tick();
      if (this.should_push) { this.tick_push(); }
      this.update_panels();
      if (this.has_ai) { this.ai.update(); }
      // combo n chain
      const cnc = this.update_chain_and_combo();
      this.score_current(cnc);
      this.render();
    }
    shutdown() {
      return this.cursor.shutdown();
    }
  }
  controller.initClass();

  return controller
}
