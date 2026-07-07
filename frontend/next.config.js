/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8080/api',
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'your_razorpay_key_here',
  }
}

module.exports = nextConfig