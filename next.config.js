/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      instrumentationHook: true
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*',
            port: '',
          },
        ],
      },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        if (isServer) {
            config.ignoreWarnings = [
                { module: /opentelemetry/, },
            ]
        }
        return config
    },
}

module.exports = nextConfig
