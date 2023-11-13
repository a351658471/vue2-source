import observer from "./observer/index"

export default function initState(vm){
  let opt = vm.$options
  if(opt.data){
    initData(vm,opt)
  }

}

function initData(vm){
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'?data.call(vm):data
  
  //数据劫持
  observer(data)

  //将data上的所有属性挂载到实例上
  for(let key in data){
    proxy(vm,'_data',key)
  }
}

function proxy(vm, source, key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}