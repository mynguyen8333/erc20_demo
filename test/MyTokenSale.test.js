const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

const KycContract = artifacts.require("KycContract");

contract("TokenSale", async function(accounts) {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    // it("there shouldnt be any coins in my account", async () => {
    //     let instance = await Token.deployed();
    //     return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    //     });

    // //other code in test

    // it("all tokens should be in the TokenSale Smarth Contract", async()=>{
    //     let instance = await Token.deployed();
    //     let balanece = await instance.balanceOf.call(TokenSale.address);
    //     let totalSupply = await instance.totalSupply.call();
    //     return expect(balanece).to.be.a.bignumber.equal(totalSupply);
    // });

    // it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
    //     let tokenInstance = await Token.deployed();
    //     let tokenSaleInstance = await TokenSale.deployed();
    //     let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);

    //     await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
    //     return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    // });

    // it("should be possible to buy tokens", async () =>{
    //     let tokenInstance = await Token.deployed();
    //     let tokenSaleInstance = await Token.deployed();
    //     let balanceBefore = await tokenInstance.balanceOf(initialHolder);
    //     expect(tokenSaleInstance.sendTransaction({from: initialHolder, value:web3.utils.toWei("1","wei")})).to.be.fulfilled;
    //     return expect(tokenInstance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(0)));
    // })

    //Test after add KycContract
    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        await expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKycCompleted(recipient);
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    
    });

});
