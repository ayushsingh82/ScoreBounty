"use client";

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function KYCPage() {
  const [uuid, setUuid] = useState<string>('');
  const [kycStatus, setKycStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid) {
      alert('Please generate a UUID first');
      return;
    }

    try {
      setKycStatus('loading');
      setStatusMessage('Verifying KYC...');

      // Simulate KYC verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful verification
      setKycStatus('success');
      setStatusMessage('KYC verification successful!');
    } catch (err) {
      console.error('Error in KYC verification:', err);
      setKycStatus('error');
      setStatusMessage('Failed to verify KYC. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">KYC Verification</h1>
        
        <div className="bg-green-950/40 border border-green-800/50 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Generate UUID</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={uuid}
                readOnly
                className="flex-1 bg-green-950/40 border border-green-800/50 rounded-lg px-4 py-2 text-white"
                placeholder="Your UUID will appear here"
              />
              <button
                onClick={generateUUID}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Generate UUID
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-green-400 mb-4">Submit KYC</h2>
              <p className="text-green-100/80 mb-4">
                Use the generated UUID to complete your KYC verification process.
              </p>
              <button
                type="submit"
                disabled={!uuid || kycStatus === 'loading'}
                className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg transition-colors ${
                  !uuid || kycStatus === 'loading'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-green-700'
                }`}
              >
                {kycStatus === 'loading' ? 'Verifying...' : 'Submit KYC'}
              </button>
            </div>
          </form>

          {statusMessage && (
            <div className={`mt-6 p-4 rounded-lg ${
              kycStatus === 'success' 
                ? 'bg-green-600/20 text-green-400 border border-green-500/50'
                : kycStatus === 'error'
                ? 'bg-red-600/20 text-red-400 border border-red-500/50'
                : 'bg-green-600/20 text-green-400 border border-green-500/50'
            }`}>
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
