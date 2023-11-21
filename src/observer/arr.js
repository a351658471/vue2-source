const oldArrayProtoMethods = Array.prototype
const arrayMethods = Object.create(oldArrayProtoMethods)
const methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
]

methods.forEach(item => {
  arrayMethods[item] = function(...args ){
    let inserted
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.splice(2)
        break;
    }
    this.__ob__.observerArray(args)
    return oldArrayProtoMethods[item].apply(this, args)
  }
})

export default arrayMethods