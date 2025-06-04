'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useContractWrite } from 'wagmi'

// Contract ABI
const gigABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_gigTypes",
        "type": "string[]"
      },
      {
        "internalType": "uint256",
        "name": "_bountyPrize",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minReputation",
        "type": "uint256"
      }
    ],
    "name": "createGig",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const GIG_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000001002";

export default function CreateGig() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedTypes: [] as string[],
    bountyPrize: '',
    minReputation: 0.5
  })
  const [newType, setNewType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { writeContract } = useContractWrite();

  const handleAddType = () => {
    if (newType.trim() && !formData.selectedTypes.includes(newType.trim())) {
      setFormData(prev => ({
        ...prev,
        selectedTypes: [...prev.selectedTypes, newType.trim()]
      }))
      setNewType('')
    }
  }

  const handleRemoveType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTypes: prev.selectedTypes.filter(t => t !== type)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert reputation score from 0-1 to 0-100 scale
      const minReputationScore = Math.floor(formData.minReputation * 100)
      
      await writeContract({
        address: GIG_CONTRACT_ADDRESS as `0x${string}`,
        abi: gigABI,
        functionName: 'createGig',
        args: [
          formData.title,
          formData.description,
          formData.selectedTypes,
          BigInt(Math.floor(parseFloat(formData.bountyPrize) * 1e18)), // Convert to wei
          BigInt(minReputationScore)
        ],
      })
    } catch (error) {
      console.error('Error creating gig:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              Create New Gig
            </h1>
            <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
              ← Back to Home
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-green-400 mb-2 font-medium">
                Gig Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Enter a descriptive title for your gig"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-green-400 mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors min-h-[150px]"
                placeholder="Provide detailed information about your gig"
                required
              />
            </div>

            {/* Gig Types */}
            <div>
              <label className="block text-green-400 mb-2 font-medium">
                Gig Types
              </label>
              <div className="space-y-4">
                {/* Add New Type */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="flex-1 bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
                    placeholder="Add a new gig type"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddType())}
                  />
                  <button
                    type="button"
                    onClick={handleAddType}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center min-w-[40px]"
                  >
                    +
                  </button>
                </div>

                {/* Selected Types */}
                <div className="flex flex-wrap gap-2">
                  {formData.selectedTypes.map((type) => (
                    <div
                      key={type}
                      className="bg-green-600/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 group"
                    >
                      <span>{type}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveType(type)}
                        className="text-green-400 hover:text-red-400 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bounty Prize */}
            <div>
              <label htmlFor="bountyPrize" className="block text-green-400 mb-2 font-medium">
                Bounty Prize (@G)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="bountyPrize"
                  value={formData.bountyPrize}
                  onChange={(e) => setFormData(prev => ({ ...prev, bountyPrize: e.target.value }))}
                  className="w-full bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
                  @G
                </span>
              </div>
            </div>

            {/* Minimum Reputation Score */}
            <div>
              <label htmlFor="minReputation" className="block text-green-400 mb-2 font-medium">
                Minimum Reputation Score: {formData.minReputation.toFixed(2)}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  id="minReputation"
                  min="0"
                  max="1"
                  step="0.01"
                  value={formData.minReputation}
                  onChange={(e) => setFormData(prev => ({ ...prev, minReputation: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-green-800/50 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-sm text-green-100/60">
                  <span>0</span>
                  <span>0.5</span>
                  <span>1.0</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-green-500/20 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Gig'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}