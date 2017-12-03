mock('electron', {
  app: null,
  remote: { app: null},
  ipc: {
    on: sinon.stub()
  },
  ipcRenderer: {
    on: sinon.stub()
  }
})
