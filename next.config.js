module.exports =  {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

// experimental: {
//   esmExternals: "loose", // <-- add this
//   serverComponentsExternalPackages: ["mongoose"] // <-- and this
// },
// // and the following to enable top-level await support for Webpack
// webpack(config) {
//   config.experiments = { ...config.experiments, topLevelAwait: true }
//   return config
// },
