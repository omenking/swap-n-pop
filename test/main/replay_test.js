const chai = require('chai')
chai.should()

const path      = require('path')
const root_path = path.join(__dirname,'..','..')
const Replay    = require(path.join(root_path,'src','main','replay'))(root_path)

describe('replay.save' ,function(){
  var filename = null;
  before(function() {
    filename = Replay.save('replay_spec',[
      [[-1,0,'000000']],
      [[-1,0,'000000']]
    ])
  });

  it('file return exist', function(){
    const replay_path = path.join(root_path,'replays',"replay_spec.replay")
    filename.should.equal(replay_path)
  })
})
