// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    const LegalProvenance = await ethers.getContractFactory("LegalProvenance");
    const legalProvenance = await LegalProvenance.deploy();
    await legalProvenance.deployed();

    console.log("LegalProvenance deployed to:", legalProvenance.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
