const APP = require('swap-n-pop_app')
const fs   = require('fs')
const chai = require('chai')
chai.should()

const Server = require(APP.path.main('server'))

describe('Server' ,function(){
  describe('#create()' ,function(){
    it('default to port 41234 host 127.0.0.1',function(){
      const server = new Server()
      server.create()
      server.close()
    })
    it('should be able to change port and host',function(){
      const server = new Server()
      server.create(41235,'127.0.0.2')
      server.close()
    })
  })

  describe('#send(msg)' ,function(){
    it('should send message',function(){
      const server = new Server()
      server.create()
      server.send('hello!')
    })
  })
})
