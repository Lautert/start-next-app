const path = require('path');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
    future: {
        webpack5: true,
    },
    webpack: function (config, options) {
        config.experiments = {};
        return config;
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
    images: {
        loader: "imgix",
        path: "",
    },
});