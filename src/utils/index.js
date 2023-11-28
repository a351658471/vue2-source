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

const ASSETS_TYPE= [ 
    'component',
    'directive',
    'filter'
]

//合并策略
let starts = {}
// const arr = HOOKS.concat(...PROTOTYPE)
HOOKS.forEach(item => {
    starts[item] = mergeHook
})

ASSETS_TYPE.forEach(type => {
    starts[type+'s'] = mergeAssets
})
// starts.data = function(parentVal, childVal){
//     return childVal
// }
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


function mergeAssets(parentVal, childVal){
     //比如有同名的全局组件和自己定义的局部组件 那么parentVal代表全局组件 自己定义的组件是childVal  首先会查找自已局部组件有就用自己的  没有就从原型继承全局组件  res.__proto__===parentVal
    const res = Object.create(parentVal)
    if(childVal){
        for(let key in childVal){
            res[key] = childVal[k]
        }
    }
    return res
}


export function  mergeOptions(parent, child){
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

export function isObject(data) {
    //判断是否是对象
    if (typeof data !== "object" || data == null) {
      return false;
    }
    return true;
  }
  
  export function isReservedTag(tagName) {
    //判断是不是常规html标签
    // 定义常见标签
    let str =
      "html,body,base,head,link,meta,style,title," +
      "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
      "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
      "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
      "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
      "embed,object,param,source,canvas,script,noscript,del,ins," +
      "caption,col,colgroup,table,thead,tbody,td,th,tr," +
      "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
      "output,progress,select,textarea," +
      "details,dialog,menu,menuitem,summary," +
      "content,element,shadow,template,blockquote,iframe,tfoot";
    let obj = {};
    str.split(",").forEach((tag) => {
      obj[tag] = true;
    });
    return obj[tagName];
  }
  