const chai     = require('chai')
const sinon    = require('sinon')
const mock     = require('mock-require')

const electron_mock = require('helpers/electron_mock')
const store_mock    = require('helpers/store_mock')

global.sinon         = sinon
global.mock          = mock
global.electron_mock = electron_mock
global.store_mock    = store_mock

chai.should()
