import { ipcRenderer as ipc } from "electron";

import State    from 'states/base'
import game     from 'core/game'
import controls from 'core/controls'
import { px } from 'core/filters';

let external_assets = []
ipc.on('asset-list', (e, files) => {
  external_assets = files
  console.log(files);
})

/** Loads all sprites, spritesheets, sound effects, etc to the phaser game
 *  Uses signals to detect once everything has been loaded correctly
 */
export default class LoadState extends State {
  private all_assets : Array<{}>

  get name(): string {
    return 'load';
  }

  preload() {
    game.load.json('assets', '../src/renderer/core/assets.json');
  }

  create() {
    this.all_assets = game.cache.getJSON('assets').assets
    
    this.all_assets.forEach(e => {
      let name : string = e["name"];

      switch (e["type"]) {
        case "music": game.load.audio(name, `./assets/music/${name}.mp3`); break;

        case "sound_effects": game.load.audio(name, `./assets/sound_effects/${name}.ogg`); break;

        case "image": game.load.image(name, `./assets/images/${name}.png`); break;

        case "spritesheet": 
          let props = e["options"];
          game.load.spritesheet(name, `./assets/images/${name}.png`, props.x, props.y, props.frames);
          break;
      }
    })

    game.load.onLoadComplete.add(() => { 
      controls.create()
      game.sounds.create()
      game.state.start('menu')
    }, this)

    game.load.start();
  }
}
