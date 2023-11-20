import { initGlobApi } from "./global-api/index.js";
import initMixin from "./init";
import {lifecycleMixin} from "./lifecycle";
import { renderMixin } from "./vnode/index.js";

function Vue(options){
  this._init(options)
}
initMixin(Vue) //初始化数据

lifecycleMixin(Vue)//初始化生命周期

renderMixin(Vue) //添加_render

// 全局方法 Vuemixin Vue.component Vue.extend
initGlobApi(Vue)
export default Vue