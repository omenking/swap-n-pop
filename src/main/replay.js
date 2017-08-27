module.exports = function(root_path){
  const path = require('path')
  const fs   = require('fs')
  const glob = require('glob')

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

    // We want to iterate through the inputs of player 1 and 2
    // and insert them based on frame(tick) so the .replay file
    // is garunteed to be sorted by frame data.
    for (i = 0; i < len; i++) {
      let pi;
      if      (inputs[0].length === 0 && inputs[1].length > 0) { pi = 1 } //cond2
      else if (inputs[1].length === 0 && inputs[0].length > 0) { pi = 0 } //cond1
      else if (inputs[0][0][0] <  inputs[1][0][0])             { pi = 0 } //cond3
      else                                                     { pi = 1 } //cond4
      file.write(`${pi},`+inputs[pi].shift().join(',')+"\n")
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

  function last(callback){
    var name = null
    glob(path.join(root_path,'replays','*.replay'),{},function(err,files){
      name = path.basename(files[files.length-1],'.replay')
      callback(err,name)
    })
  }

  return {
    save: save,
    load: load,
    last: last
  }
}
