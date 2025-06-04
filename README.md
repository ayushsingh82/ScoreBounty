# ScoreBounty - Reputation-Based Bounty Platform

A decentralized platform where bounty hunters can find and claim bounties based on their reputation score. The platform ensures quality through a reputation system and KYC verification through the Graphite Network.

## Features

- **Reputation Score System**: Bounty hunters build reputation through successful bounty completions
- **Minimum Reputation Requirements**: Each bounty has a minimum reputation score requirement
- **Graphite Network KYC**: Seamless KYC verification through Graphite Network to ensure trust and security
- **Bounty Registration**: Easy process for posting new bounties with specific requirements
- **Smart Contract Integration**: Built on blockchain for transparency and automated payouts
- **Quality Assurance**: Built-in mechanisms to ensure bounty completion quality

## Core Components

### For Bounty Posters
- Register new bounties with detailed requirements
- Set minimum reputation score requirements
- Define bounty prize in @G tokens
- Monitor bounty progress and completion

### For Bounty Hunters
- View available bounties with reputation requirements
- Check personal reputation score
- Apply for bounties if reputation score meets requirements
- Complete KYC verification through Graphite Network to claim bounties
- Build reputation through successful completions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Solidity Smart Contracts
- Wagmi for Web3 Integration
- Graphite Network KYC Integration

## Smart Contracts

The platform uses several smart contracts:
- `RegisterGig.sol`: For bounty registration and management
- `KYCContract.sol`: For KYC verification and reputation management through Graphite Network

## Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Graphite Network Documentation](https://docs.graphite.network)