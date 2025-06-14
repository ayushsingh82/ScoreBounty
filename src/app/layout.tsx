"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { Chain } from 'wagmi/chains';
import {
 
  hardhat,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const graphitetestnet = {
  id: 54170,
  name: "Graphite Testnet",
  nativeCurrency: {
    name: "Graphite",
    symbol: "@G",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://anon-entrypoint-test-1.atgraphite.com'] },
    public: { http: ['https://anon-entrypoint-test-1.atgraphite.com'] }
  },
  blockExplorers: {
    default: { name: 'Graphite Explorer', url: 'https://explorer.atgraphite.com' }
  },
  testnet: true
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Graphite',
  projectId: 'YOUR_PROJECT_ID',
  chains: [graphitetestnet , hardhat ],
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <nav className="bg-black border-b border-green-800/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Name */}
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              ScoreBounty
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center gap-6">
                <Link 
                  href="/gigs" 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  Explore Gigs
                </Link>
                <Link 
                  href="/reputation" 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                 Reputation
                </Link>
                <Link 
                  href="/kyc" 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                 KYC
                </Link>
                <ConnectButton />
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

        <footer className="bg-black border-t border-green-800/50 mt-auto">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                ScoreBounty
                </h3>
                <p className="text-green-100/80 text-sm">
                  Building the future of decentralized work through trust and reputation.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-green-400 font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/gigs" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Browse Gigs
                    </Link>
                  </li>
                  <li>
                    <Link href="/create-gig" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Create Gig
                    </Link>
                  </li>
                  <li>
                    <Link href="/register-skill" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Register Skills
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-green-400 font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/help" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-green-400 font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-green-100/80 hover:text-green-300 transition-colors text-sm">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-green-100/60 text-sm">
                © {new Date().getFullYear()} ScoreBounty. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="https://twitter.com" className="text-green-100/60 hover:text-green-300 transition-colors">
                  Twitter
                </Link>
                <Link href="https://github.com" className="text-green-100/60 hover:text-green-300 transition-colors">
                  GitHub
                </Link>
                <Link href="https://discord.com" className="text-green-100/60 hover:text-green-300 transition-colors">
                  Discord
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
