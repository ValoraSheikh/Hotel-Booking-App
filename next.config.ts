/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.material-tailwind.com',
      },
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'api.uifaces.co',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh", // ✅ allows any UploadThing subdomain
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: '**.uploadthing.com', // fallback if your UploadThing host has subdomains
      },
      {
        protocol: 'https',
        hostname: 'uploadthing-prod.s3.us-west-2.amazonaws.com', // commonly used CDN
      },
    ],
  },
}

module.exports = nextConfig
