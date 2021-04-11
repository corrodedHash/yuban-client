module.exports = {
    pwa: {
        workboxOptions: {
            navigateFallback: 'index.html'
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