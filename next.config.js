/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
        serverActions: true,
        esmExternals: true
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config, { isServer }) => {
        // Add a new rule for .node files
        config.module.rules.push({
            test: /\.node$/,
            use: 'node-loader',
        });

        // Return the updated config
        return config;
    },
};