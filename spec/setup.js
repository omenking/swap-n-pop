const chai     = require('chai')
const sinon    = require('sinon')
const mock     = require('mock-require')

global.sinon         = sinon
global.mock          = mock

chai.should()
