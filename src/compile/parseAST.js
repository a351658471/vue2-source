const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` //标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})` //<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`) //匹配开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)  //匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagclose = /^\s*(\/?)>/ //匹配标签结束 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function createASTElement(tagName,attrs){
  return{
    tagName,
    attrs,
    children:[],
    type:1,
    parent:null

  }
}
let root=null //根元素
let createParent = null //当前元素的父元素
let stack=[] //数据结构 栈

function start({tagName, attrs}){
  let element = createASTElement(tagName,attrs)
  if(!root){
    root = element
  }
  createParent = element
  stack.push(element)
}
function charts(text){
  // text = text.replace(/\s/g,' ')
  if(text){
    createParent.children.push({
      type:3,
      text
    })
  }
  
}
function end(tagName) {
  let element = stack.pop()
  createParent = stack[stack.length-1]
  if(createParent){
    element.parent = createParent.tagName
    createParent.children.push(element)
  }
}

export default function parseHTML(html){
  while(html){
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      // 开始标签
      const startTagMatch = parseStartTag() //开始标签内容
      if(startTagMatch){
        start(startTagMatch)
        continue
      }
      
      //结束标签
      let endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }

    if(textEnd > 0){
      let text = html.substring(0, textEnd)
      if(text){
        advance(text.length)
        charts(text)
      }
    }
    
 
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(!start)return null
    let match = {
      tagName:start[1],
      attrs:[]
    }
    //删除 开始标签
    advance(start[0].length)

    //属性
    let attr 
    let end
    while(!(end = html.match(startTagclose)) && (attr = html.match(attribute))){
      match.attrs.push({
        name:attr[1],
        value:attr[3]||attr[4]||attr[5]
      })
      advance(attr[0].length)
    }
    if(end){
      advance(end[0].length)
      return match
    }
  }
  function advance(n){
    html = html.substring(n)
  }
  return root
  
}