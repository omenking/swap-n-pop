import game from 'core/game'

/**
 * Sounds class thats attached to the game itself,
 * Sounds holds all sounds and has helper methods with different states
 */
export default class CoreSounds {
  /** Defines all the sound files this class contains, volume vars and loopable sounds */
  create() {
    this.sfx_swap = game.add.audio('sfx_swap')

    this.msx_stage_results  = game.add.audio('msx_stage_results')
    this.msx_stage          = game.add.audio('msx_stage')
    this.msx_stage_critical = this.loop("msx_stage_critical", this.msx_volume, 12.759, 26.85, 23)

    this.state_music = 'none'

    this.sfx_land = []
    this.sfx_land[0]  = game.add.audio('sfx_drop0')
    this.sfx_land[1]  = game.add.audio('sfx_drop1')
    this.sfx_land[2]  = game.add.audio('sfx_drop2')
    this.sfx_land[3]  = game.add.audio('sfx_drop3')

    this.sfx_pop = []
    this.sfx_pop[0] = game.add.audio('sfx_pop0')
    this.sfx_pop[1] = game.add.audio('sfx_pop1')
    this.sfx_pop[2] = game.add.audio('sfx_pop2')
    this.sfx_pop[3] = game.add.audio('sfx_pop3')

    this.sfx_confirm = game.add.audio('sfx_confirm')
    this.sfx_select  = game.add.audio('sfx_select')

    this.sfx_blip  = game.add.audio('sfx_countdown_blip')
    this.sfx_ding  = game.add.audio('sfx_countdown_ding')
  } 

  /**
   * Sets all current sfx files to the volume amount passed in
   * @param {integer} decimal_volume from 0.0 to 1.0
   */
  set_sfx_volume(decimal_volume) {
    this.sfx_land.forEach(sfx => sfx.volume = decimal_volume)
    this.sfx_pop.forEach(sfx => sfx.volume = decimal_volume)
    this.sfx_confirm.volume = decimal_volume
    this.sfx_select.volume  = decimal_volume
    this.sfx_blip.volume    = decimal_volume
    this.sfx_swap.volume    = decimal_volume
  }

  /**
   * Sets all current msx files to the volume amount passed in
   * @param {integer} decimal_volume from 0.0 to 1.0
   */
  set_msx_volume(decimal_volume) {
    this.msx_stage_results.volume  = decimal_volume
    this.msx_stage.volume          = decimal_volume
    this.msx_stage_critical.volume = decimal_volume
  }

 /**
  * Mute/Unmutes all files
  * @param {boolean} bool wether to mute or not mute all files
  */
  mute_all(bool) {
    this.sfx_land.forEach(sfx => sfx.mute = bool)
    this.sfx_pop.forEach(sfx => sfx.mute = bool)
    this.sfx_confirm.mute = bool
    this.sfx_select.mute  = bool
    this.sfx_blip.mute    = bool
    this.sfx_ding.mute    = bool
    this.sfx_swap.mute    = bool

    this.msx_stage_results.mute        = bool
    this.msx_stage.mute                = bool
    this.msx_stage_critical.stay_muted = bool
    this.msx_stage_critical.mute       = bool
  }

  /** plays the sfx_land file */
  land() {
    this.sfx_land[0].play()
  }

  /** plays the swap file */
  swap() {
    this.sfx_swap.play()
  }

  /** plays the confirm file */
  confirm() {
    //this.sfx_confirm.play()
  }

  /** plays the select file */
  select() {
    this.sfx_select.play()
  }

  /** plays the blip file */
  blip() {
    this.sfx_blip.play()
  }

  /** plays the ding file */
  ding() {
    this.sfx_ding.play()
  }

  pop(index) {
    this.sfx_pop[index].play()
  }

  /**
   * Plays a music sounds defined by the parameter passed in
   * @param {String} state "pause", "resume", "none", "active", "danger" or "results"
   */
  stage_music(state) {
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
        this.msx_stage.stop()
        this.msx_stage_critical.stop_loop()
        this.msx_stage_results.stop()
        break;
      case 'active':
        if (this.state_music != 'active') {
          this.state_music = state
          this.msx_stage.loopFull(this.msx_volume)
          this.msx_stage_critical.stop_loop()
          this.msx_stage_results.stop()
        }
        break;
      case 'danger':
        if (this.state_music != 'danger') {
          this.state_music = state
          this.msx_stage.stop()
          this.msx_stage_critical.play_loop("start")
          this.msx_stage_results.stop()
        }
        break;
      case 'results':
        if (this.state_music != 'results') {
          this.state_music = state
          this.msx_stage.stop()
          this.msx_stage_critical.stop_loop()
          this.msx_stage_results.loopFull(this.msx_volume)
        }
        break;
    }
  }

  /**
   * Adds different Markers for a sound by the defined parameters,
   * The sound starts playing from 0 until start_time,
   * Then it loops from start_time until end_time,
   * test_end_time is a marker used for testing loops so you dont have to wait
   * for the loop to occur everytime - test_end_time should be a few seconds smaller than end_time
   * @param {Object} game reference to the game
   * @param {String} key the name of the audio file defined in loadjs
   * @param {integer} volume from 0.0 to 1.0
   * @param {integer} start_time in seconds
   * @param {integer} end_time in seconds
   * @param {integer} test_end_time in seconds
   * @returns a Sound reference 
   */
  loop (key, volume, start_time, end_time, test_end_time) {
    // need to use game.add.audio()... extending phaser.sound has issues when returning the extended object
    let sound = game.add.audio(key)
    sound.addMarker("start"      , 0            , start_time              , volume, true)
    sound.addMarker("main"       , start_time   , end_time - start_time   , volume, true)
    sound.addMarker("testLoopEnd", test_end_time, end_time - test_end_time, volume, true)
    sound.stay_muted = false
    sound.onMarkerComplete.add(this.loop_complete(sound))
    sound.stop_loop = this.loop_stop(sound)
    sound.play_loop = this.loop_play(sound)
    return sound
  }

  loop_complete (sound){
    return function(m) {
      if (m !== "main")
        sound.play("main")
    }
  }
  loop_stop (sound){
    return function (){
      sound.stop()
      sound.mute = true
    }
  }
  loop_play (sound){
    return function (key) {
      if (sound.stay_muted !== true) {
        sound.mute = false
        sound.play(key)
      }
    }
  }
}
