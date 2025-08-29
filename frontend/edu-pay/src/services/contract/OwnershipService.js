import BaseContractService from './BaseContractService';

class OwnershipService extends BaseContractService {
  // Get current owner of the contract
  async getOwner() {
    try {
      return await this.contract.owner();
    } catch (error) {
      console.error('Error fetching contract owner:', error);
      return null;
    }
  }

  // Transfer ownership to a new address
  async transferOwnership(newOwner) {
    return this.handleTransaction(
      this.contract.transferOwnership(newOwner)
    );
  }

  // Renounce ownership (only callable by current owner)
  async renounceOwnership() {
    return this.handleTransaction(
      this.contract.renounceOwnership()
    );
  }
}

export default OwnershipService;
