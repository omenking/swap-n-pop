import game from 'core/game'

// extending the Phaser.Sound interface by one function, this will help show issues at compile time
interface ExtendedSound extends Phaser.Sound {
  step : Function
}

/**
 * Extends a phaser sound object that starts playing at a start point again 
 * once the file is played through
 * @param key name of the audio file
 * @param loop_time looppoint in seconds
 * @returns ExtendedSound 
 */
function loopable_sound(key : string, loop_time : number) {
  let sound = game.add.audio(key)
  sound.loop_time = loop_time

  /** if the current time has reached the end it will jump back to its loop_time */
  sound.step = function() {
    if ((sound.currentTime * 0.001) > sound.duration) // if time in seconds is longer than the file duration
      sound.play("", sound.loop_time, sound.volume)
  }

  return sound
}

/** A SoundGroup are many loopable sounds combined, methods are added so that only
 *  one sound can play at a time depending on a state and that all can be muted etc.
 */
export default class SoundGroup {
  private group : Array<ExtendedSound> // string, any cuz we extend a Phaser.Sound
  private current_sound : number

  /** @param entries any amount of arrays each with a string and a number */
  constructor(...entries : [string, number][]) {
    this.current_sound = 0
    this.group = new Array()

    entries.forEach(e => this.group.push(loopable_sound(e[0], e[1])));
  }

  /**
   * Plays a music sounds defined by the parameter passed in
   * @param {String} state "pause", "resume", "none", "active", "danger" or "results"
   */
  execute(state) {
    switch (state) {
      case "pause": this.pause(); break;
      case "resume": this.resume(); break;
      case "none": this.stop_all(); break;

      case "active": this.play(0); break;
      case "danger": this.play(1); break;
      case "results": this.play(2); break;
    }
  }

  /** 
   * plays a sound defined by its iterator, the others left in the array will be stopped 
   * @param specific_iterator a number in the range of the array
   */
  play(specific_iterator : number) { 
    this.current_sound = specific_iterator

    for (let i = 0; i < this.group.length; i++)
      i === specific_iterator ? this.group[i].play() : this.group[i].stop()
  }

  /** pauses all sounds of the group */
  pause() { 
    this.group.forEach(sound => sound.pause()) 
  }

  /** resumes all sounds of the group */
  resume() { 
    this.group.forEach(sound => sound.resume()) 
  }

  /** stops all sounds of the group */
  stop_all() { 
    this.group.forEach(sound => sound.stop()) 
  }
 
  /** 
   * sets the volume of all to the parameter 
   * @param decimal_volume from range 0.0 to 1.0
   */
  volume(decimal_volume : number) { 
    this.group.forEach(sound => sound.volume = decimal_volume) 
  }

  /**
   * un/mutes all sounds
   * @param bool true or false
   */
  mute(bool) {
    this.group.forEach(sound => sound.mute = bool) 
  }
  
  /** executes the current sound's step method */
  step() {
    this.group[this.current_sound].step()
  }
}