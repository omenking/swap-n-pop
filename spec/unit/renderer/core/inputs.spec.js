import Game       from 'helpers/game_mock'
import CoreInputs from 'core/inputs'

const game = new Game()

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
      inputs.inputs[1] = [0x00,0x00,0x01,0x01,0x02,0x02,0x00,0x00]
      inputs.tick  = 7
      inputs.ack = [5,0]
      inputs.stage = {roll: {ready: false, from: null, to: null}}
      inputs.unpack({
        ack0: 3, //last frame we acknowledge we recieved for their stack
        ack1: 0, //last frame they acknowledge to recieved about our stack
        frame_count: 11,
        frames: [
               0x01,0x02,0x02, // old frames we have (3-5)
          0x03,0x03,0x04,0x04,
          0x05,0x05,0x06,0x06
        ]
      })
      inputs.inputs[1].should.eql([
        0x00,0x00,0x01,0x01,0x02,0x02, // old frames
        0x03,0x03,0x04,0x04, // + new frames
        0x05,0x05,0x06,0x06  // |
      ])
      inputs.ack[0].should.eql(13)
      inputs.ack[1].should.eql(0)

    }) // it
  }) // describe

  describe('#unpack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.inputs[1] = [0x00,0x00,0x00,0x00,0x00,0x00]
      inputs.tick      = 5
      inputs.ack       = [0,0]
      inputs.stage = {roll: {ready: false, from: null, to: null}}
      inputs.unpack({
        ack0: 0,
        ack1: 0,
        frame_count: 2,
        frames: [0x00,0x00]
      })
      inputs.inputs[1].should.eql([
        0x00,0x00,0x00,0x00,0x00,0x00
      ])
      inputs.ack[0].should.eql(1)
      inputs.ack[1].should.eql(0)

    }) // it
  }) // describe

})
