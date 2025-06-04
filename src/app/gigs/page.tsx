'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useContractRead } from 'wagmi'

// Contract ABI
const gigABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gigId",
        "type": "uint256"
      }
    ],
    "name": "getGig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "gigTypes",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "bountyPrize",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minReputation",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "createdAt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGigCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const GIG_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000001002";

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

export default function GigsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [gigs, setGigs] = useState<Gig[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Read total number of gigs
  const { data: gigCount } = useContractRead({
    address: GIG_CONTRACT_ADDRESS as `0x${string}`,
    abi: gigABI,
    functionName: 'getGigCount',
  });

  // Read gig details for each gig
  const { data: gigData } = useContractRead({
    address: GIG_CONTRACT_ADDRESS as `0x${string}`,
    abi: gigABI,
    functionName: 'getGig',
    args: [BigInt(0)], // This will be updated for each gig
  });

  useEffect(() => {
    const fetchGigs = async () => {
      if (!gigCount) return;

      const fetchedGigs: Gig[] = [];
      for (let i = 0; i < Number(gigCount); i++) {
        try {
          const { data } = await useContractRead({
            address: GIG_CONTRACT_ADDRESS as `0x${string}`,
            abi: gigABI,
            functionName: 'getGig',
            args: [BigInt(i)],
          });

          if (data) {
            const [
              id,
              title,
              description,
              types,
              bountyPrize,
              minReputation,
              creator,
              isActive,
              createdAt
            ] = data as [bigint, string, string, string[], bigint, bigint, string, boolean, bigint];

            if (isActive) {
              fetchedGigs.push({
                id: Number(id),
                title,
                description,
                types,
                bountyPrize: (Number(bountyPrize) / 1e18).toFixed(2),
                minReputation: Number(minReputation) / 100, // Convert from 0-100 to 0-1 scale
                creator,
                isActive,
                createdAt: new Date(Number(createdAt) * 1000).toISOString().split('T')[0]
              });
            }
          }
        } catch (error) {
          console.error(`Error fetching gig ${i}:`, error);
        }
      }
      setGigs(fetchedGigs);
      setIsLoading(false);
    };

    fetchGigs();
  }, [gigCount]);

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || gig.types.includes(selectedType)
    return matchesSearch && matchesType
  })

  const allTypes = Array.from(new Set(gigs.flatMap(gig => gig.types)))

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Explore Gigs
          </h1>
          <Link 
            href="/create-gig"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create New Gig
          </Link>
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
                placeholder="Search gigs..."
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-green-100/80">Loading gigs...</p>
          </div>
        )}

        {/* Gig Listings */}
        {!isLoading && (
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
                  </div>
                  <button className="text-green-400 hover:text-green-300 transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredGigs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-green-100/80 mb-4">No gigs found matching your criteria.</p>
            <Link
              href="/create-gig"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Create the first gig →
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}