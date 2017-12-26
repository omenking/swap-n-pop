function move_to(counter,v_start : number, v_end : number){
  const diff = v_end - v_start
  return v_start + ((diff/60) * (60-counter))
}

describe('#move_to' ,function(){
  it('should be at start',function(){
    expect(move_to(60,50,100)).eql(50))
    expect(move_to(60,-50,100)).eql(-50))
    expect(move_to(60,100,50)).eql(100))
  })
  it('should be at end',function(){
    expect(move_to(0,50,100)).eql(100))
    expect(move_to(0,100,50)).eql(50))
    expect(move_to(0,100,50)).eql(50))
  })
})
