import mdx from "@next/mdx";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    typedRoutes: true,
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

const withMDX = mdx({
  options: {
    rehypePlugins: [rehypeMdxCodeProps],
  },
});
export default withMDX(nextConfig);
