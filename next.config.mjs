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
    // config.output.assetModuleFilename = "static/[hash][ext]";
    // config.output.publicPath = "/_next/";
    // config.module.rules.push({
    //   test: /\.wasm/,
    //   type: "asset/resource",
    // });
    config.module.noParse = /node_modules\/sql\.js\/dist\//;

    return config;
  },
};

export default nextConfig;
