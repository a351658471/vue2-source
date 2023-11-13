import arrayMethods from "./arr"

export default function observer(data){
  if(typeof data != 'object' || data === null)return
  new Observer(data)
}

class Observer{
  constructor(data){
    Object.defineProperty(data,'__ob__',{
      enumerable:false,
      value:this
    })
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
      observer(arr[i])
    }
  }
}
function defineReactive(data, key, value){
  observer(value)//深度代理
  Object.defineProperty(data,key,{
    get(){
      console.log('获取');
      return value
    },
    set(newValue){
      if(newValue === value)return 
      observer(newValue)
      value = newValue
    }
  })
}