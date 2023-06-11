module.exports =  {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  modularizeImports: {
    '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
    }
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
