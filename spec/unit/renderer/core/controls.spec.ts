import game         from 'helpers/game_mock'
import CoreControls from 'core/controls'

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
class store_mock {
  constructor(){
    this.has = this.has.bind(this)
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }
  has(){}
  set(){}
  get(){}
}
store_mock.prototype.get = sinon.stub()
store_mock.prototype.get.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)
mock('store',store_mock)


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