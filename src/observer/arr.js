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
    const ob = this.__ob__
    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.splice(2)
        break;
      default:
        break;
    }
    const result = oldArrayProtoMethods[item].apply(this, args)
    ob.dep.notify()
    if(inserted)ob.observerArray(inserted)
    
    return result
  }
})

export default arrayMethods