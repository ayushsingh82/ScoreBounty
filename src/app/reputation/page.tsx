"use client";

import React, { useState } from 'react';
import { useContractRead } from 'wagmi';

// Reputation contract ABI - only including the function we need
const reputationABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "getReputation",
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

const REPUTATION_ADDRESS = "0x0000000000000000000000000000000000001008";

const ReputationPage = () => {
  const [address, setAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const { data: reputation, isError, isLoading } = useContractRead({
    address: REPUTATION_ADDRESS as `0x${string}`,
    abi: reputationABI,
    functionName: 'getReputation',
    args: [address as `0x${string}`],
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
    // Basic address validation
    setIsValidAddress(value.length === 42 && value.startsWith('0x'));
  };

  return (
    <div className="min-h-screen bg-black/95 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reputation Checker
        </h1>
        
        <div className="bg-black/50 border border-green-800/50 rounded-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="address" className="block text-green-400 mb-2">
              Enter Wallet Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="0x..."
              className="w-full px-4 py-2 bg-black/50 border border-green-800/50 rounded-lg focus:outline-none focus:border-green-500 text-white"
            />
            {!isValidAddress && address && (
              <p className="text-red-500 mt-2">Please enter a valid Ethereum address</p>
            )}
          </div>

          <div className="bg-black/30 border border-green-800/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Reputation Score</h2>
            {isLoading ? (
              <div className="text-green-300">Loading...</div>
            ) : isError ? (
              <div className="text-red-500">Error loading reputation</div>
            ) : reputation !== undefined ? (
              <div className="space-y-4">
                <div className="text-3xl font-bold text-green-300">
                  {Number(reputation) / 100}%
                </div>
                <div className="w-full bg-black/50 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Number(reputation) / 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-green-300">Enter an address to check reputation</div>
            )}
          </div>
        </div>

        <div className="bg-black/50 border border-green-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-4">How Reputation is Calculated</h2>
          <div className="space-y-4 text-green-100/80">
            <p>Reputation is calculated based on several factors:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Creation Date (CD)</li>
              <li>Account Activation (A)</li>
              <li>KYC Level</li>
              <li>Transaction Quantity (QTx)</li>
              <li>Balance Difference (Diff)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReputationPage;