import mdx from "@next/mdx";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  experimental: {
    typedRoutes: true,
  },
};

const withMDX = mdx({
  options: {
    rehypePlugins: [rehypeMdxCodeProps],
  },
});
export default withMDX(nextConfig);
