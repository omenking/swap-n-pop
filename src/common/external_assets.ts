import * as path  from 'path'
import * as fs    from 'fs'
import * as fx    from 'mkdir-recursive'
import * as glob  from 'glob'
import {app}      from 'electron'

import Store from 'common/store'
const store = new Store()

export default class ExternalAssets {
  public static dir(state: string = "", dir: string = "") : string {
    switch (state) {
      // nothing done to dir var
      case 'change': 
        break;

      // dir is reset to code defined path
      case 'reset':
        dir = path.join(app.getPath('appData'), 'swap-n-pop', 'external-assets')
        break;

      // dir is set to last known if exists, otherwhise it resets
      case '': 
        dir = store.has('asset-dir') ? store.get('asset-dir') : path.join(app.getPath('appData'), 'swap-n-pop', 'external-assets')
        break;
    }

    // set dir to newest defined
    store.set('asset-dir', dir) 

    // create actual folder through dir if it doesnt exist
    if (!fs.existsSync(dir))
      fx.mkdirSync(dir); 

    return dir;
  }
}