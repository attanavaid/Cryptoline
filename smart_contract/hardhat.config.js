require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/_1n34JNVWQ60Q3AW4L1_2xy4Uwg1_ndA",
      accounts: [ "0fb606ecc9002772f26d41a83798be9d12086391cc15733f046e21a819bb1ddb" ]
    }
  }
};