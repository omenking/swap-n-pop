const sinon = require('sinon')

export const app =null
export const remote = { app: null}
export const ipc = {
  on: sinon.stub()
}
export const ipcRenderer = {
  on: sinon.stub()
}
