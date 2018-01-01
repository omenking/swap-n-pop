import { ipcRenderer as ipc } from "electron";
import game     from 'core/game'
import assets   from 'core/assets'
import State    from 'states/base'
import controls from 'core/controls'
import Store    from 'common/store'
//import * as assets   from 'core/assets'

const store = new Store()

/** Loads all sprites, spritesheets, sound effects, etc to the phaser game
 *  Uses signals to detect once everything has been loaded correctly
 */
export default class LoadState extends State {
  get name(): string { return 'load'; }

  preload(){
    assets.preload()
  }

  create() {
    assets.load()
    this.load_assets()
    game.load.onLoadComplete.add(() => {
      controls.create()
      game.sounds.create()
      game.state.start('menu')
    }, this)
    game.load.start()
  }

  /** Loads all assets in the assets folder
   *  if any assets with the same name, data type etc exist in the 
   *  external assets folder -> external asset is loaded instead of the
   *  actual asset.
   *  
   *  This allows other to replace any assets with their own if 
   *  they behave under the restrictions defined in assets.json  
   */
  load_assets() {
    this.load_music()
    this.load_sound_effects()
    this.load_images()
    this.load_spritesheets()
  }


  load_music(){
    Object.keys(assets.music).forEach(function(key){
      game.load.audio(key,assets.path('music', key))
    })
  }

  load_sound_effects(){
    assets.sound_effects.forEach(function(key){ 
      game.load.audio(key,assets.path('sound_effects',key))
    })
  }

  load_images(){
    assets.images.forEach(function(key){
      game.load.image(key,assets.path('images',key))
    })
  }

  load_spritesheets(){
    let data,pos
    Object.keys(assets.spritesheets).forEach(function(key) { 
      data  = assets.spritesheets[key]
      pos = data.size.split('x')
      game.load.spritesheet(key,assets.path('spritesheets',key),
                            parseInt(pos[0]),
                            parseInt(pos[1]),
                            parseInt(data.frames))
    })
  }
}
