const APP = require('swap-n-pop_app')
const fs   = require('fs')
const chai = require('chai')
chai.should()

const Server = require(APP.path.main('server'))

describe('Server' ,function(){
  describe('#create()' ,function(){
    it('should be able to change port and host',function(){
      const server = new Server()
      server.create(41235,'127.0.0.2')
      server.close()
    })
  })

  describe('#signal(k)' ,function(){
    it('should match',function(){
      const server = new Server()
      console.log(Buffer.from([0x00]))
      server.create(40101,'127.0.0.1')
      server.signal('connecting').should.eql(Buffer.from([0x00]))
      server.signal('connected').should.eql(Buffer.from([0x01]))
      server.close()
    }) // it

    it('should error', function(){
      (function(){
        const server = new Server()
        server.create(40101,'127.0.0.1')
        server.close()
        server.signal('test')
      }).should.throw("no idea what you want to send")
    })
  }) // describe

  describe('#msg(bug)' ,function(){
    it('should match',function(){
      const server = new Server()
      server.create(40101,'127.0.0.1')
      server.msg(Buffer.from([0x00])).should.eql(['connecting',null])
      server.msg(Buffer.from([0x01])).should.eql(['connected',null])
      server.close()
    }) // it

    it('should error', function(){
      (function(){
        const server = new Server()
        server.create(40101,'127.0.0.1')
        server.close()
        server.msg('test')
      }).should.throw("no idea what you go")
    })


  }) // describe

  describe('#connect()' ,function(){
    it('should connect',function(done){
      const server = new Server()
      const client = new Server()
      server.create(40099,'127.0.0.1',function(){
        client.create(40001,'127.0.0.1',function(){
          server.connected(function(err,data){})
          client.connect(40099,'127.0.0.1',function(err,data){
            data.port.should.eql(40099)
            done(err)
            server.close()
            client.close()
          }) //client.connect
        }) //client.create
      }) //server.create
    }) // it
  }) // describe

  describe('#connected()' ,function(){
    it('should detect connected',function(done){
      const server = new Server()
      const client = new Server()
      server.create(40099,'127.0.0.1',function(){
        client.create(40001,'127.0.0.1',function(){
          server.connected(function(err,data){
            data.should.eql(true)
            done(err)
            server.close()
            client.close()
          })
          client.connect(40099,'127.0.0.1',function(){
          })
        })
      }) //server.create
    }) // it
  }) // describe
})
