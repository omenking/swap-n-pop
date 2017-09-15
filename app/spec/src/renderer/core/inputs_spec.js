const APP = require('../../../../app')('../../../../')
const chai  = require('chai')
const sinon = require('sinon')

const Game = require(APP.path.spec('helpers','game_spec'))
const game = new Game()
const CoreInputs = require(APP.path.core('inputs'))(game)

chai.should()

describe('Inputs', function() {
  describe('#pack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.inputs = [
        [0x00,0x00,0x00,0x20,0x20,0x10,0x10,0x10],
        []
      ]
      inputs.ack   = [5,3]
      inputs.tick  = 7
      inputs.pack().should.eql({
        frame_count: 5,
        frames: [
           // 00x0 0
           // 00x0 1
           // 00x0 2
           0x20,// 3
           0x20,// 4

           0x10,// 5
           0x10,// 6
           0x10 // 7
        ],
        ack0: 3,
        ack1: 5
      })
    }) // it
  }) // describe

  describe('#unpack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.inputs[1] = [0x00,0x20,0x00,0x10,0x20,0x16]
      inputs.ack = [5,3]
      inputs.unpack({
        ack0: 3, //last frame we acknowledge we recieved for their stack
        ack1: 0, //last frame they acknowledge to recieved about our stack
        frame_count: 10,
        frames: [
          0x20,0x16, // old frames we already have
          0x10,0x16,0x16,0x16,
          0x42,0x42,0x42,0x42
        ]
      }
      )
      inputs.inputs[1].should.eql([
        0x00,0x20,0x00,0x10,0x20,0x16, // old frames
        0x10,0x16,0x16,0x16, // + new frames
        0x42,0x42,0x42,0x42  // |
      ])
      inputs.ack[0].should.eql(13)
      inputs.ack[1].should.eql(0)

    }) // it
  }) // describe


})
