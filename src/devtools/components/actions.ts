import * as m  from 'mithril'
import seed       from 'devtools/components/actions/seed'
import garbage    from 'devtools/components/actions/queue_garbage'
import time_trial from 'devtools/components/actions/time_trial'
import levels     from 'devtools/components/actions/levels'
import replay     from 'devtools/components/actions/replay'
import snapshot   from 'devtools/components/actions/snapshot'
import stack      from 'devtools/components/actions/stack'

export default function actions(){
  return m('.actions',[
    seed(),
    garbage(),
    time_trial(),
    stack(),
    //replay(),
    snapshot(),
    levels()
  ])
}
