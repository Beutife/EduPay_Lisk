import PaymentService from './PaymentService';
import OwnershipService from './OwnershipService';

class ContractServiceFactory {
  constructor(signer) {
    this.signer = signer;
  }

  get payment() {
    if (!this._paymentService) {
      this._paymentService = new PaymentService(this.signer);
    }
    return this._paymentService;
  }

  get ownership() {
    if (!this._ownershipService) {
      this._ownershipService = new OwnershipService(this.signer);
    }
    return this._ownershipService;
  }

  // Add getters for other services as needed
}

export default ContractServiceFactory;
