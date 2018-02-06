import Store from 'common/store'
import game from 'core/game'
import assets from 'core/assets'
import SoundGroup from 'core/sound_group'

const store = new Store()

/**
 * Sounds class thats attached to the game itself,
 * Sounds holds all sounds and has helper methods with different states
 */
export default class CoreSounds {
  private sfx_land           : any
  private sfx_pop            : any
  private sfx_confirm        : Phaser.Sound
  private sfx_select         : any
  private sfx_blip           : Phaser.Sound
  private sfx_ding           : Phaser.Sound
  private sfx_swap           : any
  private mode_vs            : SoundGroup

  /** Defines all the sound files this class contains, volume vars and loopable sounds */
  create() {  
    this.mode_vs = new SoundGroup(
      ["msx_stage", assets.music.msx_stage], 
      ["msx_stage_critical", assets.music.msx_stage_critical],
      ["msx_stage_results", assets.music.msx_stage_results]
    )

    this.sfx_pop = game.add.audio('sfx_pop')
    this.sfx_pop.allow_multiple = true
    
    this.sfx_land = game.add.audio('sfx_drop')
    this.sfx_confirm = game.add.audio('sfx_confirm')
    this.sfx_select  = game.add.audio('sfx_select')

    this.sfx_blip  = game.add.audio('sfx_countdown_blip')
    this.sfx_ding  = game.add.audio('sfx_countdown_ding')
    this.sfx_swap = game.add.audio('sfx_swap')

    let audio_settings = store.get("audio")
    if (audio_settings !== undefined) {
      this.set_sfx_volume(this.sfx_volume)
      this.set_msx_volume(this.msx_volume)
      this.mute_all(audio_settings[2])
    }
  } 
  
  get sfx_volume() { return store.get("audio")[0] * 0.01 }
  get msx_volume() { return store.get("audio")[1] * 0.01 }

  /**
   * Sets all current sfx files to the volume amount passed in
   * @param {integer} volume from 0 to 100
   */
  set_sfx_volume(volume) {
    this.sfx_land.volume = volume
    this.sfx_pop.volume = volume
    this.sfx_confirm.volume = volume
    this.sfx_select.volume  = volume
    this.sfx_blip.volume    = volume
    this.sfx_ding.volume    = volume
    this.sfx_swap.volume    = volume
  }

  /**
   * Sets all current msx files to the volume amount passed in
   * @param {integer} volume from 0 to 100
   */
  set_msx_volume(volume) {
    this.mode_vs.volume(volume)
  }

 /**
  * Mute/Unmutes all files
  * @param {boolean} bool wether to mute or not mute all files
  */
  mute_all(bool) {
    this.sfx_land.mute = bool
    this.sfx_pop.mute = bool
    this.sfx_confirm.mute = bool
    this.sfx_select.mute  = bool
    this.sfx_blip.mute    = bool
    this.sfx_ding.mute    = bool
    this.sfx_swap.mute    = bool

    this.mode_vs.mute(bool)
  }

  /** plays the sfx_land file */
  land() {
    this.sfx_land.play()
  }

  /** plays the swap file */
  swap() {
    this.sfx_swap.play()
    this.sfx_swap._sound.playbackRate.value = game.rnd.realInRange(0.99, 1.01)
  }

  /** plays the confirm file */
  confirm() {
    //this.sfx_confirm.play()
  }

  /** plays the select file */
  select() {
    this.sfx_select.play()
    this.sfx_select._sound.playbackRate.value = game.rnd.realInRange(0.99, 1.01)
  }

  /** plays the blip file */
  blip() {
    this.sfx_blip.play()
  }

  /** plays the ding file */
  ding() {
    this.sfx_ding.play()
  }

  /**
   * plays a pop sound, each pop increases in pitch until the highest range is reached 
   * @param index current pop
   * @param range length of the popping
   */
  pop(index, range) {
    this.sfx_pop.play()
    this.sfx_pop._sound.playbackRate.value = game.math.linear(index, range, 1 / range)
  }

  /**
   * Plays a music sounds defined by the parameter passed in
   * @param {String} state "pause", "resume", "none", "active", "danger" or "results"
   */
  stage_music(state) {
    this.mode_vs.execute(state)
  }
}
