const hre = require('hardhat')

async function main() {
  const nftMarketPlace = await hre.ethers.deployContract('NFTMarketplace')

  await nftMarketPlace.waitForDeployment()

  console.log(nftMarketPlace)
  console.log(`deployed contract address ${nftMarketPlace.target}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
