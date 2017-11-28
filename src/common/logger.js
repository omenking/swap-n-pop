import electron from 'electron'
import path     from 'path'
import fs       from 'fs'
import fx       from 'mkdir-recursive'
import strftime from 'strftime'
import os       from 'os'

const eol = os.eol
const {app} = electron

function debug(data){
  let dir = path.join(app.getPath('appData'),'swap-n-pop','logs')

  if (!fs.existsSync(dir)){ 
    fx.mkdirSync(dir) 
  } // create dir if it don't exist.

  const t = strftime('[%d/%b/%Y:%H:%M:%S %z]')
  fs.appendFileSync(dir + '/production.log', `${t} ${data}${eol}`)
}

export default {
  debug: debug
}
