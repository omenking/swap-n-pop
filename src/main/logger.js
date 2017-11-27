module.exports = function(app){
  const path     = require('path')
  const fs       = require('fs')
  const fx       = require('mkdir-recursive')
  const strftime = require('strftime')
  const eol      = require('os').EOL

  function debug(data){
    let dir = path.join(app.getPath('appData'),'swap-n-pop','logs')

    if (!fs.existsSync(dir)){ 
      fx.mkdirSync(dir) 
    } // create dir if it don't exist.

    const t = strftime('[%d/%b/%Y:%H:%M:%S %z]')
    fs.appendFileSync(dir + '/production.log', `${t} ${data}${eol}`)
  }

  return {
    debug: debug
  }
}
