// Rutas de los ABI
const tokenAPath = './Abi/TokenA.json';
const tokenBPath = './Abi/TokenB.json';
const simpleDexPath = './Abi/simpleDex.json';

let provider;
let signer;
let tokenAContract;
let tokenBContract;
let simpleDexContract;
let userAddress;

// Cargar los ABI dinámicamente
async function loadABI(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el ABI desde: ${path}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al cargar ABI:', error);
        throw error;
    }
}

// Conectar Wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            userAddress = await signer.getAddress();
            document.getElementById("userAddress").textContent = `Dirección: ${userAddress}`;
            document.getElementById("connectWalletBtn").textContent = "Disconnect Wallet";
            console.log('Wallet conectada:', userAddress);

            await initContracts();
            enableButtons();
        } catch (err) {
            console.error('Error al conectar wallet:', err);
            alert('Error al conectar la wallet. Revisa la consola para más detalles.');
        }
    } else {
        alert('MetaMask no está instalado. Instálalo y recarga la página.');
    }
}

// Función para desconectar la wallet (no hay desconexión real, solo cambiamos el estado del botón)
function disconnectWallet() {
    document.getElementById("connectWalletBtn").textContent = "Connect Wallet";
    console.log("Desconectado de MetaMask");

    // Limpiar la dirección (opcional)
    document.getElementById("userAddress").textContent = "No hay wallet conectada.";
    disableButtons();
}

// Agregar el evento al botón de conectar/desconectar
const walletButton = document.getElementById("connectWalletBtn");
walletButton.addEventListener('click', async () => {
    if (walletButton.innerText === 'Connect Wallet') {
        await connectWallet();
    } else {
        disconnectWallet();
    }
});

// Inicializar contratos
async function initContracts() {
    try {
        // Cargar los ABIs
        const tokenAABI = await loadABI(tokenAPath);
        const tokenBABI = await loadABI(tokenBPath);
        const simpleDexABI = await loadABI(simpleDexPath);

        // Direcciones de contratos
        const tokenAAddress = '0x8853207Ba4e1D7da958C95DFd39F540D6059db1f';
        const tokenBAddress = '0xFF0954673dE78C4766150f3070982Ca12a33CfF2';
        const simpleDexAddress = '0x9E3eb6bF6506F62Ba0355F84D477C8D0A59581E5';

        // Inicializar contratos con ethers.js
        tokenAContract = new ethers.Contract(tokenAAddress, tokenAABI, signer);
        tokenBContract = new ethers.Contract(tokenBAddress, tokenBABI, signer);
        simpleDexContract = new ethers.Contract(simpleDexAddress, simpleDexABI, signer);

        console.log('Contratos inicializados correctamente.');
    } catch (error) {
        console.error('Error al inicializar contratos:', error);
        alert('No se pudieron inicializar los contratos. Revisa la consola.');
    }
}

// Habilitar botones cuando la wallet está conectada
function enableButtons() {
    document.getElementById("addLiquidityBtn").disabled = false;
    document.getElementById("approveTokenABtn").disabled = false;
    document.getElementById("approveTokenBBtn").disabled = false;
    document.getElementById("approveMintABtn").disabled = false;
    document.getElementById("approveMintBBtn").disabled = false;
    document.getElementById("approveSwapBtn").disabled = false;
    document.getElementById("approveRemoveBtn").disabled = false;
    document.getElementById("mintTokensBtn").disabled = false;
    document.getElementById("removeLiquidityBtn").disabled = false;
    document.getElementById("swapTokensBtn").disabled = false;
}

// Deshabilitar botones cuando la wallet está desconectada
function disableButtons() {
    document.getElementById("addLiquidityBtn").disabled = true;
    document.getElementById("approveTokenABtn").disabled = true;
    document.getElementById("approveTokenBBtn").disabled = true;
    document.getElementById("approveMintABtn").disabled = true;
    document.getElementById("approveMintBBtn").disabled = true;
    document.getElementById("approveSwapBtn").disabled = true;
    document.getElementById("approveRemoveBtn").disabled = true;
    document.getElementById("mintTokensBtn").disabled = true;
    document.getElementById("removeLiquidityBtn").disabled = true;
    document.getElementById("swapTokensBtn").disabled = true;
}

