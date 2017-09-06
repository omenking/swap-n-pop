const dgram  = require('dgram')

class controller {
  constructor() {
    this.create    = this.create.bind(this)
    this.error     = this.error.bind(this)
    this.message   = this.message.bind(this)
    this.listening = this.listening.bind(this)
    this.send      = this.send.bind(this)
    this.sent      = this.sent.bind(this)
    this.close     = this.close.bind(this)
    this.connect     = this.connect.bind(this)
  }
  get state(){ return this._state }

  get address(){ return `${this.host}:${this.port}` }
  get host(){ return this._host }
  get port(){ return this._port }
  get send_address(){ return `${this.send_host}:${this.send_port}` }
  get send_host(){ return this._send_host }
  get send_port(){ return this._send_port }

  set host(val){ this._host = val }
  set port(val){ this._port = val }
  set send_host(val){ this._send_host = val }
  set send_port(val){ this._send_port = val }

  create(port,host,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this._state  = 'inactive'
    this.port    = port
    this.host    = host
    this.server = dgram.createSocket('udp4')
    this.server.on('error'    , this.error)
    this.server.on('message'  , this.message)
    this.server.on('listening', this.listening(callback))
    this.server.bind(this.port,this.host)
  }
  connect(port,host,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this._connected = callback
    this._state    = 'connecting'
    this.send_port = port
    this.send_host = host
    const msg = new Buffer('CON')
    this.server.send(msg, 0, msg.length, this.send_port, this.send_host, this.sent)
  }
  error(err){
    console.log(`server error:\n${err.stack}`)
    this.server.close()
  }
  message(msg,req){
    console.log(`${this.address} >| ${req.address}:${req.port} :::${msg}`)
    if (`${msg}` === 'CON' && this.state === 'listening'){
      this.send_port = req.port
      this.send_host = req.address
      this.send('XCON')
    } else if (`${msg}` === 'XCON' && this.state === 'connecting'){
      this._state = 'connected'
      if (this.send_port === req.port && this.send_host === req.address){
        this._connected(null,{port: req.port, host: req.address})
      } else {
        this._connected("port and host don't match",{port: req.port, host: req.address})
      }
    } else {
      console.log(`${msg}`,this.state)
      throw(new Error('no where to go'))
    }
  }
  listening(callback){
    return function(){
      this._state  = 'listening'
      const address = this.server.address()
      console.log(`${address.address}:${address.port} :::listening`)
      if (callback){callback()}
    }.bind(this)
  }
  send(val){
    if(this.send_port === null) { throw(new Error('port can not be null')) }
    if(this.send_host === null) { throw(new Error('host can not be null')) }
    const msg = new Buffer(val)
    this.server.send(msg, 0, msg.length, this.send_port, this.send_host, this.sent)
  }
  sent(err, bytes){
    if (err){throw err}
    console.log(`${this.address} -> ${this.send_address} :::${bytes}`)
  }
  close(){
    this.server.close()
  }
} // klass
module.exports = controller
