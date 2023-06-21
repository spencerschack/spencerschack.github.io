/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    typedRoutes: true,
    esmExternals: "loose",
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Needed for sql.js
      config.resolve.fallback = {
        fs: false,
      };
    }

    config.experiments.asyncWebAssembly = true;
    config.module.noParse = /node_modules\/sql\.js\/dist\//;

    return config;
  },
};

export default nextConfig;
