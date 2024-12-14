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
        const tokenAAddress = '0xE41179D9D5e67174DCE718D72e6A7f57dE18204F';
        const tokenBAddress = '0xbF57c7F8D52839E1Ad2CCE460B03372170807E7D';
        const simpleDexAddress = '0x59B3Dbffe9F27D960dDe0E6a28344D3ae91CfFA8';

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
    document.getElementById("approveMintBtn").disabled = false;
    document.getElementById("mintTokensBtn").disabled = false;
    document.getElementById("removeLiquidityBtn").disabled = false;
    document.getElementById("swapTokensBtn").disabled = false;
}

// Deshabilitar botones cuando la wallet está desconectada
function disableButtons() {
    document.getElementById("addLiquidityBtn").disabled = true;
    document.getElementById("approveMintBtn").disabled = true;
    document.getElementById("mintTokensBtn").disabled = true;
    document.getElementById("removeLiquidityBtn").disabled = true;
    document.getElementById("swapTokensBtn").disabled = true;
}

// Función para añadir liquidez (solo Owner)
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

// Función para aprobar el minting (solo Owner puede aprobar)
async function approveMint() {
    const mintAmountA = document.getElementById("mintAmountA").value;
    const mintAmountB = document.getElementById("mintAmountB").value;

    try {
        const approveTxA = await tokenAContract.approve(simpleDexContract.address, mintAmountA);
        await approveTxA.wait();

        const approveTxB = await tokenBContract.approve(simpleDexContract.address, mintAmountB);
        await approveTxB.wait();

        console.log("Minting approved!");
    } catch (error) {
        console.error("Error approving mint:", error);
    }
}

// Función para mintear tokens (solo Owner puede mint)
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


