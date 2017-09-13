const APP = require('../../../../app')('../../../../')
const chai  = require('chai')
const sinon = require('sinon')

const game = require(APP.path.spec('helpers','game_spec'))
const CoreInputs = require(APP.path.core('inputs'))(game)

chai.should()

describe('Inputs', function() {
  describe('#at(tick)', function(){
    it('should get', function(){
      const online = {
        on: sinon.stub()
      }
      const inputs = new CoreInputs(null,online)
      inputs.inputs = [[
        [-1,2,0x00],
        [ 2,2,0x20],
        [ 5,2,0x10],
        [ 8,2,0x01],
      ]]
      inputs.at(-1).should.eql(0x00)
      inputs.at(0).should.eql(0x00)
      inputs.at(1).should.eql(0x00)
      inputs.at(2).should.eql(0x20)
      inputs.at(3).should.eql(0x20)
      inputs.at(4).should.eql(0x20)
      inputs.at(5).should.eql(0x10)
      inputs.at(6).should.eql(0x10)
      inputs.at(7).should.eql(0x10)
      inputs.at(8).should.eql(0x01)
      inputs.at(9).should.eql(0x01)
      inputs.at(10).should.eql(0x01)
    })
  })

  describe('#pack()', function(){
    it('should get', function(){
      const online = { on: sinon.stub() }
      const inputs = new CoreInputs(null,online)
      inputs.inputs = [[
        [-1,2,0x00],
        [ 2,2,0x20],
        [ 5,2,0x10],
        [ 8,2,0x01],
      ]]
      inputs.acked[1] = 3
      inputs.tick    = 10
      inputs.pack().should.eql([
       0x20,// 3
       0x20,// 4
       0x10,// 5
       0x10,// 6
       0x10,// 7
       0x01,// 8
       0x01,// 9
       0x01 // 10
      ])
    }) // it
  }) // describe

  describe('#unpack()', function(){
    it('should get', function(){
      const online = { on: sinon.stub() }
      const inputs = new CoreInputs(null,online)
      inputs.inputs = [
        [[-1,0,0x00]], // frame, times, inputs
        [[-1,0,0x00]]
      ]

      inputs.acked[0] = -1
      inputs.unpack(
        [0x20,
         0x10,0x10,
         0x16,0x16,0x16,
         0x42,0x42,0x42,0x42
        ]
      )
      inputs.inputs[1].should.eql([
        [-1,0,0x00],
        [ 0,0,0x20],
        [ 1,1,0x10],
        [ 3,2,0x16],
        [ 6,3,0x42]
      ])

    }) // it
  }) // describe
})
