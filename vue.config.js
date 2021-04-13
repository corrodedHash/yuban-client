process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    pwa: {
        workboxOptions: {
            navigateFallback: 'index.html',
            skipWaiting: true,
            clientsClaim: true,
        }
    },
    runtimeCompiler: true,
    devServer: {
        compress: true,
        proxy: {
            '^/api': {
                target: 'http://localhost:8000'
            }
        }
    },
};