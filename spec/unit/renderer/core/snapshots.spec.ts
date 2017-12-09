import CoreSnapshots from 'core/snapshots'
import Playfield     from 'components/playfield'
import ModeVs        from 'states/mode_vs'

describe('Snapshots', function() {
  describe('#cindex()', function(){
    it('should work', function(){
      const snapshots = new CoreSnapshots()
      const stage = new ModeVs()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      snapshots.create(stage) //suppose to pass playfields but don't care right now

      snapshots.index_tick = 0
      snapshots.capture_index(0).should.eql(0)

      snapshots.index_tick = 120
      snapshots.capture_index(124).should.eql(4)

      snapshots.index_tick = 120
      snapshots.capture_index(114).should.eql(114)
    }) // it
  }) // describe
  describe('#load()', function(){
    it('should work', function(){
      const p0 = new Playfield(0)
      const p1 = new Playfield(1)
      const stage = new ModeVs()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const snapshots = new CoreSnapshots()
      snapshots.create(stage) //suppose to pass playfields but don't care right now
    }) // it
  }) // describe
})
