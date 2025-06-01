'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreateGig() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedTypes: [] as string[],
    bountyPrize: ''
  })
  const [newType, setNewType] = useState('')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
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
                Bounty Prize (ETH)
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
                  ETH
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
              >
                Create Gig
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}