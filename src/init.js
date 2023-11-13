import compileToFunction from "./compile/index"
import initState from "./initState"

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
    let options = vm.$options
    if(!options.render){
      let template = options.template
      if(!template && el){
       //获取html
       el = el.outerHTML
       //转为ast语法书
       let ast = compileToFunction(el)
      }
    }
  }
}
