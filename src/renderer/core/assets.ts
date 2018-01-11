import * as fs    from 'fs'
import game  from 'core/game'
import Store from 'common/store'
const store = new Store()

class Assets {
  private static _instance: Assets
  private dir : string
  private assets : {
    music         : {},
    sound_effects : Array<string>,
    images        : Array<string>,
    spritesheets  : any
  }

  public static get Instance(){
    return this._instance || (this._instance = new this())
  }

  constructor(){
    this.dir = store.get('asset-dir')
  }

  preload(){
    game.load.json('assets', this.json)
  }

  load(){
    this.assets = game.cache.getJSON('assets')
  }

  get music()        { return this.assets.music }
  get sound_effects(){ return this.assets.sound_effects }
  get images()       { return this.assets.images }
  get spritesheets() { return this.assets.spritesheets }

  /**
   * @param type either music, sound_effects, image, spritesheet
   * @param name name of the asset
   * @returns the path based on type
   */ 
  path(kind : string, name : string) {
    const filename = this.filename(kind,name)
    const external = this.dir    +  '/' + filename
    const internal = './assets'  +  '/' + filename
    if (fs.existsSync(external)) {
      return external
    } else {
      return internal
    }
  }

  get json(){
    const filename = 'assets.json'
    const external = this.dir   + '/' + filename
    const internal = './assets' + '/' + filename
    if (fs.existsSync(external)) {
      return external
    } else {
      return internal
    }
  }

  filename(kind : string, name : string){
    switch (kind) {
      case "music"         : return `music/${name}.mp3`
      case "sound_effects" : return `sound_effects/${name}.ogg`
      case "images"        : return `images/${name}.png`
      case "spritesheets"  : return `spritesheets/${name}.png`
    }
  }
}

const assets = Assets.Instance
export default assets
