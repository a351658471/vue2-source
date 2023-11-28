import { isObject, isReservedTag } from "../utils/index"

export function renderMixin(Vue){
    //_c 处理元素
    Vue.prototype._c = function(){
        return createElement(this, ...arguments)
        
    }
    //_v处理文本
    Vue.prototype._v = function(text){
        return createText(text)
    }
    //_s处理变量
    Vue.prototype._s = function(val){
        return val === null?'':(typeof val === 'object')?JSON.stringify(val):val
    }

    Vue.prototype._render = function(){
        // render函数变成vnode
        let vm = this
        let render =vm.$options.render
        let vnode = render.call(this)
        return vnode
    }
}

function createElement(vm, tag, data ={}, ...children){
    //判断是否是普通标签
    if(isReservedTag(tag))return new Vnode(tag, data, data?.key, children)
    //否则是组件
    let Ctor = vm.$options.components[tag] //获取组件的构造函数
    return createComponent(vm, tag, data, key, children, Ctor)
}

export function createComponent(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
      //   如果没有被改造成构造函数
      Ctor = vm.$options._base.extend(Ctor);
    }
    // 声明组件自己内部的生命周期
    data.hook = {
      // 组件创建过程的自身初始化方法
      init() {
        let child = (vnode.componentInstance = new Ctor({ _isComponent: true })); //实例化组件
        child.$mount(); //因为没有传入el属性  需要手动挂载 为了在组件实例上面增加$el方法可用于生成组件的真实渲染节点
      },
    };
  
    // 组件vnode  也叫占位符vnode  ==> $vnode
    return new Vnode(
      `vue-component-${Ctor.cid}-${tag}`,
      data,
      key,
      undefined,
      undefined,
      {
        Ctor,
        children,
      }
    );
  }

function createText(text){
    return new Vnode(undefined,undefined,undefined,undefined,text)
}
// function vnode(tag, data, key, children, text){
//     return {tag, data, key, children, text }
// }

export default class Vnode{
    constructor(tag, data, key, children, text){
        this.tag = tag
        this.data = data
        this.key = key
        this.children = children
        this.text = text
    }
}