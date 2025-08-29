import BaseContractService from './BaseContractService';

class PaymentService extends BaseContractService {
  // Request a new payment
  async requestPayment(recipient, amount, isScholarship = false) {
    return this.handleTransaction(
      this.contract.requestPayment(recipient, amount, isScholarship)
    );
  }

  // Confirm a payment
  async confirmPayment(paymentId) {
    return this.handleTransaction(
      this.contract.confirmPayment(paymentId)
    );
  }

  // Get payment details by ID
  async getPayment(paymentId) {
    try {
      const payment = await this.contract.payments(paymentId);
      return {
        payer: payment.payer,
        recipient: payment.recipient,
        amount: payment.amount.toString(),
        confirmed: payment.confirmed,
        isScholarship: payment.isScholarship
      };
    } catch (error) {
      console.error('Error fetching payment:', error);
      return null;
    }
  }

  // Get total number of payments
  async getPaymentCount() {
    try {
      const count = await this.contract.paymentCount();
      return count.toString();
    } catch (error) {
      console.error('Error fetching payment count:', error);
      return '0';
    }
  }
}

export default PaymentService;
