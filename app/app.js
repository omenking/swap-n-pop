const path = require('path')
module.exports = function(root){
return {
  path: {
    root: function(...args){
      args.unshift(root)
      return path.join(...args)
    },
    main: function(...args){
      args.unshift('main')
      args.unshift('src')
      args.unshift(root)
      return path.join(...args)
    },
    states: function(...args){
      args.unshift('states')
      args.unshift('renderer')
      args.unshift('src')
      args.unshift(root)
      return path.join(...args)
    },
    core: function(...args){
      args.unshift('core')
      args.unshift('renderer')
      args.unshift('src')
      args.unshift(root)
      return path.join(...args)
    },
    components: function(...args){
      args.unshift('components')
      args.unshift('renderer')
      args.unshift('src')
      args.unshift(root)
      return path.join(...args)
    },
    spec: function(...args){
      args.unshift('spec')
      args.unshift(root)
      return path.join(...args)
    }
  }
}

}
