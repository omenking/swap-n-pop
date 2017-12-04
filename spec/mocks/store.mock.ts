const sinon = require('sinon')

const get_stub =  sinon.stub()
const set_stub =  sinon.stub()
get_stub.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)

set_stub.withArgs('replay_dir').returns('/tmp/replays')
get_stub.withArgs('replay_dir').returns('/tmp/replays')
class StoreMock {
  constructor(){
    this.has = sinon.stub()
    this.set = set_stub
    this.get = get_stub
  }
}

export default StoreMock
