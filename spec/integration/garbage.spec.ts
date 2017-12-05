import * as fs         from 'fs'
import * as seedrandom from 'seedrandom'
import _f         from 'core/filters'
import Stage      from 'states/mode_vs'
import Playfield  from 'components/playfield'
import Stack      from 'core/stack'

//shorthands
const T = true
const F = 0
const N = null

var _playfield = null
function load(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).load(i) }
}

function chec(...arr){
  for (i of arr){ _playfield.stack(i[0], i[1]).snap.should.eql(i)}
}
