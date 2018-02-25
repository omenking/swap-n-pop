import * as fs       from 'fs'
import * as fx       from 'mkdir-recursive'
import * as child_process from 'child_process'
import controls     from 'core/controls'
import Stage        from 'states/mode_vs'
import Playfield    from 'components/playfield'
import assets   from 'core/assets'
import {
  PANELS,
  RUNNING
} from 'common/data'

export const R = Symbol('random_panel')
export const T  = true
export const F  = 0
export const N  = null
export const NN = [null,null,null,null]

export function open_devtools(playfield : Playfield,filename : string){
  const json = JSON.stringify(playfield.stage.snap)
  const dir  = 'tmp'
  if (filename === null) { filename = Date.now() }
  if (!fs.existsSync(dir)){ fx.mkdirSync(dir); } // create dir if it don't exist.
  fs.writeFile(`tmp/${filename}.snap`,json, function (err) {
    //child_process.exec(`npm run debug -- tmp/${filename}/.snap`,function puts(error, stdout, stderr) {
      //console.log("Launching SwapNPop")
    //})
  })
}

export function playfield_helper(opts={}){
  const cpu       = opts.cpu       ? opts.cpu       : [false,false]
  const countdown = opts.countdown ? opts.countdown : false
  const push      = opts.countdown ? opts.push      : false
  const garbage   = opts.garbage   ? opts.garbage   : true
  const timer     = opts.timer     ? opts.timer     : false
  const panels    = opts.panels    ? opts.panels    : new Array(PANELS).fill(null)
  assets.load()
  assets.preload()

  controls.create()
  const stage = new Stage()
  stage.init({
    seed    : 'test',
    online  : false,
    cpu     : cpu,
    garbage : garbage,
    timer   : timer
  })
  stage.create()
  stage.state = RUNNING
  const playfield      = new Playfield(0)
  playfield.countdown  = { create: sinon.stub(), update: sinon.stub() }
  playfield.cursor     = { create: sinon.stub(), reset: sinon.stub(), update: sinon.stub() }
  playfield.menu_pause = { create: sinon.stub(), update: sinon.stub() }
  playfield.score_lbl  = { create: sinon.stub(), update: sinon.stub() }
  playfield.create(stage,{
    countdown : countdown,
    push      : push,
    x         : 0,
    y         : 0,
    panels    : panels
  })
  playfield.create_after()
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
