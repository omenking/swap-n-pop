module.exports = function(Ui){
  const m = require('./../../lib/mithril')
  const {ipcRenderer: ipc} = require('electron')
  const Store = require('electron-store')
  const store = new Store()

  var inputs  = store.get('network.host_port')
  var host_port = {value: store.get('network.host_port'), setValue: function(v) {host_port.value = v}}
  var join_host = {value: store.get('network.join_host'), setValue: function(v) {join_host.value = v}}
  var join_port = {value: store.get('network.join_port'), setValue: function(v) {join_port.value = v}}

  function submit_host(){
    store.set('network.host_port',host_port.value)
    ipc.send('network-connect',{
      mode: 'host',
      host_port: host_port.value,
      join_host: join_host.value,
      join_port: join_port.value
    })
    Ui.close()
    return false
  }

  function submit_join(){
    store.set('network.join_host',join_host.value)
    store.set('network.join_port',join_port.value)
    ipc.send('network-connect',{
      mode: 'join',
      host_port: host_port.value,
      join_host: join_host.value,
      join_port: join_port.value
    })
    Ui.close()
    return false
  }
  function render(){
    return([
      m('form.host.divider',{onsubmit: submit_host}, [
        m('.text_field.port',[m('label','port'),m("input[type='text']",{oninput: m.withAttr('value',host_port.setValue), value: host_port.value })]),
        m("input[type='submit']",{value: 'Host'})
      ]),
      m('form.join',{onsubmit: submit_join}, [
        m('.text_field.host',[m('label','host'),m("input[type='text']",{oninput: m.withAttr('value',join_host.setValue), value: join_host.value })]),
        m('.text_field.port',[m('label','port'),m("input[type='text']",{oninput: m.withAttr('value',join_port.setValue), value: join_port.value })]),
        m("input[type='submit']",{value: 'Join'})
      ])
    ])
  }

  return render
}
