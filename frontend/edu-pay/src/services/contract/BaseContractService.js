import { ethers } from 'ethers';
import ABI from '../../utils/ABI.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

class BaseContractService {
  constructor(signer) {
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );
  }

  // Helper method to handle transaction errors
  async handleTransaction(txPromise) {
    try {
      const tx = await txPromise;
      const receipt = await tx.wait();
      return { success: true, receipt };
    } catch (error) {
      console.error('Transaction failed:', error);
      return { 
        success: false, 
        error: error.message || 'Transaction failed' 
      };
    }
  }
}

export default BaseContractService;
