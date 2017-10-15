module.exports = function(Ui){
  const m = require('./../../lib/mithril')
  const {ipcRenderer: ipc} = require('electron')
  const Store = require('electron-store')
  const store = new Store()

  let replay_files = []
  let replay_dir   = store.get('replay_dir')
  ipc.send('replay-list')
  ipc.on('replay-dir',function(event,dir){
    replay_dir = dir
    m.redraw()
  })
  ipc.on('replay-list',function(event,files){
    replay_files = files
    m.redraw()
  })

  function click_reveal_replay_dir(){
    ipc.send('replay-dir-reveal')
  }
  function click_change_replay_dir(){
    ipc.send('replay-dir-change')
  }
  function click_change_replay_dir(){
    ipc.send('replay-dir-change')
  }
  function click_reset_replay_dir(){
    ipc.send('replay-dir-reset')
  }
  function click_replay_play(file){
    return function(){
      ipc.send('replay-load',file)
      Ui.close()
    }
  }
  function click_replay_remove(file){
    return function(){
      i = replay_files.indexOf(file)
      replay_files.splice(i, 1)
      ipc.send('replay-delete',file)
    }
  }

  function settings_replay_items(){
    let items = []
    for (let file of replay_files){
      items.push(m('tr.item',[
        m('td.name', file),
        m('td.date', ''),
        m('td.actions',[
          m('.button.small.replay.icon',{onclick: click_replay_play(file)}, [
            m('span.fa.fa-play'),
            m('span','Replay')
          ]),
          m('.button.small.delete',{onclick: click_replay_remove(file)}, [
            m('span.fa.fa-trash-o')
          ])
        ])
      ]))
    }
    return items
  }
  function render(){
    return m('form',[
      m('.text_field.replay_dir',[
        m('label','Replay Folder Location:'),
        m('.input',replay_dir),
        m('.buttons',[
          m('.button.reveal',{onclick: click_reveal_replay_dir},'Reveal'),
          m('.button.change',{onclick: click_change_replay_dir},'Change'),
          m('.button.reset' ,{onclick: click_reset_replay_dir },'Reset'),
        ]),
        m('.clear')
      ]),
      m('.data-table', m('table',settings_replay_items()))
    ])
  }

  return render
}
