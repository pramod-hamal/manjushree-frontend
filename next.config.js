/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress:true,
  distDir:"build",
  images:{
    domains:["images.unsplash.com","randomuser.me","imgs.search.brave.com","th.bing.com","ui-avatars.com"],
    minimumCacheTTL:15
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },env:{
    baseUrl:"https://scbe.leanq.digital",
    subDomain:"leanq"
  }
}

module.exports = nextConfig