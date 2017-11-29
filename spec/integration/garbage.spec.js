import fs    from 'fs'
import chai  from 'chai'
import sinon from 'sinon'
import Game  from 'helpers/game_spec'
import seedrandom from 'seedrandom'
import _f         from 'renderer/core/filters'
import Stage      from 'renderer/states/mode_vs'
import Playfield  from 'renderer/components/playfield'
import Stack      from 'renderer/core/stack'
import data       from 'renderer/core/data'

chai.should()

const game = new Game()

const {
  PANELS,
  SWAP_L,
  SWAP_R,
  SWAPPING_L,
  SWAPPING_R,
  STATIC,
  HANG,
  FALL,
  LAND,
  CLEAR
} = data

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
