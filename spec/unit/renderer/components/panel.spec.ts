import * as fs   from 'fs'
import Stage     from 'states/mode_vs'
import Playfield from 'components/playfield'
import Panel     from 'components/panel'
import { STATIC, HANG, FALL, CLEAR, PANELS ROWS} from 'core/data';

//shorthands
const T = true
const F = false
const N = null

var _playfield = null
function load(...arr){
  for (let i of arr){
    _playfield.stack_xy(i[0], i[1]).load(i)
  }
}

describe('Panel', function() {
  describe('#class_name' ,function(){
    it('should be type of Panel', function(){
      const panel = new Panel()
      panel.should.be.a('Panel')
    })
  })

  describe('#load()' ,function(){
    it('should be able to load', function(){
      const data = [10,0,1,STATIC,     // x,y,kind,state
                    null,0,0,null,0] // chain,counter,counter_popping.animation_state,animation_counter
      const panel = new Panel()
      panel.load(data)
      expect(panel.x).eql(10)
      expect(panel.y).eql(0)
      expect(panel.kind).eql(1)
      expect(panel.state).eql(STATIC)
    })
  })

  describe('#update()' ,function(){
    //it('when HANG should change to FALL', function(){
      //const index = _f.xy2i(0,4)
      //const data = [0,4,1,HANG,null,0,0,null,0]
      //const panel = new Panel()
      //panel.playfield = {
        //should_push: true
      //}
      //panel.load(data)
      //panel.update(index)
      //panel.state.should.eql(FALL)
    //})
  })

  describe('#clear()' ,function(){
    it('should work', function(){
    })
  })

  describe('#clear_index' ,function(){
    it('should work', function(){
      let stage = new Stage()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const playfield = new Playfield(0)
      playfield.countdown  = { create: sinon.stub(), update: sinon.stub() }
      playfield.cursor     = { create: sinon.stub(), update: sinon.stub() }
      playfield.menu_pause = { create: sinon.stub(), update: sinon.stub() }
      playfield.score_lbl  = { create: sinon.stub(), update: sinon.stub() }
      playfield.create(stage,{push: false, x: 0, y: 0, panels: new Array(PANELS).fill(null)})
      _playfield = playfield

      load([0,ROWS+ 8 ,0,CLEAR,60,F],
           [0,ROWS+ 9 ,1,CLEAR,60,F],
           [0,ROWS+10 ,1,CLEAR,60,F])
      expect(playfield.stack_xy(0,ROWS+10)).eql([2,3])
    })
  })

  describe('#chain_and_combo()' ,function(){
    it('should detect vertical and horizontal match', function(){
      let stage     = null
      let stack     = null
      let playfield = null
      let panels   = [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,

        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, 5, N, N, N, N,
        N, 4, N, N, N, N,
        N, 3, N, N, N, N,
        N, 2, N, N, N, N,
        N, 1, N, N, N, N,
        1, 1, 1, N, N, N,
        N, 1, N, N, N, N
      ]
      stage = new Stage()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
      playfield.clearing = []
      expect(playfield.stack_xy(0,ROWS-1).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS-1).state).eql(CLEAR)
      expect(playfield.stack_xy(1,ROWS-2).state).eql(CLEAR)
      expect(playfield.stack_xy(2,ROWS-1).state).eql(CLEAR)
    })
  })

  describe('#dead', function(){
    it('should not be dead', function(){
      let stage     = null
      let stack     = null
      let playfield = null
      let panels   = [
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,
        N, N, N, N, N, N,

        N, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N
      ]
      stage = new Stage()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
      playfield.stack_xy(0,ROWS-9).dead.should.eql(false)
    })

    it('should be dead', function(){
      let stage     = null
      let stack     = null
      let playfield = null
      let panels   = [
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N,
        1, N, N, N, N, N
      ]
      stage = new Stage()
      stage.init({
        seed: 'test',
        cpu: [false,null]
      })
      const playfield = new Playfield(0)
      playfield.create(stage,{push: false, x: 0, y: 0, panels: panels})
      playfield.stack_xy(0,ROWS-9).dead.should.eql(true)
    })
  })

}) //klass
