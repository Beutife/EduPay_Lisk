// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduPay is Ownable {
    // USDC token (mock for testnet)
    IERC20 public usdc;
    
    // Struct to store payment details
    struct Payment {
        address payer; // Parent or donor
        address recipient; // School or student
        uint256 amount; // In USDC (6 decimals)
        bool confirmed; // School confirms enrollment
        bool isScholarship; // True for scholarships
    }
    
    // Mapping to store payments
    mapping(uint256 => Payment) public payments;
    uint256 public paymentCount;
    
    // Events for transparency
    event PaymentRequested(uint256 paymentId, address payer, address recipient, uint256 amount, bool isScholarship);
    event PaymentConfirmed(uint256 paymentId, address school);
    
    constructor(address _usdc) Ownable(msg.sender) {
        usdc = IERC20(_usdc); // Set USDC contract address
    }
    
    // Parent or donor requests a payment
    function requestPayment(address _recipient, uint256 _amount, bool _isScholarship) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(usdc.allowance(msg.sender, address(this)) >= _amount, "Approve USDC first");
        
        // Transfer USDC to contract
        usdc.transferFrom(msg.sender, address(this), _amount);
        
        // Store payment
        payments[paymentCount] = Payment(msg.sender, _recipient, _amount, false, _isScholarship);
        emit PaymentRequested(paymentCount, msg.sender, _recipient, _amount, _isScholarship);
        paymentCount++;
    }
    
    // School confirms enrollment, releasing funds
    function confirmPayment(uint256 _paymentId) external {
        Payment storage payment = payments[_paymentId];
        require(payment.recipient == msg.sender, "Only recipient can confirm");
        require(!payment.confirmed, "Payment already confirmed");
        
        payment.confirmed = true;
        usdc.transfer(payment.recipient, payment.amount);
        emit PaymentConfirmed(_paymentId, msg.sender);
    }
}