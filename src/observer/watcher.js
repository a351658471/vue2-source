//通过watcher 实现更新

import { PopTarget, pushTarget } from "./dep"
import { queueWatcher } from "./scheduler.js"

let id = 0
export default class Watcher {
  constructor(vm, updateComponent, cb, options) {
    this.vm = vm;
    this.exprOrfn = updateComponent;
    this.cb = cb;
    this.options = options;
    this.id = id++
    this.deps =[]
    this.depsId = new Set()
    if (typeof updateComponent === "function") {
      this.getter = updateComponent;
    }
    this.get();
  }
  addDep(dep){
   
    //dep去重
    let id = dep.id
    if(!this.depsId.has(id)){
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  //初次渲染
  get() {
    pushTarget(this) //给dep 添加watcher
    this.getter();
    PopTarget()//给dep 移除watcher
  }
  //更新
 
  updata(){
    // 每次watcher进行更新的时候  是否可以让他们先缓存起来  之后再一起调用
    // 异步队列机制
    queueWatcher(this)
  }
  run(){
    //真正的触发更新
    this.getter()
  }
}

/* 
  依赖收集
  dep => dep和data中的属性一一对应
  watcher =》 在视图上使用了几个data中的属性，就会有几个wather
  dep 与watcher 是多对多关系
*/