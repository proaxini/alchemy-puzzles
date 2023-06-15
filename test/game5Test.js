const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();


    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck

    let valid;
    let threshold = ethers.BigNumber.from("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf")
    let wallet;
    let address;

    while(!valid) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider)
      address = await wallet.getAddress()

      let walletNum = ethers.BigNumber.from(address);

      if(walletNum.lt(threshold)) {
        valid = true;
      }
    }


    const signer = ethers.provider.getSigner(0);

    signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("0.1")
    })


    await game.connect(wallet).win();
    
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
