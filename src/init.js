import compileToFunction from "./compile/index"
import initState from "./initState"
import { mounetComponents } from "./lifecycle"

//初始化文件
export default function initMixin(Vue){
  Vue.prototype._init =function(options){
    let vm = this
    vm.$options = options

    //第一步 初始化状态
    initState(vm)

    //第二步 渲染模板
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
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
       console.log("🚀 ~ file: init.js:30 ~ initMixin ~ ast:", render)

       //1、将render函数变为 vnode  2、将vnode变成正式dom 渲染到页面上去
       options.render =render
      }
    }
    mounetComponents(vm,el)
  }
}
