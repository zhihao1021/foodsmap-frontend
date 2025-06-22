import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `
      @use "@/styles/colors" as *;
      @use "@/styles/templates" as *;
      @use "@/styles/variables" as *;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // ppr: "incremental"
  }
};

export default nextConfig;
