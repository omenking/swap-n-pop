const chai     = require('chai')
const sinon    = require('sinon')
const mock     = require('mock-require')

global.sinon      = sinon
global.mock       = mock
global.jestExpect = global.expect
global.expect     = chai.expect

chai.should()

