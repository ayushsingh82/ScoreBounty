import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graphite - Reputation-Based Gig Economy",
  description: "A decentralized platform where freelancers are matched with gigs based on their Trust Score",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-black border-b border-green-800/50">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Name */}
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Graphite
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
                  href="/profile" 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  Your Data
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
