export function patch(oldVnode, vnode){
    let el = createEl(vnode)
    let body = oldVnode.parentNode
    body.insertBefore(el, oldVnode)
    body.removeChild(oldVnode)
    return el
}

function createEl(vnode){
    let {tag, children, key, data, text} = vnode
    if(typeof tag === 'string'){
        vnode.el  = document.createElement(tag)//创建元素
        if(children.length > 0){
            children.forEach( child => {
                createEl(child)
                vnode.el.appendChild(createEl(child))
                
            })
            
        }
    }else{
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}