"use client";

import React, { useState, useEffect } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

// KYC contract ABI
const kycABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_level",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_data",
        "type": "bytes32"
      }
    ],
    "name": "createKYCRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_senderKYCIndex",
        "type": "uint256"
      }
    ],
    "name": "viewMyRequest",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "level",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "status",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "kycCenter",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deposit",
            "type": "uint256"
          }
        ],
        "internalType": "struct KYCContract.KYCRequest",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getLastGlobalRequestIndexOfAddress",
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

const KYC_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000001001";

const KYCLevels = [
  { level: 0, name: "Level 0", description: "Basic verification" },
  { level: 1, name: "Level 1", description: "Standard verification" },
  { level: 2, name: "Level 2", description: "Enhanced verification" }
] as const;

const KYCStatus = {
  0: "Pending",
  1: "Declined",
  2: "Approved",
  3: "Withdrawn"
} as const;

type KYCRequest = {
  user: string;
  level: bigint;
  status: bigint;
  kycCenter: string;
  deposit: bigint;
};

type KYCStatusType = typeof KYCStatus;
type KYCStatusKey = keyof KYCStatusType;

const KYCPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [uuid, setUuid] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [kycStatus, setKycStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [kycResult, setKycResult] = useState<string>('');
  const [lastRequestIndex, setLastRequestIndex] = useState<bigint>(BigInt(-1));
  const [currentRequest, setCurrentRequest] = useState<KYCRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Contract write hook
  const { writeContract } = useContractWrite();

  // Read last request index
  const { data: lastIndex } = useContractRead({
    address: KYC_CONTRACT_ADDRESS as `0x${string}`,
    abi: kycABI,
    functionName: 'getLastGlobalRequestIndexOfAddress',
    args: [KYC_CONTRACT_ADDRESS as `0x${string}`],
  });

  // Read current request
  const { data: requestData } = useContractRead({
    address: KYC_CONTRACT_ADDRESS as `0x${string}`,
    abi: kycABI,
    functionName: 'viewMyRequest',
    args: [lastRequestIndex],
  });

  useEffect(() => {
    if (lastIndex !== undefined) {
      setLastRequestIndex(lastIndex as bigint);
    }
  }, [lastIndex]);

  useEffect(() => {
    if (requestData) {
      setCurrentRequest(requestData as KYCRequest);
    }
  }, [requestData]);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  };

  const processKYCRequest = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('https://test.kyc.atgraphite.com/api/kyc/process-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: uuid }),
      });

      const result = await response.json();
      setKycStatus('success');
      setKycResult(result.approved ? 'Approved' : 'Rejected');
    } catch (error) {
      console.error('Error in KYC verification:', error);
      setError('Failed to verify KYC. Please try again.');
      setKycStatus('error');
      setKycResult('Error processing KYC request');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!uuid) {
      alert('Please generate a UUID first');
      return;
    }

    setKycStatus('pending');
    const dataHash = createHash('sha256').update(uuid).digest('hex');
    
    try {
      await writeContract({
        address: KYC_CONTRACT_ADDRESS as `0x${string}`,
        abi: kycABI,
        functionName: 'createKYCRequest',
        args: [BigInt(selectedLevel), `0x${dataHash}`],
      });
      await processKYCRequest();
    } catch (error) {
      console.error('Error in KYC verification:', error);
      setError('Failed to verify KYC. Please try again.');
      setKycStatus('error');
      setKycResult('Error submitting KYC request');
    }
  };

  const updateKYCLevel = async () => {
    try {
      // ... existing updateKYCLevel logic ...
    } catch (error) {
      console.error('Error in KYC level update:', error);
      setError('Failed to update KYC level. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black/95 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          KYC Verification
        </h1>

        {/* Current KYC Status */}
        {currentRequest && (
          <div className="bg-black/50 border border-green-800/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Current KYC Status</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-green-100/60">Level</p>
                  <p className="text-green-300">Level {currentRequest.level.toString()}</p>
                </div>
                <div>
                  <p className="text-green-100/60">Status</p>
                  <p className="text-green-300">{KYCStatus[Number(currentRequest.status) as KYCStatusKey]}</p>
                </div>
                <div>
                  <p className="text-green-100/60">KYC Center</p>
                  <p className="text-green-300">{currentRequest.kycCenter}</p>
                </div>
                <div>
                  <p className="text-green-100/60">Deposit</p>
                  <p className="text-green-300">{currentRequest.deposit.toString()} @G</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-black/50 border border-green-800/50 rounded-lg p-6 mb-8">
          <div className="space-y-6">
            {/* KYC Level Selection */}
            <div>
              <label className="block text-green-400 mb-2">Select KYC Level</label>
              <div className="grid grid-cols-3 gap-4">
                {KYCLevels.map(({ level, name, description }) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedLevel === level
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-green-800/50 hover:border-green-500'
                    }`}
                  >
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-green-100/60">{description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* UUID Generation */}
            <div>
              <label className="block text-green-400 mb-2">UUID</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={uuid}
                  readOnly
                  placeholder="Generate a UUID"
                  className="flex-1 px-4 py-2 bg-black/50 border border-green-800/50 rounded-lg focus:outline-none focus:border-green-500 text-white"
                />
                <button
                  onClick={generateUUID}
                  className="px-6 py-2 bg-green-500/10 border border-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !uuid}
              className={`w-full py-3 rounded-lg transition-all ${
                isProcessing || !uuid
                  ? 'bg-gray-500/50 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Submit KYC Request'}
            </button>

            {/* Status Display */}
            {kycStatus !== 'idle' && (
              <div className={`p-4 rounded-lg ${
                kycStatus === 'success' ? 'bg-green-500/10 border border-green-500' :
                kycStatus === 'error' ? 'bg-red-500/10 border border-red-500' :
                'bg-yellow-500/10 border border-yellow-500'
              }`}>
                <h3 className="font-semibold mb-2">
                  {kycStatus === 'success' ? 'KYC Status' :
                   kycStatus === 'error' ? 'Error' :
                   'Processing'}
                </h3>
                <p className="text-green-100/80">
                  {kycResult || 'Your KYC request is being processed...'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-black/50 border border-green-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-4">About KYC Process</h2>
          <div className="space-y-4 text-green-100/80">
            <p>The KYC verification process involves several steps:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select your desired KYC level</li>
              <li>Generate a UUID for verification</li>
              <li>Submit your KYC request with the required deposit</li>
              <li>Wait for KYC Center verification</li>
              <li>Receive approval or rejection</li>
            </ol>
            <p className="mt-4 text-sm">
              Note: This is a testnet implementation. The approval/rejection is simulated with a 50% probability.
              All private data stays off-chain between you and the KYC Center.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
