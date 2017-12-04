const sinon = require('sinon')

const ElectronMock = {
  app: null,
  remote: { app: null},
  ipc: {
    on: sinon.stub()
  },
  ipcRenderer: {
    on: sinon.stub()
  }
}

module.exports = ElectronMock
