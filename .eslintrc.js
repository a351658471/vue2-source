module.exports = {
    // 其他配置保持不变...
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
        'plugin:prettier/recommended', // 添加 Prettier 推荐配置
        './auto-import-eslint-config.js'
    ],
    plugins: ['prettier'], // 添加 Prettier 插件
    rules: {
        // 其他规则保持不变...
        'prettier/prettier': 'error', // 将 Prettier 错误视为 ESLint 错误
        'arrow-body-style': 'off', // 关闭与 Prettier 冲突的规则
        'prefer-arrow-callback': 'off', // 关闭与 Prettier 冲突的规则
    }
};