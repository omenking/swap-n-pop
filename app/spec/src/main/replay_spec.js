const APP = require('../../../app')('../../../')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const path      = require('path')

const app = {
  getPath: sinon.stub()
}
app.getPath.returns('/tmp')

const store = {
  set: sinon.stub(),
  get: sinon.stub()
}
store.set.withArgs('replay_dir').returns('/tmp/replays')
store.get.withArgs('replay_dir').returns('/tmp/replays')

const Replay    = require(APP.path.main('replay'))(app,store)

describe('Replay' ,function(){
  describe('#save(name,inputs)' ,function(){
    var filename = null;
    before(function(done) {
      const inputs = [[[-1,0,0x00]],[[-1,0,0x01]]]
      Replay.save('replay_spec','seed',inputs, function(err,data){
        if (err) { done(err) }
        filename = data
        done()
      })
    });

    it('should return filename', function(){
      filename.should.equal(path.join('/tmp','replays',"replay_spec.replay"))
    })
    it('file should exist', function(done){
      fs.access(filename,fs.constants.F_OK,function(err){
        err ? done(err) : done()
      })
    })
    it('file should contain seed and two records', function(done){
      fs.readFile(filename, 'utf8', function(err,data){
        if (err) { done(err) }
        data.should.equal("seed\n1,-1,0,1\n0,-1,0,0\n")
        done()
      })
    })

    it('cond2 when p1 empty', function(done){
      const inputs1 = [[[-1,0,0x20]],[]]
      Replay.save('replay_spec','seed',inputs1, function(err,fname){
        if (err) { done(err) }
        fs.readFile(fname, 'utf8', function(err,data){
          if (err) { done(err) }
          data.should.equal("seed\n0,-1,0,32\n")
          done()
        })
      })
    })

    it('cond1 when p2 empty', function(done){
      const inputs1 = [[],[[-1,0,0x80]]]
      Replay.save('replay_spec','seed',inputs1, function(err,fname){
        if (err) { done(err) }
        fs.readFile(fname, 'utf8', function(err,data){
          if (err) { done(err) }
          data.should.equal("seed\n1,-1,0,128\n")
          done()
        })
      })
    })

    after(function() {
      fs.unlink(filename,function(){})
    });
  })

  describe('#load(name)' ,function(){
    var filename = null;
    const name   = 'replay_spec'
    const inputs = [[[-1,0,0x20]],[[-1,0,0x20]]]
    before(function(done) {
      Replay.save(name,'seed',inputs,function(err,data){filename = data;done()})
    })

    it('should return seed and inputs', function(done){
      Replay.load(name,function(err,data){
        if (err) { done(err) }
        data.seed.should.eql('seed')
        data.inputs.should.eql(inputs)
        done()
      })
    })
    after(function() {
      fs.unlink(filename,function(){})
    });
  })

  describe('#last()' ,function(){
    var filename = null;
    const inputs = [[[12,0,0x80]],[[11,5,0x20]]]
    before(function(done) {
      Replay.save('zzz_last','seed',inputs,function(err,data){filename = data; done()})
    })
    it('return last filname', function(done){
      Replay.last(function(err,data){
        if (err) { done(err) }
        data.should.eql('zzz_last')
        done()
      })
    })
    after(function() {
      fs.unlink(filename,function(){})
    });
  })
})
