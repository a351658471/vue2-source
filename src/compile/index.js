import generate from "./generate"
import parseHTML from "./parseAST"

export default function compileToFunction(el){
  // 1 将html变为ast语法树
  let ast = parseHTML(el)
  console.log("🚀 ~ file: index.js:119 ~ compileToFunction ~ ast:", ast)

  //2 ast语法书变成render函数 1 ast变成字符串 2字符串变为函数
  let code = generate(ast)
} 