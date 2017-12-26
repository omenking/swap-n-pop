import { ipcRenderer as ipc } from "electron";

import game     from 'core/game'
import State    from 'states/base'
import controls from 'core/controls'
import Store    from 'common/store'
//import * as assets   from 'core/assets'

const store = new Store()

// load any external assets and store them in an scoped array
let external_assets = []
ipc.on('asset-list', (e, files) => external_assets = files)

/** Loads all sprites, spritesheets, sound effects, etc to the phaser game
 *  Uses signals to detect once everything has been loaded correctly
 */
export default class LoadState extends State {
  private all_assets : Array<{}>
  private external_asset_dir : string

  get name(): string { return 'load'; }

  /** preload a json file where all assets preconfigs */
  preload() {
    game.load.json('assets', './assets.json');
  }

  create() {
    this.external_asset_dir = store.get('asset-dir')
    this.all_assets = game.cache.getJSON('assets').assets
    this.load_assets();

    game.load.onLoadComplete.add(() => { 
      controls.create()
      game.sounds.create()
      game.state.start('menu')
    }, this)

    game.load.start();
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
    this.all_assets.forEach(e => {
      let type : string = e["type"];
      let name : string = e["name"];
      let load_external = external_assets.find(a => a === name)
      let path : string = this.asset_path(type, name, load_external)

      switch (type) {
        case "music": game.load.audio(name, path); break;
        case "sound_effects": game.load.audio(name, path); break;
        case "image": game.load.image(name, path); break;
        case "spritesheet": 
          let props = e["options"];
          game.load.spritesheet(name, path, props.x, props.y, props.frames);
          break;
      }
    })
  }

  /**
   * @param type either music, sound_effects, image, spritesheet
   * @param name name of the asset
   * @param external if the path should be external or not
   * @returns the path based on type
   */ 
  asset_path(type : string, name : string, external) {
    if (!external) 
      switch (type) {
        case "music": return `./assets/music/${name}.mp3`
        case "sound_effects": return `./assets/sound_effects/${name}.ogg`
        case "image": return `./assets/images/${name}.png`
        case "spritesheet": return `./assets/images/${name}.png`
      }
    else 
      switch (type) {
        case "music": return this.external_asset_dir + `/${name}.mp3`
        case "sound_effects": return this.external_asset_dir + `/${name}.ogg`
        case "image": return this.external_asset_dir + `/${name}.png`
        case "spritesheet": return this.external_asset_dir + `/${name}.png`
      }
  }
}
