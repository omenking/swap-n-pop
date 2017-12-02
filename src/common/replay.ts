import * as electron from 'electron'
import store         from 'common/store'
import * as path     from 'path'
import * as fs       from 'fs'
import fx            from 'mkdir-recursive'
import glob          from 'glob'
import * as crypto   from 'crypto'

const {app} = electron

function list(callback){
  let dir = path.join(store.get('replay_dir'),'*.replay')
  glob(dir,{},function(err,files){
    let filenames = []
    for (let file of files){
      filenames.push(
        path.basename(file,'.replay')
      )
    }
    callback(err,filenames)
  })
}

function del(name){
  const dir      = store.get('replay_dir')
  const filename = path.join(dir,`${name}.replay`)
  fs.unlink(filename,function(){}) //delets file if happens to already exist
}

function dir(state,dir){
  if(state === 'change' && (dir === null || dir === undefined)){
    console.log(state,dir)
    throw(new Error('must pass a directory'))
  }
  if (state === 'reset'){
    dir = path.join(app.getPath('appData'),'swap-n-pop','replays')
    store.set('replay_dir',dir)
  } else if (state === 'change'){
    store.set('replay_dir',dir)
  } else {
    if (store.has('replay_dir')){
      dir = store.get('replay_dir')
    } else {
      dir = path.join(app.getPath('appData'),'swap-n-pop','replays')
      store.set('replay_dir',dir)
    }
  }
  if (!fs.existsSync(dir)){ fx.mkdirSync(dir); } // create dir if it don't exist.
  return dir
}

function save(name,seed,inputs,callback) {

  const dir      = store.get('replay_dir')
  const filename = path.join(dir,`${name}.replay`)

  if (!fs.existsSync(dir)){ fx.mkdirSync(dir); } // create dir if it don't exist.
  fs.unlink(filename,function(){}) //delets file if happens to already exist

  const int0     = inputs[0].length
  const int1     = inputs[1].length

  const lens     = seed.length
  const len0     = Math.ceil(int0.toString(2).length / 8)
  const len1     = Math.ceil(int1.toString(2).length / 8)

  const frames   = inputs[0].concat(inputs[1])

  const buf_len    = Buffer.from([lens,len0,len1])
  const buf_seed   = Buffer.from(seed, 'ascii')
  const buf_int0   = Buffer.allocUnsafe(len0)
  const buf_int1   = Buffer.allocUnsafe(len1)
  const buf_frames = Buffer.from(frames)

  buf_int0.writeUIntBE(int0,0,len0)
  buf_int1.writeUIntBE(int1,0,len1)

  const buf = Buffer.concat([
    buf_len,
    buf_seed,
    buf_int0,
    buf_int1,
    buf_frames
  ],
      buf_len.length
    + buf_seed.length
    + buf_int0.length
    + buf_int1.length
    + buf_frames.length
  )

  fs.writeFile(filename,buf,'binary',function(err) {
    callback(err,filename)
  })
}

function load(name,callback){
  const dir      = store.get('replay_dir')
  const filename = path.join(dir,`${name}.replay`)
  var   inputs   = [[],[]]
  var   seed     = null
  fs.readFile(filename, function(err,buf){
    const lens = buf[0]
    const len0 = buf[1]
    const len1 = buf[2]
    const bufs = Buffer.allocUnsafe(lens)
    buf.copy(bufs,0,3,3+lens)
    const seed = bufs.toString('ascii')
    const int0 = buf.readUIntBE(3+lens,len0)
    const int1 = buf.readUIntBE(3+lens+len0,len1)

    let len = 3+lens+len0+len1
    const buf0 = Buffer.allocUnsafe(int0)
    const buf1 = Buffer.allocUnsafe(int1)
    buf.copy(buf0,0,len,len+int0)
    buf.copy(buf1,0,len+int0,len+int0+int1)
    let a0 = Array.prototype.slice.call(buf0, 0)
    let a1 = Array.prototype.slice.call(buf1, 0)

    callback(err,{seed: seed, inputs: [a0,a1]})
  })
}

function random_seed (howMany=16, chars) {
  chars = chars || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789"
  var rnd = crypto.randomBytes(howMany)
      , value = new Array(howMany)
      , len = chars.length

  for (var i = 0; i < howMany; i++) {
    value[i] = chars[rnd[i] % len]
  }

  return value.join('');
}


export default {
  list: list,
  dir : dir,
  del: del,
  save: save,
  load: load,
  random_seed: random_seed
}
