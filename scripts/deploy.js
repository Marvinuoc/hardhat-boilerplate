import { ethers } from 'ethers';
import LegalProvenance from '../artifacts/contracts/LegalProvenance.sol/LegalProvenance.json';

const contractAddress = '0x1234567890abcdef1234567890abcdef12345678'; 

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, LegalProvenance.abi, signer);

export async function registerDocument(hash) {
    const transaction = await contract.registerDocument(hash);
    await transaction.wait();
}

export async function verifyDocument(id) {
    const transaction = await contract.verifyDocument(id);
    await transaction.wait();
}

export async function transferOwnership(id, newOwner) {
    const transaction = await contract.transferOwnership(id, newOwner);
    await transaction.wait();
}

export async function getDocument(id) {
    return await contract.documents(id);
}
