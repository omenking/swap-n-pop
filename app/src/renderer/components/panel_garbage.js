module.exports = function(game){
  const APP = require('../../../app')('../../../')
  class PanelGarbage {
    get [Symbol.toStringTag](){ return 'PanelGarbage' }

    /** */
    constructor() {
      this.create   = this.create.bind(this)
      this.update   = this.update.bind(this)
      this.render   = this.render.bind(this)
      this.shutdown = this.shutdown.bind(this)
    }

    create(){
    }

    update(){
    }
    /** */
    render(){
    }
    /** */
    shutdown(){}
  } // klass
  return PanelGarbage
}
