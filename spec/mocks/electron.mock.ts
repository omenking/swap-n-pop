const sinon = require('sinon')

export const app =null
export const remote = { app: null}

const ipc_on   = sinon.stub()
const ipc_send = sinon.stub()
export const ipc = {
  on: ipc_on,
  send: ipc_send
}
export const ipcRenderer = {
  on: ipc_on,
  send: ipc_send
}
