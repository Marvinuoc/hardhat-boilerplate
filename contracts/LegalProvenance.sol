// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegalProvenance {
    struct Document {
        uint id;
        string hash;
        address owner;
        bool isVerified;
        uint timestamp;
    }

    uint public documentCount;
    mapping(uint => Document) public documents;
    mapping(string => uint) private hashToId;

    event DocumentRegistered(uint id, string hash, address owner);
    event DocumentVerified(uint id, address verifier);
    event OwnershipTransferred(uint id, address oldOwner, address newOwner);

    function registerDocument(string memory _hash) public {
        require(hashToId[_hash] == 0, "Document already registered");
        documentCount++;
        documents[documentCount] = Document(documentCount, _hash, msg.sender, false, block.timestamp);
        hashToId[_hash] = documentCount;
        emit DocumentRegistered(documentCount, _hash, msg.sender);
    }

    function verifyDocument(uint _id) public {
        Document storage doc = documents[_id];
        require(doc.id != 0, "Document not found");
        doc.isVerified = true;
        emit DocumentVerified(_id, msg.sender);
    }

    function transferOwnership(uint _id, address _newOwner) public {
        Document storage doc = documents[_id];
        require(doc.id != 0, "Document not found");
        require(doc.owner == msg.sender, "Only owner can transfer ownership");
        address oldOwner = doc.owner;
        doc.owner = _newOwner;
        emit OwnershipTransferred(_id, oldOwner, _newOwner);
    }
}
