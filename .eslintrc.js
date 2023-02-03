module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 'off',
    'semi': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 'off',
    'eol-last': 0,
    'no-trailing-spaces': 0,
    'no-multi-spaces': 0,
    'no-unused-vars': 'off',
    'spaced-comment': 0,
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 5,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'vue/valid-v-model': 'off',
    'no-tabs': 0,
    'quotes': 'off',
    'no-delete-var': 2,
    // 'prefer-const': [
    //   2,
    //   {
    //     'ignoreReadBeforeAssign': false
    //   }
    // ],
    'template-curly-spacing': 'off',
    'indent': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
