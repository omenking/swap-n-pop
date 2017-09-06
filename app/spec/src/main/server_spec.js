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

  describe('#send(msg)' ,function(){
    it('should send message',function(done){
      const server = new Server()
      const client = new Server()
      server.create(40099,'127.0.0.1',function(){
        client.create(40001,'127.0.0.1',function(){
          client.connect(40099,'127.0.0.1',function(err,data){
            data.port.should.eql(40099)
            done(err)
          })
        })
      })


    })
  })
})
