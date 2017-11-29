import chai  from 'chai'
import sinon from 'sinon'
import mock  from 'mock-require'

mock('electron', {
  app: null,
  remote: { app: null},
  ipc: {
    on: sinon.stub()
  },
  ipcRenderer: {
    on: sinon.stub()
  }
}
)
class fake_electron_store {
  constructor(){
    this.has = this.has.bind(this)
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }
  has(){}
  set(){}
  get(){}
}
fake_electron_store.prototype.get = sinon.stub()
fake_electron_store.prototype.get.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)
mock('electron-store',fake_electron_store)

const game = require(APP.path.spec('helpers','game_spec'))
const CoreControls = require(APP.path.core('controls'))(game)

chai.should()

describe('Controls', function() {
  describe('#serialize(pi)' ,function(){
    it('should get correct byte', function(){
      const controls = new CoreControls()
      const fun = sinon.stub()
      fun.withArgs('pl0_up'   ).returns(true)
      fun.withArgs('pl0_down' ).returns(false)
      fun.withArgs('pl0_left' ).returns(false)
      fun.withArgs('pl0_right').returns(false)
      fun.withArgs('pl0_a'    ).returns(false)
      fun.withArgs('pl0_b'    ).returns(false)
      fun.withArgs('pl0_r'    ).returns(false)
      fun.withArgs('pl0_l'    ).returns(false)
      fun.withArgs('pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x01)
    })
    it('should get correct byte', function(){
      const controls = new CoreControls()
      const fun = sinon.stub()
      fun.withArgs('pl0_up'   ).returns(true)
      fun.withArgs('pl0_down' ).returns(false)
      fun.withArgs('pl0_left' ).returns(false)
      fun.withArgs('pl0_right').returns(false)
      fun.withArgs('pl0_a'    ).returns(false)
      fun.withArgs('pl0_b'    ).returns(true)
      fun.withArgs('pl0_r'    ).returns(false)
      fun.withArgs('pl0_l'    ).returns(false)
      fun.withArgs('pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x21)
    })
  })
}) //klass
