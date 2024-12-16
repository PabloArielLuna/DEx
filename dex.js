// Global variables
let provider;
let signer;
let simpleDex;
let tokenA;
let tokenB;
let selectedToken;

// Contract addresses
const tokenAAddress = '0xA521fC2826673ac550e1266F788d294B904447d2';
const tokenBAddress = '0xB70A4Dc89943820dF6373776064CC5B73e367de1';
const simpleDexAddress = '0x9c8B04dd1CE6d108E8e011164f50aA432fc515F6';

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Load ABIs from external files
async function loadABI(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Error loading ABI from ${path}`);
    return await response.json();
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Initialize provider and contracts
async function initializeProvider() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        await ethereum.request({ method: 'eth_requestAccounts' });

        const [simpleDexABI, tokenAABI, tokenBABI] = await Promise.all([
            loadABI('./Abi/simpleDex.json'),
            loadABI('./Abi/TokenA.json'),
            loadABI('./Abi/TokenB.json')
        ]);

        // Instantiate the contracts
        simpleDex = new ethers.Contract(simpleDexAddress, simpleDexABI, signer);
        tokenA = new ethers.Contract(tokenAAddress, tokenAABI, signer);
        tokenB = new ethers.Contract(tokenBAddress, tokenBABI, signer);

        // Update the user interface
        updateWalletInfo();
    } else {
        alert('Install Metamask');
    }
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Update gas information
async function updateGasInfo() {
    try {
        
        document.getElementById('gas-amount').textContent = `${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`;
    } catch (error) {
        console.error("Error getting gas price:", error);
        document.getElementById('gas-amount').textContent = "Not available";
    }
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Update connected wallet information
async function updateWalletInfo() {
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const network = await provider.getNetwork();
    const gasPrice = await provider.getGasPrice();

    // Update the data on the interface
    document.getElementById('wallet-address').textContent = address;
    document.getElementById('eth-balance').textContent = ethers.utils.formatEther(balance);
    document.getElementById('network-name').textContent = network.name;
    document.getElementById('gas-amount').textContent = `${ethers.utils.formatUnits(gasPrice, "gwei")} Gwei`;

    // Display the functions section
    document.getElementById('wallet-info').classList.remove('hidden');
    document.getElementById('btn-connect').classList.add('hidden');
    document.getElementById('btn-disconnect').classList.remove('hidden');
}

// Function to connect the wallet
document.getElementById('btn-connect').addEventListener('click', () => {
    initializeProvider();
});

// Function to disconnect the wallet
document.getElementById('btn-disconnect').addEventListener('click', () => {
    location.reload(); // Recargar la página para "desconectar"
});

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Function to add liquidity
async function addLiquidity() {
    const tokenAAmount = document.getElementById('addLiquidityTokenA').value;
    const tokenBAmount = document.getElementById('addLiquidityTokenB').value;

    if (tokenAAmount <= 0 || tokenBAmount <= 0) {
        alert('Por favor ingresa cantidades válidas');
        return;
    }

    try {
        // Approve tokens before adding liquidity
        await tokenA.approve(simpleDexAddress, ethers.utils.parseUnits(tokenAAmount, 18));
        await tokenB.approve(simpleDexAddress, ethers.utils.parseUnits(tokenBAmount, 18));

        // Call the function to add liquidity
        const tx = await simpleDex.addLiquidity(
            ethers.utils.parseUnits(tokenAAmount, 18),
            ethers.utils.parseUnits(tokenBAmount, 18)
        );
        await tx.wait();
        alert1('Liquidity added successfully');
    } catch (error) {
        console.error('Error adding liquidity: ');
        alert('Error adding liquidity');
    }
}

document.getElementById('btn-addLiquidity').addEventListener('click', addLiquidity);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Function to remove liquidity
async function removeLiquidity() {
    const tokenAAmount = document.getElementById('removeLiquidityTokenA').value;
    const tokenBAmount = document.getElementById('removeLiquidityTokenB').value;

    if (tokenAAmount <= 0 || tokenBAmount <= 0) {
        alert('Please enter valid amounts');
        return;
    }

    try {
        // Call the function to remove liquidity
        const tx = await simpleDex.removeLiquidity(
            ethers.utils.parseUnits(tokenAAmount, 18),
            ethers.utils.parseUnits(tokenBAmount, 18)
        );
        await tx.wait();
        alert('Liquidity removed successfully');
    } catch (error) {
        console.error('Error removing liquidity: ', error);
        alert('Error removing liquidity');
    }
}

document.getElementById('btn-removeLiquidity').addEventListener('click', removeLiquidity);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Function to swap tokens
async function swapTokens() {
    const tokenToSwap = document.getElementById('tokenToSwap').value;
    const swapAmount = document.getElementById('swapAmount').value;

    if (swapAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const amountIn = ethers.utils.parseUnits(swapAmount, 18);

    try {
        let tx;
        if (tokenToSwap === 'tokenA') {
            // Approve Token A for the swap
            await tokenA.approve(simpleDexAddress, amountIn);
            tx = await simpleDex.swapTokenAForTokenB(amountIn);
        } else {
            // Approve Token B for the swap
            await tokenB.approve(simpleDexAddress, amountIn);
            tx = await simpleDex.swapTokenBForTokenA(amountIn);
        }
        await tx.wait();
        alert('Swap successful');
    } catch (error) {
        console.error('Error swapping tokens: ', error);
        alert('Error swapping tokens');
    }
}

document.getElementById('btn-swap').addEventListener('click', swapTokens);

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Function to get the token price
async function getTokenPrice() {
    const tokenToGetPrice = document.getElementById('tokenPrice').value; // Obtener el valor seleccionado
    let tokenAddress;

    // Determine the selected token address
    if (tokenToGetPrice === 'tokenA') {
        tokenAddress = tokenAAddress;
    } else if (tokenToGetPrice === 'tokenB') {
        tokenAddress = tokenBAddress;
    } else {
        alert('Token no válido');
        return;
    }

    try {
        // Call the 'getPrice' function passing the token address
        const price = await simpleDex.getPrice(tokenAddress);

        // Verify if the price is valid before displaying it
        if (price && price.gt(0)) {
            // Display the price on the interface, proper format
            document.getElementById('priceResult').textContent = `Price: ${ethers.utils.formatUnits(price, 18)} ETH`;
        } else {
            document.getElementById('priceResult').textContent = "Price not available";
        }
    } catch (error) {
        console.error('Error getting price: ', error);
        alert('Error getting price');
    }
}

document.getElementById('btn-getPrice').addEventListener('click', getTokenPrice);