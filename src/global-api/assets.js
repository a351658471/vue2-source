const ASSETS_TYPE = ["component", "directive", "filter"];
export default function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, componentDef) {
      if (type === "component") {

        //   this指向Vue
        // 全局组件注册
        // 子组件可能也有extend方法  VueComponent.component方法
        componentDef.name = componentDef.name || id
        componentDef = this.extend(componentDef);
      }
      this.options[type + "s"][id] = componentDef;
      console.log("🚀 ~ file: assets.js:14 ~ ASSETS_TYPE.forEach ~ this.options:", this.options)
    };
  });
}