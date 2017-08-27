const fs   = require('fs')
const chai = require('chai')
chai.should()

const path      = require('path')
const root_path = path.join(__dirname,'..','..')
const Replay    = require(path.join(root_path,'src','main','replay'))(root_path)

describe('replay.save(name,inputs)' ,function(){
  var filename = null;
  before(function() {
    filename = Replay.save('replay_spec',[
      [[-1,0,'000000']],
      [[-1,0,'000000']]
    ])
  });

  it('should return filename', function(){
    filename.should.equal(path.join(root_path,'replays',"replay_spec.replay"))
  })
  it('file should exist', function(done){
    fs.access(filename,fs.constants.F_OK,function(err){
      err ? done(err) : done()
    })
  })
  it('file should contain two records', function(done){
    fs.readFile(filename, 'utf8', function(err,data){
      if (err) { done(err) }
      data.should.equal("1,-1,0,000000\n0,-1,0,000000\n")
      done()
    })
  })
})
