module.exports = {
    apps: [
        {
            name: 'alt_mobile_b2c',
            port: '3004',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}