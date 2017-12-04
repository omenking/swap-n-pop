import CoreControls from 'core/controls'

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
