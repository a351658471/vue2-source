import { mergeOptions } from "../utils/index.js"

import initExtend from "./initExtend.js";
import initAssetRegisters from "./assets.js";
const ASSETS_TYPE = ["component", "directive", "filter"];

export function initGlobApi(Vue){
    Vue.options = {} //全局组件、指令、过滤器

    //全局混入
    Vue.Mixin = function(mixin){
        this.options = mergeOptions(this.options, mixin)
    }

    //
    ASSETS_TYPE.forEach(type => {
        Vue.options[type+'s'] = {}
    })
    Vue.options._base =Vue //_base 指向Vue

    initExtend(Vue); // extend方法定义
    initAssetRegisters(Vue); //assets注册方法 包含组件 指令和过滤器
}