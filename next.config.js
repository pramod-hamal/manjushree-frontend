/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress:true,
  output:"export",
  distDir:"build",
  images:{
    domains:["images.unsplash.com","randomuser.me","imgs.search.brave.com"],
    minimumCacheTTL:15
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },env:{
    
  }
}

module.exports = nextConfig