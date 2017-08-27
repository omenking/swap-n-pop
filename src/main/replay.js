module.exports = function(root_path){
  const path = require('path')
  const fs   = require('fs')

  function save(name,org_inputs,callback) {
    //need to clone because we are shifting and want to keep
    //the data passed in, entact.
    var inputs = JSON.parse(JSON.stringify(org_inputs))

    const dir      = path.join(root_path,'replays')
    const filename = path.join(dir,`${name}.replay`)

    if (!fs.existsSync(dir)){ fs.mkdirSync(dir); } // create dir if it don't exist.
    fs.unlink(filename,function(){})

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
    file.on('error', function(err) {
      callback(err,filename);
    });
    file.on('finish', function() {
      callback(null,filename);
    });
  }

  function load(name,callback){
    const dir      = path.join(root_path,'replays')
    const filename = path.join(dir,`${name}.replay`)
    var   inputs   = [[],[]]
    fs.readFile(filename, 'utf8', function(err,data){
      for (line of data.trim().split("\n")) {
        let arr = line.split(',')
        inputs[parseInt(arr[0])].push([parseInt(arr[1]),parseInt(arr[2]),arr[3]])
      }
      callback(err,inputs)
    })
  }

  return {
    save: save,
    load: load
  }
}
