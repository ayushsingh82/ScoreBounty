// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RegisterGig {
    struct Gig {
        uint256 id;
        string title;
        string description;
        string[] gigTypes;
        uint256 bountyPrize;
        address creator;
        bool isActive;
        uint256 createdAt;
    }

    // Mapping from gig ID to Gig struct
    mapping(uint256 => Gig) public gigs;
    
    // Counter for gig IDs
    uint256 private gigCounter;
    
    // Events
    event GigCreated(
        uint256 indexed id,
        string title,
        string description,
        string[] gigTypes,
        uint256 bountyPrize,
        address indexed creator
    );
    
    event GigUpdated(
        uint256 indexed id,
        string title,
        string description,
        string[] gigTypes,
        uint256 bountyPrize
    );
    
    event GigDeactivated(uint256 indexed id);

    // Create a new gig
    function createGig(
        string memory _title,
        string memory _description,
        string[] memory _gigTypes,
        uint256 _bountyPrize
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_gigTypes.length > 0, "At least one gig type is required");
        require(_bountyPrize > 0, "Bounty prize must be greater than 0");

        uint256 gigId = gigCounter++;
        
        gigs[gigId] = Gig({
            id: gigId,
            title: _title,
            description: _description,
            gigTypes: _gigTypes,
            bountyPrize: _bountyPrize,
            creator: msg.sender,
            isActive: true,
            createdAt: block.timestamp
        });

        emit GigCreated(
            gigId,
            _title,
            _description,
            _gigTypes,
            _bountyPrize,
            msg.sender
        );

        return gigId;
    }

    // Update an existing gig
    function updateGig(
        uint256 _gigId,
        string memory _title,
        string memory _description,
        string[] memory _gigTypes,
        uint256 _bountyPrize
    ) external {
        require(_gigId < gigCounter, "Gig does not exist");
        require(gigs[_gigId].creator == msg.sender, "Only creator can update gig");
        require(gigs[_gigId].isActive, "Gig is not active");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_gigTypes.length > 0, "At least one gig type is required");
        require(_bountyPrize > 0, "Bounty prize must be greater than 0");

        Gig storage gig = gigs[_gigId];
        gig.title = _title;
        gig.description = _description;
        gig.gigTypes = _gigTypes;
        gig.bountyPrize = _bountyPrize;

        emit GigUpdated(
            _gigId,
            _title,
            _description,
            _gigTypes,
            _bountyPrize
        );
    }

    // Deactivate a gig
    function deactivateGig(uint256 _gigId) external {
        require(_gigId < gigCounter, "Gig does not exist");
        require(gigs[_gigId].creator == msg.sender, "Only creator can deactivate gig");
        require(gigs[_gigId].isActive, "Gig is already inactive");

        gigs[_gigId].isActive = false;
        emit GigDeactivated(_gigId);
    }

    // Get gig details
    function getGig(uint256 _gigId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        string[] memory gigTypes,
        uint256 bountyPrize,
        address creator,
        bool isActive,
        uint256 createdAt
    ) {
        require(_gigId < gigCounter, "Gig does not exist");
        Gig storage gig = gigs[_gigId];
        return (
            gig.id,
            gig.title,
            gig.description,
            gig.gigTypes,
            gig.bountyPrize,
            gig.creator,
            gig.isActive,
            gig.createdAt
        );
    }

    // Get total number of gigs
    function getGigCount() external view returns (uint256) {
        return gigCounter;
    }
}
