// eslint.config.js
import vuePlugin from 'eslint-plugin-vue'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintPlugin from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'

export default [
  // ESLint 核心配置
  eslintPlugin.configs.recommended,

  // Vue 插件配置
  {
    files: ['**/*.vue'],
    plugins: { vue: vuePlugin },
    rules: {
      ...vuePlugin.configs['vue3-recommended'].rules,
      ...vuePlugin.configs['vue3-strongly-recommended'].rules,
      // 自定义 Vue 规则
      'vue/multi-word-component-names': 'off'
    }
  },

  // Prettier 集成
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 错误视为 ESLint 错误
      'arrow-body-style': 'off', // 关闭与 Prettier 冲突的规则
      'prefer-arrow-callback': 'off'
    }
  },

  // 关闭所有与 Prettier 冲突的 ESLint 规则
  prettierConfig
]
