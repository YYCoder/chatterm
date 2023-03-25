const jsExtensions = [
    '.ts',
    '.d.ts'
];

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json'
    },
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
    settings: {
        'import/external-module-folders': [
            'node_modules',
            'node_modules/@types'
        ],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
        },
        'import/resolver': {
            node: {
                extensions: jsExtensions
            }
        }
    },
    rules: {
        'no-process-exit': 0,
        quotes: [
            'error',
            'single',
            { avoidEscape: true, allowTemplateLiterals: false }
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                // 跟 vscode 的 source.organizeImports 冲突了，只能关掉
                // source.organizeImports 自动修复 import 是不加尾部 trailingComma 号的
                trailingComma: 'none'
            }
        ], // Prettier 加入 eslint 校验，并以错误展示
        'no-dupe-class-members': 'off',
        'promise/prefer-await-to-then': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
                caughtErrors: 'none'
            }
        ],
        // https://github.com/mysticatea/eslint-plugin-node/blob/HEAD/docs/rules/no-missing-import.md
        'node/no-missing-import': 'off',
        'import/no-unresolved': 'off',
        // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
        'import/named': 'off',
        'node/no-unsupported-features/es-syntax': 0,
        // https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/no-unpublished-import.md
        'node/no-unpublished-import': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
        '@typescript-eslint/type-annotation-spacing': 'off',
        // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
        camelcase: 'off',
        'babel/camelcase': 'off',
        indent: 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        // type A = { foo: string; }; export { A };
        'no-undef': 'off',
        'prefer-named-capture-group': 'off',
        'no-useless-constructor': 'off',
        'no-array-constructor': 'off',
        'func-call-spacing': 'off',
        // @BUG no ignore
        'no-magic-numbers': 'off',
        semi: 'off',
        'no-empty-function': 'off',
        'one-var': ['error', 'never'],
        'react/require-default-props': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
        '@typescript-eslint/array-type': 'off',
        // '@typescript-eslint/array-type': [
        //   'error',
        //   {
        //     default: 'array-simple',
        //     readonly: 'array-simple',
        //   },
        // ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
        '@typescript-eslint/await-thenable': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
        '@typescript-eslint/ban-types': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
        '@typescript-eslint/explicit-function-return-type': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/indent': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
        '@typescript-eslint/member-delimiter-style': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-naming.md
        '@typescript-eslint/member-naming': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',
                    'static-field',
                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',
                    'static-method',
                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',
                    'instance-field',
                    'public-field',
                    'protected-field',
                    'private-field',
                    'field',
                    'constructor',
                    // 'public-instance-method',
                    // 'protected-instance-method',
                    // 'private-instance-method',
                    'instance-method',
                    // 'public-method',
                    // 'protected-method',
                    // 'private-method',
                    'method'
                ]
            }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
        '@typescript-eslint/no-array-constructor': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
        '@typescript-eslint/no-empty-interface': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
        // @TODO disable?
        '@typescript-eslint/no-explicit-any': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
        '@typescript-eslint/no-extraneous-class': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
        '@typescript-eslint/no-for-in-array': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
        '@typescript-eslint/no-inferrable-types': [
            'error',
            { ignoreProperties: true }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
        '@typescript-eslint/no-misused-new': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
        '@typescript-eslint/no-namespace': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
        // @feedback 在 middleware 下，如果有些参数是 optional 的，会在上一层被拦截掉，下一层一定会有这个参数
        '@typescript-eslint/no-non-null-assertion': 'off',
        // '@typescript-eslint/no-non-null-assertion': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
        '@typescript-eslint/no-parameter-properties': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
        '@typescript-eslint/no-require-imports': 0,
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true
            }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
        '@typescript-eslint/no-type-alias': 'off',
        // '@typescript-eslint/no-type-alias': [
        //   'error',
        //   {
        //     allowAliases: 'in-unions-and-intersections',
        //     allowCallbacks: 'always',
        //     allowLiterals: 'in-unions-and-intersections',
        //     allowMappedTypes: 'in-unions-and-intersections',
        //   },
        // ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
        '@typescript-eslint/no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
                variables: false
            }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
        '@typescript-eslint/no-useless-constructor': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
        '@typescript-eslint/no-var-requires': 0,
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
        '@typescript-eslint/prefer-for-of': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
        '@typescript-eslint/prefer-function-type': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/pull/294
        '@typescript-eslint/prefer-includes': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/pull/289
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
        // @BUG
        '@typescript-eslint/promise-function-async': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
        '@typescript-eslint/restrict-plus-operands': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
        '@typescript-eslint/unbound-method': 'off',
        // '@typescript-eslint/unbound-method': [
        //   'error',
        //   {
        //     ignoreStatic: true,
        //   },
        // ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
        '@typescript-eslint/unified-signatures': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
        '@typescript-eslint/func-call-spacing': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
        '@typescript-eslint/no-magic-numbers': 'off',
        // '@typescript-eslint/no-magic-numbers': [
        //   'error',
        //   { ignoreNumericLiteralTypes: true, ignoreEnums: true },
        // ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
        '@typescript-eslint/semi': ['error', 'always'],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
        '@typescript-eslint/prefer-regexp-exec': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
        '@typescript-eslint/consistent-type-definitions': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                allow: []
            }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
        '@typescript-eslint/no-floating-promises': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
        '@typescript-eslint/strict-boolean-expressions': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
        '@typescript-eslint/prefer-readonly': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
        '@typescript-eslint/no-misused-promises': [
            'error',
            { checksVoidReturn: false }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
        '@typescript-eslint/require-await': 'off',
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: false,
                arrowParameter: false,
                memberVariableDeclaration: true,
                objectDestructuring: false,
                parameter: false,
                propertyDeclaration: true,
                variableDeclaration: false,
                variableDeclarationIgnoreFunction: true
            }
        ],
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin//docs/rules/no-unnecessary-type-arguments.md
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    },
    // https://eslint.org/docs/user-guide/configuring#configuring-plugins
    plugins: [
        '@typescript-eslint',
        'prettier',
        'promise',
        'node'
    ],
    // https://eslint.org/docs/user-guide/configuring#extending-configuration-files
    extends: [
        // https://eslint.org/docs/user-guide/configuring#using-eslintrecommended
        'eslint:recommended',
        'plugin:promise/recommended',
        'plugin:node/recommended'
    ],
    env: {
        es6: true
    },
    settings: {
        'import/resolver': 'webpack',
        'import/extensions': jsExtensions
    }
};
