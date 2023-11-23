import generate from "./generate"
import parseHTML from "./parseAST"

export default function compileToFunction(el){
  // 1 将html变为ast语法树
  let ast = parseHTML(el)

  //2 ast语法书变成render函数 1 ast变成字符串 2字符串变为函数
  //2.1 ast变成字符串
  let code = generate(ast)
  console.log("🚀 ~ file: index.js:11 ~ compileToFunction ~ code:", code)
  //2.2字符串变为函数
  let render = new Function(`with(this){return ${code}}`)
  return render
} 
  
