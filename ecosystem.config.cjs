// pm2 start ecosystem.config.cjs

module.exports = {
    apps: [{
        name: 'app',
        script: 'dist/src-server/index.js',
        node_args: '--experimental-modules',
        instances: 1,
        autorestart: true,
        watch: false,
        time: true,

        env: {
            NODE_ENV: 'production',
        },
    }],
}
