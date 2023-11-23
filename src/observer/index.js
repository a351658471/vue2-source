import arrayMethods from "./arr"
import { Dep } from "./dep"

export default function observer(data){
  if(typeof data != 'object' || data === null)return
  return new Observer(data)
}

class Observer{
  constructor(data){
    Object.defineProperty(data,'__ob__',{
      enumerable:false,
      value:this
    })
    this.dep = new Dep()
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods
      this.observerArray(data)
    }else{
      this.walk(data)
    }
  }
  walk(data){
    const keys = Object.keys(data)
    for(let i =0; i<keys.length; i++){
      const key = keys[i]
      const value = data[key]
      defineReactive(data, key, value)
    }
  }
  
  observerArray(arr){
    for(let i=0; i<arr.length; i++){
      let e = arr[i]
      e && e.__ob__ && e.__ob__.dep.depend();
      observer(e)
    }
  }
}
function defineReactive(data, key, value){
  let childDep = observer(value)//深度代理
  let dep = new Dep()
  Object.defineProperty(data,key,{
    get(){
      console.log('获取',key);
      if(Dep.target){
        dep.depend()
        if(childDep){
          childDep.dep.depend() //数组收集依赖
        }
      }
     
      return value
    },
    set(newValue){
      if(newValue === value)return 
      observer(newValue)
      value = newValue
      dep.notify()
    }
  })
}