// Función genérica para aprobar tokens
async function approveTokens(contract, amount) {
    try {
        const tx = await contract.approve(simpleDexContract.address, amount);
        await tx.wait();
        console.log(`Approved ${amount} tokens.`);
    } catch (error) {
        console.error('Error al aprobar tokens:', error);
        throw error;
    }
}

// Event listeners para aprobaciones manuales
document.getElementById("approveTokenABtn").addEventListener("click", async () => {
    const amountA = document.getElementById("amountA").value;
    await approveTokens(tokenAContract, amountA);
});

document.getElementById("approveTokenBBtn").addEventListener("click", async () => {
    const amountB = document.getElementById("amountB").value;
    await approveTokens(tokenBContract, amountB);
});

document.getElementById("approveMintABtn").addEventListener("click", async () => {
    const mintAmountA = document.getElementById("mintAmountA").value;
    await approveTokens(tokenAContract, mintAmountA);
});

document.getElementById("approveMintBBtn").addEventListener("click", async () => {
    const mintAmountB = document.getElementById("mintAmountB").value;
    await approveTokens(tokenBContract, mintAmountB);
});

document.getElementById("approveSwapBtn").addEventListener("click", async () => {
    const swapAmount = document.getElementById("swapAmount").value;
    const swapDirection = document.getElementById("swapDirection").value;
    const contract = swapDirection === 'AtoB' ? tokenAContract : tokenBContract;
    await approveTokens(contract, swapAmount);
});

document.getElementById("approveRemoveBtn").addEventListener("click", async () => {
    const amountA = document.getElementById("removeLiquidityA").value;
    const amountB = document.getElementById("removeLiquidityB").value;
    await approveTokens(tokenAContract, amountA);
    await approveTokens(tokenBContract, amountB);
});

// Función para añadir liquidez
async function addLiquidity() {
    const amountA = document.getElementById("amountA").value;
    const amountB = document.getElementById("amountB").value;

    try {
        const tx = await simpleDexContract.addLiquidity(amountA, amountB);
        await tx.wait();
        console.log("Liquidity added successfully!");
    } catch (error) {
        console.error("Error adding liquidity:", error);
    }
}

// Función para mintear tokens
async function mintTokens() {
    const mintAmountA = document.getElementById("mintAmountA").value;
    const mintAmountB = document.getElementById("mintAmountB").value;

    try {
        const txA = await simpleDexContract.mintTokenA(mintAmountA);
        const txB = await simpleDexContract.mintTokenB(mintAmountB);

        await txA.wait();
        await txB.wait();
        console.log("Tokens minted successfully!");
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

// Función para intercambiar tokens
async function swapTokens() {
    const swapAmount = document.getElementById("swapAmount").value;
    const swapDirection = document.getElementById("swapDirection").value;

    try {
        if (swapDirection === 'AtoB') {
            const tx = await simpleDexContract.swapAToB(swapAmount);
            await tx.wait();
        } else {
            const tx = await simpleDexContract.swapBToA(swapAmount);
            await tx.wait();
        }
        console.log("Tokens swapped successfully!");
    } catch (error) {
        console.error("Error swapping tokens:", error);
    }
}

// Función para eliminar liquidez
async function removeLiquidity() {
    const amountA = document.getElementById("removeLiquidityA").value;
    const amountB = document.getElementById("removeLiquidityB").value;

    try {
        const tx = await simpleDexContract.removeLiquidity(amountA, amountB);
        await tx.wait();
        console.log("Liquidity removed successfully!");
    } catch (error) {
        console.error("Error removing liquidity:", error);
    }
}
