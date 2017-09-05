const APP        = require('swap-n-pop_app')
const chai       = require('chai')
const _f         = require(APP.path.core('filters'))

chai.should()

describe('_f', function() {
  // excessive? yeah, but it was annoying me.
  describe('xy2i' ,function(){
    it('0,0 should be 0', function(){ _f.xy2i(0,0).should.eql(0) })
    it('1,0 should be 1', function(){ _f.xy2i(1,0).should.eql(1) })
    it('2,0 should be 2', function(){ _f.xy2i(2,0).should.eql(2) })
    it('3,0 should be 3', function(){ _f.xy2i(3,0).should.eql(3) })
    it('4,0 should be 4', function(){ _f.xy2i(4,0).should.eql(4) })
    it('5,0 should be 5', function(){ _f.xy2i(5,0).should.eql(5) })

    it('1,0 should be 6', function(){  _f.xy2i(0,1).should.eql(6) })
    it('1,1 should be 7', function(){  _f.xy2i(1,1).should.eql(7) })
    it('1,2 should be 8', function(){  _f.xy2i(2,1).should.eql(8) })
    it('1,3 should be 9', function(){  _f.xy2i(3,1).should.eql(9) })
    it('1,4 should be 10', function(){ _f.xy2i(4,1).should.eql(10) })
    it('1,5 should be 11', function(){ _f.xy2i(5,1).should.eql(11) })

    it('2,0 should be 12', function(){ _f.xy2i(0,2).should.eql(12) })
    it('2,1 should be 13', function(){ _f.xy2i(1,2).should.eql(13) })
    it('2,2 should be 14', function(){ _f.xy2i(2,2).should.eql(14) })
    it('2,3 should be 15', function(){ _f.xy2i(3,2).should.eql(15) })
    it('2,4 should be 16', function(){ _f.xy2i(4,2).should.eql(16) })
    it('2,5 should be 17', function(){ _f.xy2i(5,2).should.eql(17) })

    it('3,0 should be 18', function(){ _f.xy2i(0,3).should.eql(18) })
    it('3,1 should be 19', function(){ _f.xy2i(1,3).should.eql(19) })
    it('3,2 should be 20', function(){ _f.xy2i(2,3).should.eql(20) })
    it('3,3 should be 21', function(){ _f.xy2i(3,3).should.eql(21) })
    it('3,4 should be 22', function(){ _f.xy2i(4,3).should.eql(22) })
    it('3,5 should be 23', function(){ _f.xy2i(5,3).should.eql(23) })

    it('4,0 should be 24', function(){ _f.xy2i(0,4).should.eql(24) })
    it('4,1 should be 25', function(){ _f.xy2i(1,4).should.eql(25) })
    it('4,2 should be 26', function(){ _f.xy2i(2,4).should.eql(26) })
    it('4,3 should be 27', function(){ _f.xy2i(3,4).should.eql(27) })
    it('4,4 should be 28', function(){ _f.xy2i(4,4).should.eql(28) })
    it('4,5 should be 29', function(){ _f.xy2i(5,4).should.eql(29) })

    it('0,5 should be 30', function(){ _f.xy2i(0,5).should.eql(30) })
    it('1,5 should be 31', function(){ _f.xy2i(1,5).should.eql(31) })
    it('2,5 should be 32', function(){ _f.xy2i(2,5).should.eql(32) })
    it('3,5 should be 33', function(){ _f.xy2i(3,5).should.eql(33) })
    it('4,5 should be 34', function(){ _f.xy2i(4,5).should.eql(34) })
    it('5,5 should be 35', function(){ _f.xy2i(5,5).should.eql(35) })

    it('0,6 should be 36', function(){ _f.xy2i(0,6).should.eql(36) })
    it('1,6 should be 37', function(){ _f.xy2i(1,6).should.eql(37) })
    it('2,6 should be 38', function(){ _f.xy2i(2,6).should.eql(38) })
    it('3,6 should be 39', function(){ _f.xy2i(3,6).should.eql(39) })
    it('4,6 should be 40', function(){ _f.xy2i(4,6).should.eql(40) })
    it('5,6 should be 41', function(){ _f.xy2i(5,6).should.eql(41) })

    it('0,7 should be 42', function(){ _f.xy2i(0,7).should.eql(42) })
    it('1,7 should be 43', function(){ _f.xy2i(1,7).should.eql(43) })
    it('2,7 should be 44', function(){ _f.xy2i(2,7).should.eql(44) })
    it('3,7 should be 45', function(){ _f.xy2i(3,7).should.eql(45) })
    it('4,7 should be 46', function(){ _f.xy2i(4,7).should.eql(46) })
    it('5,7 should be 47', function(){ _f.xy2i(5,7).should.eql(47) })

    it('0,8 should be 48', function(){ _f.xy2i(0,8).should.eql(48) })
    it('1,8 should be 49', function(){ _f.xy2i(1,8).should.eql(49) })
    it('2,8 should be 50', function(){ _f.xy2i(2,8).should.eql(50) })
    it('3,8 should be 51', function(){ _f.xy2i(3,8).should.eql(51) })
    it('4,8 should be 52', function(){ _f.xy2i(4,8).should.eql(52) })
    it('5,8 should be 53', function(){ _f.xy2i(5,8).should.eql(53) })

    it('0,9 should be 54', function(){ _f.xy2i(0,9).should.eql(54) })
    it('1,9 should be 55', function(){ _f.xy2i(1,9).should.eql(55) })
    it('2,9 should be 56', function(){ _f.xy2i(2,9).should.eql(56) })
    it('3,9 should be 57', function(){ _f.xy2i(3,9).should.eql(57) })
    it('4,9 should be 58', function(){ _f.xy2i(4,9).should.eql(58) })
    it('5,9 should be 59', function(){ _f.xy2i(5,9).should.eql(59) })

    it('0,10 should be 60', function(){ _f.xy2i(0,10).should.eql(60) })
    it('1,10 should be 61', function(){ _f.xy2i(1,10).should.eql(61) })
    it('2,10 should be 62', function(){ _f.xy2i(2,10).should.eql(62) })
    it('3,10 should be 63', function(){ _f.xy2i(3,10).should.eql(63) })
    it('4,10 should be 64', function(){ _f.xy2i(4,10).should.eql(64) })
    it('5,10 should be 65', function(){ _f.xy2i(5,10).should.eql(65) })
  })

  describe('#out_of_bounds(x,y)' ,function(){
    it('-x out of bounds',function(){
      _f.out_of_bounds(-1,0).should.be.true
    })
    it('+x out of bounds',function(){
      _f.out_of_bounds(6,0).should.be.true
    })
    it('-y out of bounds',function(){
      _f.out_of_bounds(0,-1).should.be.true
    })
    it('+y out of bounds',function(){
      _f.out_of_bounds(0,11).should.be.true
    })
    it('should be in bounds',function(){
      _f.out_of_bounds(0,0).should.be.false
    })
  })
})
