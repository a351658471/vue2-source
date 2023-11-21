import { patch } from "./vnode/patch"

export function mounetComponents(vm, el){
    //页面渲染前调用 beforeMount
    callHook(vm, 'beforeMount')
    //1、vm.render将render函数变成虚拟dom 2、vm._updata将虚拟dom转为真实dom
    vm._updata(vm._render())
    //页面渲染后调用
    callHook(vm, 'mounted')
}


export function lifecycleMixin(Vue){
    Vue.prototype._updata=function(vnode){
        let vm = this
        vm.$el = patch(vm.$el, vnode)
       
    }

}

export function callHook(vm, hook){
    console.log("🚀 ~ file: lifecycle.js:23 ~ callHook ~ hook:", hook)
    const handlers = vm.$options[hook]
    console.log("🚀 ~ file: lifecycle.js:20 ~ callHook ~ handlers:", handlers)
    if(handlers){
        handlers.forEach(fn => {
            fn.call(this)
        })
    }
}