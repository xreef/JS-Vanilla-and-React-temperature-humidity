// const resolveAlias = require('./config/resolveAlias').eslint;

module.exports = {
    // settings: {
    //   'import/resolver': {
    //     // alias: resolveAlias,
    //   }
    // },
    parser: 'babel-eslint',
    plugins: [
        'babel',
        // 'flowtype',
        'jest'
    ],
    extends: [
        'eslint:recommended',
        'airbnb',
        // 'plugin:flowtype/recommended',
        // 'react-app'
    ],
    rules: {
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        'jsx-a11y/anchor-is-valid': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/aria-props': 0,
        'jsx-a11y/aria-role': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/interactive-supports-focus': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/label-has-for': 0,
        "jsx-a11y/label-has-associated-control": 0,
        'jsx-a11y/role-has-required-aria-props': 0,
        'jsx-a11y/href-no-hash': 'off',
        'linebreak-style': 0,
        'no-console': ["error", { allow: ["warn", "error"] }],
        // dirty-hack, added because of eslint bug with TemplateLiteral processing:
        // "TypeError: Cannot read property 'range' of null" in "template-curly-spacing" rule
        'template-curly-spacing': 0,

        // ########################################
        // THESE RULES WILL BE CHANGED TO MORE STRICT IN FUTURE!
        'semi': 0,
        'quotes': 0,
        'comma-dangle': 0,
        'import/order': 0,
        'class-methods-use-this': 0,
        'no-debugger': 1,
        'no-unused-expressions': 1,
        'keyword-spacing': 1,
        'no-else-return': 1,
        'implicit-arrow-linebreak': 1,
        'consistent-return': 1,
        'nonblock-statement-body-position': 1,
        'curly': 1,
        'arrow-parens': 0,
        'react/jsx-indent': [0, 2, { indentLogicalExpressions: true }],
        'prefer-template': 0,
        'react/jsx-indent-props': 0,
        'react/prefer-stateless-function': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/require-default-props': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-access-state-in-setstate': 0,
        'react/destructuring-assignment': 1,
        'react/jsx-props-no-spreading': 1,
        'react/jsx-curly-newline': 1,
        'react/prop-types': 1,
        'react/sort-comp': 1,
        'react/jsx-curly-brace-presence': 1,
        'react/forbid-prop-types': 1,
        'react/default-props-match-prop-types': 1,
        'react/no-array-index-key': 1,
        'react/jsx-fragments': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
        'import/prefer-default-export': 1,
        'no-underscore-dangle': 0,
        'no-param-reassign': 1,
        'max-len': 1,
        'no-plusplus': 1,
        'operator-linebreak': ['warn', 'before', { overrides: { '=': 'none' } }],
        // copied from node_modules/eslint-config-airbnb-base/rules/style.js,
        // and added `ignoredNodes: "TemplateLiteral"`
        'indent': ['off', 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: { parameters: 1, body: 1 },
            FunctionExpression: { parameters: 1, body: 1 },
            CallExpression: { arguments: 1 },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: [
                'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName',
                'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement',
                'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild', 'TemplateLiteral'
            ],
            ignoreComments: false
        }],
    },
    env: {
        browser: true,
        'jest/globals': true
    },
    // reportUnusedDisableDirectives: true,
    globals: {
        // getFlatEverisResponse: 'writable',
        // moment: 'readonly',
        configurations: 'readonly'
    }
};
