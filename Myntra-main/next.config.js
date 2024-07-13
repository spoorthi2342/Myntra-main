/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        domains:  ['images.myntra.com' , "assets.myntassets.com"],
        
      },
      async rewrites() {
        return [
          {
            source: '/greet',
            destination: 'http://localhost:5000/greet',
          },
          {
            source: '/analyze',
            destination: 'http://localhost:5000/analyze',
          },
        ];
      },

}
