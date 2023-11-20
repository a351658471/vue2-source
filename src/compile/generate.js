const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export default function generate(el) {
  let children = genChildren(el) //处理子集
  let code = `_c('${el.tagName}',${
    el.attrs.length ? `${genProps(el.attrs)}` : 'null'
  },${children ? `${children}` : 'null'})`
  console.log("🚀 ~ file: generate.js:9 ~ generate ~ code:", code)
  return code
  
}

//处理属性
function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach((item) => {
        let [key, val] = item.split(':')
        obj[key] = val
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

//处理子集
function genChildren(el) {
  let children = el.children
  if (children) {
    return children.map((child) => gen(child)).join(',')
  }
}

function gen(node) {
  if (node.type === 1) {
    //元素
    return generate(node)
    
  } else {
    //文本
    let text = node.text
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }
    let tokens = []
    defaultTagRE.lastIndex = 0
    let lastindex = 0
    let match
    while (match = defaultTagRE.exec(text)) {
      let index = match.index
      console.log('🚀 ~ file: generate.js:51 ~ gen ~ match:', match)
      if (index > lastindex) {
        tokens.push(JSON.stringify(text.slice(lastindex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastindex = index + match[0].length
      if (lastindex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastindex)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}
