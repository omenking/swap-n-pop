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
        [0,2,0x00],
        [3,2,0x20],
        [6,2,0x10],
        [9,2,0x01],
      ]]
      inputs.at(0).should.eql(0x00)
      inputs.at(1).should.eql(0x00)
      inputs.at(2).should.eql(0x00)
      inputs.at(3).should.eql(0x20)
      inputs.at(4).should.eql(0x20)
      inputs.at(5).should.eql(0x20)
      inputs.at(6).should.eql(0x10)
      inputs.at(7).should.eql(0x10)
      inputs.at(8).should.eql(0x10)
      inputs.at(9).should.eql(0x01)
      inputs.at(10).should.eql(0x01)
      inputs.at(11).should.eql(0x01)
    })
  })

  describe('#pack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.inputs = [[
        [0,2,0x00],
        [3,1,0x20],
        [5,2,0x10],
        [8,2,0x01],
      ]]
      inputs.ack   = [5,3]
      inputs.tick  = 10
      inputs.pack().should.eql({
        frame_count: 8,
        frames: [
           // 00x0 0
           // 00x0 1
           // 00x0 2
           0x20,// 3
           0x20,// 4

           0x10,// 5
           0x10,// 6
           0x10,// 7

           0x01,// 8
           0x01,// 9
           0x01 // 10
        ],
        ack0: 3,
        ack1: 5
      })
    }) // it
  }) // describe

  describe('#unpack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.ack = [5,0]
      inputs.unpack({
        ack0: 5,
        ack1: 0,
        frame_count: 10,
        frames: [
          0x20,
          0x10,0x10,
          0x16,0x16,0x16,
          0x42,0x42,0x42,0x42
        ]
      }
      )
      inputs.inputs[1].should.eql([
        [0,0,0x00],
        [1,0,0x20],
        [2,1,0x10],
        [4,2,0x16],
        [7,3,0x42]
      ])
      inputs.ack[0].should.eql(10)
      inputs.ack[1].should.eql(0)

    }) // it
  }) // describe
})
