const { expect } = require("chai");

describe("Request", function () {
  let request;
  let token;

  beforeEach(async function () {
    const Request = await ethers.getContractFactory("Request");
    request = await Request.deploy();
    await request.deployed();

    const Token = await ethers.getContractFactory("MKT");
    token = await Token.deploy();
    await token.deployed();
  });

  it("should create a new payment request", async function () {
    const requestId = "0x7a1708F329a817D0D43c2D7C0c7Ef92d7AF8019e";
    const recipient = "0x65A3c402643edA3963155f0b1BF6075181A9041D";
    const amount = 100;

    await request.createPaymentRequest(requestId, recipient, amount);

    const paymentRequest = await request.paymentRequests(requestId);
    expect(paymentRequest.requester).to.equal(await ethers.provider.getSigner(0).getAddress());
    expect(paymentRequest.recipient).to.equal(recipient);
    expect(paymentRequest.amount).to.equal(amount);
    expect(paymentRequest.paid).to.equal(false);
  });

  it("should verify a payment request and transfer tokens", async function () {
    const requestId = "0x7a1708F329a817D0D43c2D7C0c7Ef92d7AF8019e";
    const recipient = "0x65A3c402643edA3963155f0b1BF6075181A9041D";
    const amount = 100;

    await token.transfer(await ethers.provider.getSigner(0).getAddress(), amount);
    await token.approve(request.address, amount);

    await request.createPaymentRequest(requestId, recipient, amount);
    await request.verifyPayment(requestId, token.address);

    const paymentRequest = await request.paymentRequests(requestId);
    expect(paymentRequest.paid).to.equal(true);

    const balance = await token.balanceOf(recipient);
    expect(balance).to.equal(amount);
  });

  it("should repay a verified payment to the requester", async function () {
    const requestId = "0x7a1708F329a817D0D43c2D7C0c7Ef92d7AF8019e";
    const recipient = "0x65A3c402643edA3963155f0b1BF6075181A9041D";
    const amount = 100;

    await token.transfer(await ethers.provider.getSigner(0).getAddress(), amount);
    await token.approve(request.address, amount);

    await request.createPaymentRequest(requestId, recipient, amount);
    await request.verifyPayment(requestId, token.address);
    await request.repayPayment(requestId, token.address);

    const paymentRequest = await request.paymentRequests(requestId);
    expect(paymentRequest.paid).to.equal(true);

    const balance = await token.balanceOf(await ethers.provider.getSigner(0).getAddress());
    expect(balance).to.equal(amount);
  });
});
