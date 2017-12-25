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
  private loader : Phaser.Text
  private files : Phaser.Text
  private file : Phaser.Text
  private all_assets : Array<{}>

  get name(): string {
    return 'load';
  }

  create() {
    const x = game.world.centerX
    const y = game.world.centerY
    const font_style1 = { font: '20px Verdana', fill: '#FFF', align: 'center' }
    const font_style2 = { font: '12px Verdana', fill: '#FFF', align: 'center' }
    this.loader = game.add.text(0,y    , `Loading ${0}%`, font_style1)
    this.files  = game.add.text(0,y+40 , "Files 0 / 0"  , font_style2)
    this.file   = game.add.text(0,y+70 , ""             , font_style2)
    this.loader.visible = false
    this.files.visible  = false
    this.file.visible   = false

    game.load.onLoadStart.add(this.load_start   , this)
    game.load.onFileComplete.add(this.file_complete, this)
    game.load.onLoadComplete.add(this.load_complete, this)
    
    game.load.json('assets', 'common/assets.json');
    console.log(game.cache.getJSON('assets'));
    //fetch("../common/assets.json").then(r => r.json()).then(json => console.log(json))
    this.load_all()
  }

  load_start() {

  }

  file_complete = (progress,key,success,cur,total) => {
    this.files.setText(`Files ${cur} / ${total}`)
    this.file.setText(key)
  }

  load_complete() {
    controls.create()
    game.sounds.create()
    game.state.start('menu')
  }

  update() {
    this.loader.setText(`Loading ${game.load.progress}%`);
  }

  render() {
    //this.loader.visible = true
    //this.files.visible  = true
    //this.file.visible   = true
  }

  load_all() {
    


  }
}
