class store_mock {
  constructor(){
    this.has = this.has.bind(this)
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
  }
  has(){}
  set(){}
  get(){}
}
fake_electron_store.prototype.get = sinon.stub()
fake_electron_store.prototype.get.withArgs('inputs').returns(
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
)
mock('common/store',store_mock)
