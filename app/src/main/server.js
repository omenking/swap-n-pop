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
  }
  get host(){ return this.attr_host }
  get port(){ return this.attr_port }

  set host(val){ this.attr_host = val }
  set port(val){ this.attr_port = val }

  create(port,host){
    this.port = port ? port : 41234
    this.host = host ? host : '127.0.0.1'
    this.server = dgram.createSocket('udp4')
    this.server.on('error'    , this.error)
    this.server.on('message'  , this.message)
    this.server.on('listening', this.listening)
    this.server.bind(this.port,this.host)
  }
  error(err){
    console.log(`server error:\n${err.stack}`)
    this.server.close()
  }
  message(msg,rinfo){
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
  }
  listening(){
    const address = this.server.address()
    console.log(`server listening ${address.address}:${address.port}`)
  }
  send(val){
    const msg = new Buffer(val)
    this.server.send(msg, 0, msg.length, this.port, this.host, this.sent)
  }
  sent(err, bytes){
    if (err){throw err}
    console.log('UDP message sent to ' + this.host +':'+ this.port)
  }
  close(){
    this.server.close()
  }
} // klass
module.exports = controller
