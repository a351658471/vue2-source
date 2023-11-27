import compileToFunction from "./compile/index"
import initState from "./initState"
import { callHook, mounetComponents } from "./lifecycle"
import { mergeOptions } from "./utils/index"

//初始化文件
export default function initMixin(Vue){
  Vue.prototype._init =function(options){
    let vm = this
    vm.$options = mergeOptions(vm.constructor.options, options)
    console.log("🚀 ~ file: init.js:11 ~ initMixin ~ options:", options)
    console.log("🚀 ~ file: init.js:11 ~ initMixin ~ vm.constructor.options:", vm.constructor.options)
    //状态初始化之前 调用beforeCreate
    callHook(vm, 'beforeCreate')
    //第一步 初始化状态
    initState(vm)
    //状态初始化后调用 created
    callHook(vm, 'created')
    //第二步 渲染模板
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
    console.log('vm,',vm);
  }

  Vue.prototype.$mount = function(el){
    let vm = this
    el = document.querySelector(el)
    vm.$el = el
    let options = vm.$options
    if(!options.render){
      let template = options.template
      if(!template && el){
       //获取html
       el = el.outerHTML
       //将el转为ast语法树=》 ast语法树转为字符串 str =》 new Function（`with(this){return ${str}}`）转为render函数
       let render = compileToFunction(el)

       //1、将render函数变为 vnode  2、将vnode变成正式dom 渲染到页面上去
       options.render =render
      }
    }
    mounetComponents(vm,el)
  }
}
