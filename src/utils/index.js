export const HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]
export const PROTOTYPE = [
    'data',
    'computed',
    'watch',
    'methods'
]

//策略模式
let starts = {}
// const arr = HOOKS.concat(...PROTOTYPE)
HOOKS.forEach(item => {
    starts[item] = mergeHook
})
starts.data = function(parentVal, childVal){
    return childVal
}
function mergeHook(parentVal, childVal){
    if(childVal){
        if(parentVal){
            return parentVal.concat(childVal)
        }else{
            return [childVal]
        }
    }else{
        return parentVal
    }
}

export function mergeOptions(parent, child){
    let options = {}
    for(let key in parent){
        mergeField(key)
    }
    for(let key in child){
        mergeField(key)
    }
    function mergeField(key){
        if(starts[key]){
            options[key] = starts[key](parent[key],child[key])
        }else{
            options[key] = child[key]
        }
    }
    return options
}