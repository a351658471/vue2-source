import { patch } from "./vnode/patch"

export function mounetComponents(vm, el){
    //1、vm.render将render函数变成虚拟dom 2、vm._updata将虚拟dom转为真实dom
    vm._updata(vm._render())
}


export function lifecycleMixin(Vue){
    Vue.prototype._updata=function(vnode){
        let vm = this
        console.log("🚀 ~ file: lifecycle.js:12 ~ lifecycleMixin ~ vm:", vm)
        vm.$el = patch(vm.$el, vnode)
       
    }

}