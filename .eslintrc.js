// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base', 
    'plugin:vue/base',
    'plugin:vue/recommended'
],
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ["error", "unix"],
    'no-console': 0,
    "comma-dangle": ["error", "never"],
    "indent": ["error", 4],
    "vue/order-in-components": [2, {
      order: [
        ['name', 'delimiters', 'functional', 'model'],
        ['components', 'directives', 'filters'],
        ['parent', 'mixins', 'extends', 'provide', 'inject'],
        'el',
        'template',
        'props',
        'propsData',
        'data',
        'computed',
        'watch',
        'LIFECYCLE_HOOKS',
        'methods',
        'render',
        'renderError'
      ]
    }]
  }
}
