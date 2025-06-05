'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'

// Sample data for gigs
const SAMPLE_GIGS = [
  {
    id: 1,
    title: "Build a Decentralized Voting System",
    description: "Create a secure and transparent voting system using smart contracts. Must include features like vote delegation, vote counting, and result verification.",
    types: ["Smart Contracts", "Solidity", "Web3"],
    bountyPrize: "2.5",
    minReputation: 0.75,
    creator: "0x1234...5678",
    isActive: true,
    createdAt: "2024-03-15"
  },
  {
    id: 2,
    title: "Design NFT Marketplace UI",
    description: "Create a modern and user-friendly UI for an NFT marketplace. Should include features like filtering, sorting, and detailed NFT views.",
    types: ["UI/UX", "React", "TailwindCSS"],
    bountyPrize: "1.8",
    minReputation: 0.3,
    creator: "0x8765...4321",
    isActive: true,
    createdAt: "2024-03-14"
  },
  {
    id: 3,
    title: "Develop DeFi Yield Farming Strategy",
    description: "Create an automated yield farming strategy that optimizes returns across multiple DeFi protocols while managing risk.",
    types: ["DeFi", "Python", "Web3"],
    bountyPrize: "3.2",
    minReputation: 1.0,
    creator: "0x2468...1357",
    isActive: true,
    createdAt: "2024-03-13"
  },
  {
    id: 4,
    title: "Build Cross-Chain Bridge Interface",
    description: "Develop a user interface for a cross-chain bridge that supports multiple networks and tokens. Must include transaction status tracking and error handling.",
    types: ["Web3", "React", "TypeScript"],
    bountyPrize: "4.0",
    minReputation: 0.8,
    creator: "0x1357...2468",
    isActive: true,
    createdAt: "2024-03-12"
  }
];

type Gig = {
  id: number;
  title: string;
  description: string;
  types: string[];
  bountyPrize: string;
  minReputation: number;
  creator: string;
  isActive: boolean;
  createdAt: string;
};

// Submit Build Modal Component
function SubmitBuildModal({ isOpen, onClose, gig }: { isOpen: boolean; onClose: () => void; gig: Gig }) {
  const [buildDescription, setBuildDescription] = useState('');
  const [buildLink, setBuildLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the build to the contract
    console.log('Submitting build:', { gigId: gig.id, buildDescription, buildLink });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-green-950/90 border border-green-800/50 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-400">Submit Build for {gig.title}</h2>
          <button onClick={onClose} className="text-green-400 hover:text-green-300">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-green-400 mb-2">
              Build Description
            </label>
            <textarea
              id="description"
              value={buildDescription}
              onChange={(e) => setBuildDescription(e.target.value)}
              className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
              rows={4}
              placeholder="Describe your build and how it meets the requirements..."
              required
            />
          </div>
          <div>
            <label htmlFor="link" className="block text-green-400 mb-2">
              Build Link
            </label>
            <input
              type="url"
              id="link"
              value={buildLink}
              onChange={(e) => setBuildLink(e.target.value)}
              className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
              placeholder="https://github.com/your-repo"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-green-400 hover:text-green-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Build
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function GigsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { address } = useAccount()

  // For demo purposes, set a fixed reputation score
  const userReputation = 0.5;
  const isKycVerified = true;

  const filteredGigs = SAMPLE_GIGS.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || gig.types.includes(selectedType)
    return matchesSearch && matchesType
  })

  const allTypes = Array.from(new Set(SAMPLE_GIGS.flatMap(gig => gig.types)))

  const canApplyForBounty = (minReputation: number) => {
    if (!address) return false;
    if (!isKycVerified) return false;
    return userReputation >= minReputation;
  };

  const handleApplyClick = (gig: Gig) => {
    if (canApplyForBounty(gig.minReputation)) {
      setSelectedGig(gig);
      setIsModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            ScoreBounty
          </h1>
          <div className="flex items-center gap-4">
            {address && (
              <div className="text-green-400">
                Reputation Score: {userReputation.toFixed(2)}
                {!isKycVerified && (
                  <Link href="/kyc" className="ml-4 text-yellow-400 hover:text-yellow-300">
                    Complete KYC →
                  </Link>
                )}
              </div>
            )}
            <Link 
              href="/create-gig"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Post Bounty
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-green-950/40 border border-green-800/50 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-green-400 mb-2 font-medium">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bounties..."
                className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-green-400 mb-2 font-medium">
                Filter by Type
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
              >
                <option value="">All Types</option>
                {allTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bounty Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGigs.map(gig => (
            <div
              key={gig.id}
              className="bg-green-950/40 border border-green-800/50 rounded-lg p-6 hover:border-green-500 transition-colors flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-green-400">{gig.title}</h2>
                <div className="bg-green-600/20 text-green-400 px-4 py-2 border border-green-500/50 text-sm font-medium">
                  {gig.bountyPrize} @G
                </div>
              </div>
              <p className="text-green-100/80 mb-4 flex-grow">{gig.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {gig.types.map(type => (
                  <span
                    key={type}
                    className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-green-100/60">
                  Min. Reputation: {gig.minReputation.toFixed(2)}
                  {address && (
                    <div className={`mt-1 ${
                      canApplyForBounty(gig.minReputation)
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {canApplyForBounty(gig.minReputation)
                        ? '✓ You can apply'
                        : '✗ Requirements not met'}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleApplyClick(gig)}
                  className={`text-green-400 hover:text-green-300 transition-colors ${
                    !canApplyForBounty(gig.minReputation) && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!canApplyForBounty(gig.minReputation)}
                >
                  {!address
                    ? 'Connect Wallet'
                    : !isKycVerified
                    ? 'Complete KYC'
                    : userReputation < gig.minReputation
                    ? 'Reputation Too Low'
                    : 'Apply for Bounty →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-100/80 mb-4">No bounties found matching your criteria.</p>
            <Link
              href="/create-gig"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Post the first bounty →
            </Link>
          </div>
        )}

        {/* Submit Build Modal */}
        {selectedGig && (
          <SubmitBuildModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedGig(null);
            }}
            gig={selectedGig}
          />
        )}
      </div>
    </main>
  )
}