// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RequestContract {
    // This struct defines the PaymentRequest object that contains information about a payment request.
    struct PaymentRequest {
        address requester; // Address of the user who created the payment request.
        address recipient; // Address of the user who will receive the payment.
        uint256 amount; // Amount of tokens requested for payment.
        bool paid; // Boolean flag indicating whether the payment has been verified or not.
    }

    // This mapping stores all the payment requests created by users.
    mapping(bytes32 => PaymentRequest) public paymentRequests;

    // These events are emitted when a new payment request is created, when a payment is verified and when a payment is repaid.
    event PaymentRequested(
        bytes32 requestId,
        address requester,
        address recipient,
        uint256 amount
    );
    event PaymentVerified(bytes32 requestId);
    event PaymentRepaid(bytes32 requestId);

    // This function creates a new payment request.
    function createPaymentRequest(
        bytes32 requestId,
        address recipient,
        uint256 amount
    ) external {
        // Check if the payment request already exists.
        require(
            paymentRequests[requestId].requester == address(0),
            "Request already exists"
        );
        // Check if the amount requested is valid.
        require(amount > 0, "Invalid amount");

        // Create a new PaymentRequest object and store it in the mapping.
        paymentRequests[requestId] = PaymentRequest(
            msg.sender,
            recipient,
            amount,
            false
        );
        // Emit an event to notify users that a new payment request has been created.
        emit PaymentRequested(requestId, msg.sender, recipient, amount);
    }

    // This function verifies a payment request and transfers tokens from the user to the recipient.
    function verifyPayment(bytes32 requestId, address tokenAddress) external {
        // Get the PaymentRequest object from the mapping.
        PaymentRequest storage request = paymentRequests[requestId];
        // Check if the payment request exists.
        require(request.requester != address(0), "Request does not exist");
        // Check if the payment has already been verified.
        require(!request.paid, "Payment already verified");

        // Create an IERC20 object to interact with the ERC20 token.
        IERC20 token = IERC20(tokenAddress);
        // Check if the user has enough balance to make the payment.
        require(
            token.balanceOf(msg.sender) >= request.amount,
            "Insufficient balance"
        );
        // Transfer tokens from the user to the recipient.
        require(
            token.transferFrom(msg.sender, request.recipient, request.amount),
            "Transfer failed"
        );

        // Mark the payment as verified.
        request.paid = true;
        // Emit an event to notify users that the payment has been verified.
        emit PaymentVerified(requestId);
    }

    // This function repays a verified payment to the requester.
    function repayPayment(bytes32 requestId, address tokenAddress) external {
        // Get the PaymentRequest object from the mapping.
        PaymentRequest storage request = paymentRequests[requestId];
        // Check if the payment request exists.
        require(request.requester != address(0), "Request does not exist");
        // Check if the payment has been verified.
        require(request.paid, "Payment not verified");

        // Create an IERC20 object to interact with the ERC20 token.
        IERC20 token = IERC20(tokenAddress);
        // Transfer tokens from the recipient to the requester.
        require(
            token.transferFrom(msg.sender, request.requester, request.amount),
            "Transfer failed"
        );

        // Emit an event to notify users that the payment has been repaid.
        emit PaymentRepaid(requestId);
    }
}
