import Store from 'common/store'
import game from 'core/game'
import assets from 'core/assets'

const store = new Store()

/**
 * Sounds class thats attached to the game itself,
 * Sounds holds all sounds and has helper methods with different states
 */
export default class CoreSounds {
  private sfw_swap           : Phaser.Sound
  private msx_stage_results  : any
  private msx_stage          : any
  private msx_stage_critical : any
  private state_music        : string
  private sfx_land           : Array<Phaser.Sound>
  private sfx_pop            : Array<Phaser.Sound>
  private sfx_confirm        : Phaser.Sound
  private sfx_select         : Phaser.Sound
  private sfx_blip           : Phaser.Sound
  private sfx_ding           : Phaser.Sound
  private sfx_swap           : Phaser.Sound
  private msx_volume : number
  private stay_muted : boolean
  private stay_loop  : boolean
  private play_loop  : boolean
  private stop_loop  : boolean

  /** Defines all the sound files this class contains, volume vars and loopable sounds */
  create() {
    this.sfx_swap = game.add.audio('sfx_swap')

    this.msx_stage_results  = this.loop(
      "msx_stage_results",
      this.msx_volume,
      assets.music.msx_stage_results.start,
      assets.music.msx_stage_results.end,
      assets.music.msx_stage_results.test
    )
    this.msx_stage = this.loop(
      "msx_stage",
      this.msx_volume,
      assets.music.msx_stage.start,
      assets.music.msx_stage.end,
      assets.music.msx_stage.test
    )
    this.msx_stage_critical = this.loop(
      "msx_stage_critical",
      this.msx_volume,
      assets.music.msx_stage_critical.start,
      assets.music.msx_stage_critical.end,
      assets.music.msx_stage_critical.test
    )

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

    let audio_settings = store.get("audio")
    if (audio_settings !== undefined) {
      this.set_sfx_volume(audio_settings[0])
      this.set_msx_volume(audio_settings[1])
      this.mute_all(audio_settings[2])
    }
  } 

  /**
   * Sets all current sfx files to the volume amount passed in
   * @param {integer} volume from 0 to 100
   */
  set_sfx_volume(volume) {
    console.log('sfx',volume)
    const decimal_volume = volume * 0.01

    this.sfx_land.forEach(sfx => sfx.volume = decimal_volume)
    this.sfx_pop.forEach(sfx => sfx.volume = decimal_volume)
    this.sfx_confirm.volume = decimal_volume
    this.sfx_select.volume  = decimal_volume
    this.sfx_blip.volume    = decimal_volume
    this.sfx_ding.volume    = decimal_volume
    this.sfx_swap.volume    = decimal_volume
  }

  /**
   * Sets all current msx files to the volume amount passed in
   * @param {integer} volume from 0 to 100
   */
  set_msx_volume(volume) {
    console.log('msx',volume)
    const decimal_volume = volume * 0.01

    this.msx_stage.volume          = decimal_volume
    this.msx_stage_critical.volume = decimal_volume
    this.msx_stage_results.volume  = decimal_volume
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
    this.sfx_pop[Math.min(index,this.sfx_pop.length-1)].play()
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
        this.msx_stage.stop_loop()
        this.msx_stage_critical.stop_loop()
        this.msx_stage_results.stop_loop()
        break;
      case 'active':
        if (this.state_music != 'active') {
          this.state_music = state
          this.msx_stage.play_loop("start")
          this.msx_stage_critical.stop_loop()
          this.msx_stage_results.stop_loop()
        }
        break;
      case 'danger':
        if (this.state_music != 'danger') {
          this.state_music = state
          this.msx_stage.stop_loop()
          this.msx_stage_critical.play_loop("start")
          this.msx_stage_results.stop_loop()
        }
        break;
      case 'results':
        if (this.state_music != 'results') {
          this.state_music = state
          this.msx_stage.stop_loop()
          this.msx_stage_critical.stop_loop()
          this.msx_stage_results.play_loop("start")
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
    const sound = game.add.audio(key)
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
