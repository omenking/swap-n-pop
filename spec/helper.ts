import Stage        from 'states/mode_vs'
import Playfield    from 'components/playfield'
import {
  PANELS,
  RUNNING
} from 'core/data';

export function playfield_helper(opts={}){
  const cpu = opts.cpu ? opts.cpu : [false,false]
  const stage = new Stage()
  stage.init({
    seed: 'test',
    cpu: cpu
  })
  stage.state = RUNNING
  const playfield     = new Playfield(0)
  playfield.countdown  = { create: sinon.stub(), update: sinon.stub() }
  playfield.cursor     = { create: sinon.stub(), update: sinon.stub() }
  playfield.menu_pause = { create: sinon.stub(), update: sinon.stub() }
  playfield.score_lbl  = { create: sinon.stub(), update: sinon.stub() }
  playfield.create(stage,{push: false, x: 0, y: 0, panels: new Array(PANELS).fill(null)})
  return playfield
}
