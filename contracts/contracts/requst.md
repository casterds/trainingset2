# Description

RequestContract that allows users to create payment requests, verify payments, and handle repayment events. The PaymentRequest struct stores the details of each payment request, including the requester, recipient, amount, and payment status.

The createPaymentRequest function allows users to create a new payment request by providing a unique requestId, the recipient's address, and the payment amount. This function emits a PaymentRequested event to notify listeners about the new request.

The verifyPayment function is used to verify and process a payment for a specific request. It checks that the request exists, has not been paid yet, and the sender has enough balance of the specified ERC20 token. If the conditions are met, the function transfers the payment amount from the sender to the recipient and updates the payment status to paid. It emits a PaymentVerified event upon successful verification.

The repayPayment function is used to handle repayment of a verified payment. It checks that the request exists and has been paid. If the conditions are met, the function transfers the payment amount from the caller to the original requester. It emits a PaymentRepaid event upon successful repayment.
