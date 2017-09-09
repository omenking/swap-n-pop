module.exports = function(root_path){
  const path   = require('path')
  const fs     = require('fs')
  const glob   = require('glob')
  const crypto = require('crypto')

  function save(name,seed,org_inputs,callback) {
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
    file.write(seed+"\n")
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
    var   seed     = null
    fs.readFile(filename, 'utf8', function(err,data){
      const lines = data.trim().split("\n")
      for (i = 0; i < lines.length; i++) {
        if (i === 0) {
          seed = lines[i]
        } else {
          let arr = lines[i].split(',')
          inputs[parseInt(arr[0])].push(
            [parseInt(arr[1]),
             parseInt(arr[2]),
             parseInt(arr[3])]
          )
        }
      }
      callback(err,{seed: seed, inputs: inputs})
    })
  }

  function last(callback){
    var name = null
    glob(path.join(root_path,'replays','*.replay'),{},function(err,files){
      name = path.basename(files[files.length-1],'.replay')
      callback(err,name)
    })
  }

  function random_seed (howMany=16, chars) {
    chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
    var rnd = crypto.randomBytes(howMany)
        , value = new Array(howMany)
        , len = chars.length;

    for (var i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };

    return value.join('');
  }


  return {
    save: save,
    load: load,
    last: last,
    random_seed: random_seed
  }
}
