import CoreInputs from 'core/inputs'

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

  /*
   * As player 1 I am on tick/frame 7 and in my inputs I have history
   * of all the inputs the other player has ever pressed each representing a tick.
   * So I should have an array of 8 inputs (since we count 0). The last two inputs
   * in the array are 0 because when we dont have data each tick we just put 0 in
   * 
   * The last frame I know I recieved from the other player was on tick 5
   * so I don't care about any data for a time equal or less than 5
   *
   * I know the last frame they recieved from me was 0 meaning they have yet
   * to get any data succesfully from me, even though I send out data every
   * single frame.
   *
   * I just recieved incoming data from the other player. They think the last
   * frame we recieved was 3 (however we have up to 5), and they still show they
   * haven't recieved any data from us because its 0. They are sending 11 frames of
   * data starting from frame 3
   *
   * We want to ignore frames 3 to 5 and store all the other frames for when we need
   * them.
   *
   * We now have up to frame 13, and we'll update ack0 so next time we pack we tell
   * we only want data starting frame 14
   *
   * Our game does not ned to roll forward because our tick comes before the data we need
   */
  describe('#unpack()', function(){
    it('should get', function(){
      const inputs = new CoreInputs(null,true)
      inputs.inputs[1] = [0x00,0x00,0x01,0x01,0x02,0x02, 0x00,0x00] // last two are empty inputs since we didn't have data
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
