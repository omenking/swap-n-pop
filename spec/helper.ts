import Stage        from 'states/mode_vs'
import Playfield    from 'components/playfield'
import {
  PANELS,
  RUNNING
} from 'core/data'

export const R = Symbol('random_panel')
export const T  = true
export const F  = 0
export const N  = null
export const NN = [null,null,null,null]

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


export function playfield_load(playfield : Playfield, ...arr){
  for (let i of arr){
    playfield.stack_xy(i[0], i[1]).load(i)
  }
}

export function playfield_check(playfield : Playfield, ...arr){
  for (let i of arr){
    let data = playfield.stack_xy(i[0], i[1]).snap
    // its a bit hard to debug, so I added type and post
    // so when tests fail they are more readble
    // eg   AssertionError: expected [ 'chain', '1,20', 1 ] to deeply equal [ 'chain', '1,20', 0 ]
    let pos  = `${i[0]},${i[1]}`
    if (i[2] === R)
      expect(data[2]).to.be.a('number',`${pos}: kind`) //kind
    else
      expect(data[2]).eql(i[2]   ,`${pos}: kind`) //kind

    expect(data[3]   ).eql(i[3]   ,`${pos}: state`  ) //state
    expect(data[4]   ).eql(i[4]   ,`${pos}: counter`) //counter
    expect(data[5]   ).eql(i[5]   ,`${pos}: chain`  ) //chain
  }
}

export function playfield_check_garbage(playfield : Playfield, ...arr){
  for (let i of arr){
    let data = playfield.stack_xy(i[0], i[1]).snap
    // its a bit hard to debug, so I added type and post
    // so when tests fail they are more readble
    // eg   AssertionError: expected [ 'chain', '1,20', 1 ] to deeply equal [ 'chain', '1,20', 0 ]
    let pos  = `${i[0]},${i[1]}`
    if (i[2] === R)
      expect(data[2]).to.be.a('number',`${pos}: kind`) //kind
    else
      expect(data[2]).eql(i[2]   ,`${pos}: kind`) //kind

    expect(data[3]   ).eql(i[3]   ,`${pos}: state`  ) //state
    expect(data[4]   ).eql(i[4]   ,`${pos}: counter`) //counter
    expect(data[5]   ).eql(i[5]   ,`${pos}: chain`  ) //chain
    expect(data[6][0]).eql(i[6][0],`${pos}: garbage state`) //garbage state
    expect(data[6][1]).eql(i[6][1],`${pos}: garbage group`) //garbage group
    expect(data[6][2]).eql(i[6][2],`${pos}: garbage kind`) //garbage kind
  }
}
