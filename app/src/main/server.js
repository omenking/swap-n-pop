const dgram  = require('dgram')

class controller {
  constructor() {
    this.create    = this.create.bind(this)
    this.error     = this.error.bind(this)
    this.message   = this.message.bind(this)
    this.signal    = this.signal.bind(this)
    this.msg       = this.msg.bind(this)

    this.listening = this.listening.bind(this)
    this.send      = this.send.bind(this)
    this.sent      = this.sent.bind(this)
    this.close     = this.close.bind(this)
    this.connect   = this.connect.bind(this)
    this.connected = this.connected.bind(this)
    this.on        = this.on.bind(this)
    this.ping      = this.ping.bind(this)
    this.pong      = this.pong.bind(this)
  }
  get state(){ return this._state }

  get address(){ return `${this.host}:${this.port}` }
  get host(){ return this._host }
  get port(){ return this._port }
  get send_address(){ return `${this.send_host}:${this.send_port}` }
  get send_host(){ return this._send_host }
  get send_port(){ return this._send_port }

  set host(v){ this._host = v }
  set port(v){ this._port = v }
  set send_host(v){ this._send_host = v }
  set send_port(v){ this._send_port = v }

  create(port,host,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this.states  = {}
    this._state  = 'inactive'
    this.port    = port
    this.host    = host
    this.server = dgram.createSocket('udp4')
    this.server.on('error'    , this.error)
    this.server.on('message'  , this.message)
    this.server.on('listening', this.listening(callback))
    this.server.bind(this.port,this.host)
    this.on('ping',function(data){
      this.pong(data)
    }.bind(this))
  }
  on(key,callback){
    this.states[key] = callback
  }
  connected(callback){
    this._state     = 'awaiting'
    this._connected = callback
  }
  connect(port,host,callback){
    if(port === null) { throw(new Error('port can not be null')) }
    if(host === null) { throw(new Error('host can not be null')) }
    this._connected = callback
    this._state    = 'connecting'
    this.send_port = port
    this.send_host = host
    this.send('connecting')
  }
  error(err){
    console.log(`server error:\n${err.stack}`)
    this.server.close()
  }
  signal(k,data){
         if (k === 'connecting') {return Buffer.from([0x00])}
    else if (k === 'connected')  {return Buffer.from([0x01])}
    else if (k === 'ping') {
      //write integer to buffer
      const size = Math.ceil(data.toString(2).length / 8)
      const arr  = new Array(size+1).fill(null)
      arr[0] = 0x02
      const buf  = Buffer.from(arr)
      buf.writeUIntBE(data,1,size)
      return buf
    }
    else if (k === 'pong') {
      const size = Math.ceil(data.toString(2).length / 8)
      const arr  = new Array(size+1).fill(null)
      arr[0] = 0x03
      const buf  = Buffer.from(arr)
      buf.writeUIntBE(data,1,size)
      return buf
    }
    else if (k === 'framedata')  {return Buffer.from([0x04].concat(data))}
    else {throw(new Error("no idea what you want to send"))}
  }
  // 0x00 - connecting
  // 0x01 - connected
  // 0x02 - ping
  // 0x03 - pong
  // 0x04 - framedata
  msg(buf){
         if (buf[0] === 0x00 && buf.length === 1) {return ['connecting',null]}
    else if (buf[0] === 0x01 && buf.length === 1) {return ['connected' ,null]}
    else if (buf[0] === 0x02                    ) {return ['ping'      ,buf.readUIntBE(1,buf.length-1)]}
    else if (buf[0] === 0x03                    ) {return ['pong'      ,buf.readUIntBE(1,buf.length-1)]}
    else if (buf[0] === 0x04)                     {return ['framedata' ,buf] }
    else {throw(new Error("no idea what you go"))}
  }
  message(buf,req){
    console.log(`${this.address} >| ${req.address}:${req.port} :::${buf}`)

    const [sig,data] = this.msg(buf)

    if (sig === 'connecting' && this.state === 'awaiting'){
      this._state = 'connected'
      this._connected(null,true)
      this.send_port = req.port
      this.send_host = req.address
      this.send('connected')
    } else if (sig === 'connected' && this.state === 'connecting'){
      this._state = 'connected'
      if (this.send_port === req.port && this.send_host === req.address){
        this._connected(null,{port: req.port, host: req.address})
      } else {
        this._connected("port and host don't match",{port: req.port, host: req.address})
      }
    } else {
      if (this.states[sig]) {
        this.states[sig](data)
      } else {
        throw(new Error('no idea where to go'))
      }
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
  send(name,data){
    const buf = this.signal(name,data)
    if(this.send_port === null) { throw(new Error('port can not be null')) }
    if(this.send_host === null) { throw(new Error('host can not be null')) }
    this.server.send(buf, 0, buf.length, this.send_port, this.send_host, this.sent)
  }
  sent(err, bytes){
    if (err){throw err}
    console.log(`${this.address} -> ${this.send_address} :::${bytes}`)
  }
  ping(){
    this.send('ping',new Date().getTime())
  }
  pong(data){
    // fake delay between 20ms to 2s
    const s = Math.floor(Math.random() * (20 - 2 + 1)) + 2
    //setTimeout(function(){
      this.send('pong',data)
    //}.bind(this),s*10)
  }
  close(){
    this.server.close()
  }
} // klass
module.exports = controller
