const get_stub =  sinon.stub()
get_stub.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)
class store_mock {
  constructor(){
    this.has = sinon.stub()
    this.set = sinon.stub()
    this.get = get_stub
  }
}
export default store_mock
