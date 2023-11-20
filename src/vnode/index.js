export function renderMixin(Vue){
    //_c 处理元素
    Vue.prototype._c = function(){
        return createElement(...arguments)
        
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

function createElement(tag, data ={}, ...children){
    return vnode(tag, data, data?.key, children)
}
function createText(text){
    return vnode(undefined,undefined,undefined,undefined,text)
}
function vnode(tag, data, key, children, text){
    return {tag, data, key, children, text }
}