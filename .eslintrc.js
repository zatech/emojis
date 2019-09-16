module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        'comma-dangle': [ 'error', 'always', ],
        indent: [ 'error', 4 ],
        semi: [ 'error', 'always', ],
        quotes: [ 'error', 'single', ],
    },
};
