"use client"

import Link from 'next/link'
import { useAccount } from 'wagmi'

export default function LandingPage() {
  const { address } = useAccount()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black z-0" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Decentralized Freelancing
              <br />
              Powered by Trust
            </h1>
            <p className="text-xl text-green-100/80 mb-8">
              Build your reputation, earn trust, and unlock premium opportunities in the decentralized freelance marketplace.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/gigs"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Browse Gigs
              </Link>
              <Link
                href="/create-gig"
                className="bg-transparent text-green-400 border-2 border-green-400 px-8 py-3 rounded-lg hover:bg-green-400/10 transition-colors text-lg font-medium"
              >
                Post a Gig
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Trust Score System */}
            <div className="bg-green-950/40 border border-green-800/50 rounded-lg p-8 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-4">Trust Score System</h3>
              <p className="text-green-100/80">
                Build your reputation through successful project completions and verified client feedback.
              </p>
            </div>

            {/* Skill-Based Matching */}
            <div className="bg-green-950/40 border border-green-800/50 rounded-lg p-8 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-4">Skill-Based Matching</h3>
              <p className="text-green-100/80">
                Advanced algorithms match your expertise with the perfect opportunities.
              </p>
            </div>

            {/* Premium Projects */}
            <div className="bg-green-950/40 border border-green-800/50 rounded-lg p-8 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-4">Premium Projects</h3>
              <p className="text-green-100/80">
                Access exclusive high-value projects as your trust score grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-950/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-green-100/80 mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who are already building their reputation and earning on our platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/gigs"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
            >
              Browse Gigs
            </Link>
            {!address && (
              <button
                className="bg-transparent text-green-400 border-2 border-green-400 px-8 py-3 rounded-lg hover:bg-green-400/10 transition-colors text-lg font-medium"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
