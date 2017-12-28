import * as m  from 'mithril'
export default function toast(val){
  return m('.toast', m('span',val))
}
