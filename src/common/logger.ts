import * as electron from 'electron'
import * as path     from 'path'
import * as fs       from 'fs'
import * as os       from 'os'
import * as fx       from 'mkdir-recursive'
import * as strftime from 'strftime'

const eol = os.EOL
const {app} = electron

function debug(data){
  let dir = path.join(app.getPath('appData'),'swap-n-pop','logs')

  if (!fs.existsSync(dir)){ 
    fx.mkdirSync(dir) 
  } // create dir if it don't exist.

  const t = strftime('[%d/%b/%Y:%H:%M:%S %z]')
  fs.appendFileSync(dir + '/production.log', `${t} ${data}${eol}`)
}

function debug_to(filename,data){
  let dir = path.join(app.getPath('appData'),'swap-n-pop','logs')

  if (!fs.existsSync(dir)){ 
    fx.mkdirSync(dir) 
  } // create dir if it don't exist.

  const t = strftime('[%d/%b/%Y:%H:%M:%S %z]')
  const fname = dir + '/' + filename + '.log'
  fs.appendFileSync(fname, `${t} ${data}${eol}`)
}

export default {
  debug: debug,
  debug_to: debug_to
}
