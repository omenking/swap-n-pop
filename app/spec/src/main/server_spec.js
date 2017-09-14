const APP = require('../../../app')('../../../')
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

  describe('#signal(k,data)' ,function(){
    it('should match',function(){
      const server = new Server()
      console.log(Buffer.from([0x00]))
      server.create(40101,'127.0.0.1')
      server.signal('connecting').should.eql(Buffer.from([0x00]))
      server.signal('connected').should.eql(Buffer.from([0x01]))
      server.signal('ping',1).should.eql(Buffer.from([0x02,0x01]))
      server.signal('pong',1).should.eql(Buffer.from([0x03,0x01]))
      //server.signal('framedata',null).should.eql(Buffer.from([0x04,0x00]))
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

  describe('#msg(buf)' ,function(){
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


  describe('#ping()' ,function(){
    it('should ping and pong',function(done){
      const server = new Server()
      const client = new Server()
      server.create(40099,'127.0.0.1',function(){
        client.create(40001,'127.0.0.1',function(){
          server.connected(function(err,data){
            client.on('pong',function(){
              console.log('pp',client.ping_time)
              done()
              server.close()
              client.close()
            })
            client.ping()
          })
          client.connect(40099,'127.0.0.1',function(){
          })

        })
      })
    }) // it
  }) // describe

  describe('#test()' ,function(){
    it('should',function(){
      const num  = 768290
      const size = Math.ceil(num.toString(2).length / 8)
      const arr  = new Array(size+1).fill(null)
      arr[0] = 0x02
      console.log('arr',arr)
      const buf  = Buffer.from(arr)
      buf.writeUIntBE(num,1,size)
      console.log('b',buf)
      console.log('b2',buf.readUIntBE(1,size))
      //console.log('buf',buf)
    }) // it
  }) // describe

  describe('#buf_framedata(v,data)' ,function(){
    it('should',function(){
      const server = new Server()
      const buf = Buffer.from([
        0x04, //signal
        0x03, //frame_count eg. 3
        0x02, //ack0 size 2
        0x03, //ack1 size 3
        0x20, //f1
        0x10, //f2
        0x00, //f3

        0x27, // uint eg. 10102
        0x76,

        0x0b,// unit eg. 768290
        0xb9,
        0x22
      ])
      server.buf_framedata(0x04,{
        frame_count: 3,
        frames: [0x20,0x10,0x00],
        ack0: 10102,
        ack1: 768290
      }).should.eql(buf)
    }) // it
  }) // describe

  describe('#msg_framedata(buf)' ,function(){
    it('should',function(){
      const server = new Server()
      const buf = Buffer.from([
        0x04, //signal
        0x03, //frame_count eg. 3
        0x02, //ack0 size 2
        0x03, //ack1 size 3
        0x20, //f1
        0x10, //f2
        0x00, //f3

        0x27, // uint eg. 10102
        0x76,

        0x0b,// unit eg. 768290
        0xb9,
        0x22
      ])
      server.msg_framedata(buf).should.eql({
        frame_count: 3,
        frames: [0x20,0x10,0x00],
        ack0: 10102,
        ack1: 768290
      })
    }) // it
  }) // describe
})
