import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
        {
            protocol: "https", 
            hostname: "img.clerk.com",
        },
    
        {
            protocol: "https", 
            hostname: "images.unsplash.com",
        },
        {
            protocol: "https", 
            hostname: "lh3.googleusercontent.com",
        }
    ],
},
eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
};

export default nextConfig;
