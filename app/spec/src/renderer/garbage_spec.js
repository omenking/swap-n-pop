const APP = require('../../../app')('../../../')
const fs   = require('fs')
const chai = require('chai')
const sinon = require('sinon')
chai.should()

const Game = require(APP.path.spec('helpers','game_spec'))
const game = new Game()
const seedrandom = require('seedrandom')
const _f         = require(APP.path.core('filters'))
const Stage      = require(APP.path.states('mode_vs'))(game)
const Playfield  = require(APP.path.components('playfield'))(game)
const Stack      = require(APP.path.core('stack'))(game)

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
} = require(APP.path.core('data'))

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
