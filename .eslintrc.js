'use strict'

module.exports = {
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 2017,
  },

  extends: [
    'airbnb-base',
  ],

  rules: {
    'semi': ['warn', 'never'],
    // continue is extremely useful!
    'no-continue': 0,
    // Do not allow accessing process.env anywhere in the code (those should be read only in config)
    'no-process-env': 1,
    // Function declarations are hoisted so it's okay to reference them before their definition
    'no-use-before-define': ['error', 'nofunc'],
    // Allow reassigning object properties. This is not web app, we do not need immutability.
    'no-param-reassign': ['error', { props: false }],
    // Override the default airbnb definition to allow for-of loops. They are much faster.
    'comma-dangle': ['warn', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    // Void is quite useful to avoid returning unexpected values from callbacks or when
    // short-circuiting a function which is not expected to return a value
    'no-void': 0,
    'class-methods-use-this': 0,
  },

  overrides: [{
    files: [
      'test/**/*',
      'src/**/*.test.js',
      'lib/**/*.test.js',
    ],
    env: {
      mocha: true,
    },
    globals: {
      expect: true,
      sinon: true,
    },
  }, {
    files: [
      'src/config/*'
    ],
    rules: {
      // Allow accessing process.env in config files
      'no-process-env': 0,
    },
  }],
}
