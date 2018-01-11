import controls from 'core/controls'
controls.create()

describe('Controls', function() {
  describe('#serialize(pi)' ,function(){
    it('should get correct byte', function(){
      const fun = sinon.stub()
      fun.withArgs(false,'pl0_up'   ).returns(true)
      fun.withArgs(false,'pl0_down' ).returns(false)
      fun.withArgs(false,'pl0_left' ).returns(false)
      fun.withArgs(false,'pl0_right').returns(false)
      fun.withArgs(false,'pl0_a'    ).returns(false)
      fun.withArgs(false,'pl0_b'    ).returns(false)
      fun.withArgs(false,'pl0_r'    ).returns(false)
      fun.withArgs(false,'pl0_l'    ).returns(false)
      fun.withArgs(false,'pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x01)
    })
    it('should get correct byte', function(){
      const fun = sinon.stub()
      fun.withArgs(false,'pl0_up'   ).returns(true)
      fun.withArgs(false,'pl0_down' ).returns(false)
      fun.withArgs(false,'pl0_left' ).returns(false)
      fun.withArgs(false,'pl0_right').returns(false)
      fun.withArgs(false,'pl0_a'    ).returns(false)
      fun.withArgs(false,'pl0_b'    ).returns(true)
      fun.withArgs(false,'pl0_r'    ).returns(false)
      fun.withArgs(false,'pl0_l'    ).returns(false)
      fun.withArgs(false,'pl0_start').returns(false)
      controls.check_down = fun
      controls.serialize(0).should.eql(0x21)
    })
  })
}) //klass
