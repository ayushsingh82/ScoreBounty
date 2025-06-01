'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock data - In a real app, this would come from your backend
const mockGigs = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    description: 'Looking for an experienced full stack developer to build a decentralized application.',
    types: ['Web Development', 'Blockchain Development'],
    bountyPrize: '2.5',
    createdAt: '2024-03-15'
  },
  {
    id: 2,
    title: 'Mobile App UI/UX Design',
    description: 'Need a creative UI/UX designer for a fintech mobile application.',
    types: ['UI/UX Design', 'Mobile Development'],
    bountyPrize: '1.8',
    createdAt: '2024-03-14'
  },
  {
    id: 3,
    title: 'Machine Learning Model Development',
    description: 'Seeking ML expert to develop and train custom models for data analysis.',
    types: ['Machine Learning', 'Data Science'],
    bountyPrize: '3.2',
    createdAt: '2024-03-13'
  }
]

export default function GigsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredGigs = mockGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || gig.types.includes(selectedType)
    return matchesSearch && matchesType
  })

  const allTypes = Array.from(new Set(mockGigs.flatMap(gig => gig.types)))

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

        {/* Gig Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map(gig => (
            <div
              key={gig.id}
              className="bg-green-950/40 border border-green-800/50 rounded-lg p-6 hover:border-green-500 transition-colors flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-green-400">{gig.title}</h2>
                <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {gig.bountyPrize} ETH
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
              <div className="flex justify-end">
                <button className="text-green-400 hover:text-green-300 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGigs.length === 0 && (
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