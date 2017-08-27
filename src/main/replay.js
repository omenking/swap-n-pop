module.exports = function(root_path){
  const path = require('path')
  const fs   = require('fs')

  function save(inputs) {
    const dir      = path.join(root_path,'replays')
    const filename = path.join(dir,`${Date.now()}.replay`)

    if (!fs.existsSync(dir)){ fs.mkdirSync(dir); } // create dir if it don't exist.

    const file = fs.createWriteStream(filename, {flags: 'a'})
    const len = inputs[0].length + inputs[1].length

    for (i = 0; i < len; i++) {
      if (inputs[0].length === 0 && inputs[1].length > 0) {
        file.write("1,"+inputs[1].shift().join(',')+"\n")
      }
      else if (inputs[0].length > 0 && inputs[1].length === 0) {
        file.write("0,"+inputs[0].shift().join(',')+"\n")
      }
      else if (inputs[1][0][0] >= inputs[0][0][0].length) {
        file.write("0,"+inputs[0].shift().join(',')+"\n")
      }
      else {
        file.write("1,"+inputs[1].shift().join(',')+"\n")
      }
    }
    file.end()
  }

  return {
    save: save
  }
}
