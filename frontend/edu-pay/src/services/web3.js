import { ethers } from 'ethers';
import ContractServiceFactory from './contract';

let web3Provider = null;
let signer = null;
let contractService = null;

export const initWeb3 = async () => {
  try {
    // Check if Web3 is injected (MetaMask, etc.)
    if (window.ethereum) {
      web3Provider = new ethers.BrowserProvider(window.ethereum);
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      signer = await web3Provider.getSigner();
      contractService = new ContractServiceFactory(signer);
      return { success: true };
    } else {
      throw new Error('Please install MetaMask or another Web3 provider');
    }
  } catch (error) {
    console.error('Error initializing Web3:', error);
    return { success: false, error: error.message };
  }
};

export const getContractService = () => {
  if (!contractService) {
    throw new Error('Web3 not initialized. Call initWeb3() first.');
  }
  return contractService;
};

export const getSigner = () => {
  if (!signer) {
    throw new Error('Web3 not initialized. Call initWeb3() first.');
  }
  return signer;
};

export const getCurrentAccount = async () => {
  if (!signer) {
    throw new Error('Web3 not initialized. Call initWeb3() first.');
  }
  return await signer.getAddress();
};
