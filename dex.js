// ABI de los contratos (simplificado para este ejemplo)
const simpleDEXABI = [{"inputs":[{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"},{"indexed":false,"internalType":"string","name":"direction","type":"string"}],"name":"TokensSwapped","type":"event"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountAIn","type":"uint256"}],"name":"swapAforB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountBIn","type":"uint256"}],"name":"swapBforA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenA","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
// ABI de los contratos (simplificado para este ejemplo)
const tokenAABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const tokenBABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const simpleDEXAddress = "0x59B3Dbffe9F27D960dDe0E6a28344D3ae91CfFA8";  // Dirección del contrato SimpleDEX
const tokenAAddress = "0xE41179D9D5e67174DCE718D72e6A7f57dE18204F";  // Dirección del contrato TokenA
const tokenBAddress = "0xbF57c7F8D52839E1Ad2CCE460B03372170807E7D";  // Dirección del contrato TokenB
const walletButton = document.getElementById("connectWalletBtn");

let provider, signer, simpleDEXContract, tokenAContract, tokenBContract, userAddress;

// Función para conectar la wallet (MetaMask)
async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Solicitar acceso a la cuenta MetaMask
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []); // Solicitar la cuenta
            signer = provider.getSigner();
            userAddress = await signer.getAddress(); // Obtener la dirección de la wallet

            // Inicializar contratos
            simpleDEXContract = new ethers.Contract(simpleDEXAddress, simpleDEXABI, signer);
            tokenAContract = new ethers.Contract(tokenAAddress, tokenABI, signer);
            tokenBContract = new ethers.Contract(tokenBAddress, tokenABI, signer);

            // Cambiar el texto del botón y mostrar la dirección
            walletButton.textContent = "Disconnect Wallet";
            console.log("Conectado a MetaMask. Dirección: ", userAddress);

            // Aquí podrías mostrar la dirección en alguna parte de la UI, si lo deseas
            document.getElementById("userAddress").textContent = `Dirección: ${userAddress}`;

        } catch (error) {
            console.error("Error al conectar con MetaMask:", error);
            alert("Hubo un problema al conectar con MetaMask. Asegúrate de que MetaMask esté instalado.");
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo.");
    }
}

// Función para desconectar la wallet (no hay desconexión real, solo cambiamos el estado del botón)
function disconnectWallet() {
    walletButton.textContent = "Connect Wallet"; // Volver a mostrar el texto de conectar
    console.log("Desconectado de MetaMask");

    // Limpiar la dirección (opcional)
    document.getElementById("userAddress").textContent = "No hay wallet conectada.";
}

// Agregar el evento al botón de conectar/desconectar
walletButton.addEventListener('click', async () => {
    if (walletButton.innerText === 'Connect Wallet') {
        await connectWallet();
    } else {
        disconnectWallet();
    }
});

// Función para añadir liquidez (solo Owner)
async function addLiquidity() {
    const amountA = document.getElementById("amountA").value;
    const amountB = document.getElementById("amountB").value;

    try {
        const tx = await simpleDEXContract.addLiquidity(amountA, amountB);
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
        const approveTxA = await tokenAContract.approve(simpleDEXAddress, mintAmountA);
        await approveTxA.wait();

        const approveTxB = await tokenBContract.approve(simpleDEXAddress, mintAmountB);
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
        const txA = await simpleDEXContract.mintTokenA(mintAmountA);
        const txB = await simpleDEXContract.mintTokenB(mintAmountB);

        await txA.wait();
        await txB.wait();

        console.log("Tokens minted successfully!");
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

// Función para eliminar liquidez (solo Owner)
async function removeLiquidity() {
    const removeAmountA = document.getElementById("removeLiquidityA").value;
    const removeAmountB = document.getElementById("removeLiquidityB").value;

    try {
        const tx = await simpleDEXContract.removeLiquidity(removeAmountA, removeAmountB);
        await tx.wait();
        console.log("Liquidity removed successfully!");
    } catch (error) {
        console.error("Error removing liquidity:", error);
    }
}

// Función para hacer swap entre tokens (A a B o B a A)
async function swapTokens() {
    const swapAmount = document.getElementById("swapAmount").value;
    const swapDirection = document.getElementById("swapDirection").value;

    try {
        if (swapDirection === "AtoB") {
            const allowanceA = await tokenAContract.allowance(userAddress, simpleDEXAddress);
            if (allowanceA < swapAmount) {
                const approvalTx = await tokenAContract.approve(simpleDEXAddress, swapAmount);
                await approvalTx.wait();
            }
            const tx = await simpleDEXContract.swapAforB(swapAmount);
            await tx.wait();
            console.log("Swap A to B successful!");
        } else if (swapDirection === "BtoA") {
            const allowanceB = await tokenBContract.allowance(userAddress, simpleDEXAddress);
            if (allowanceB < swapAmount) {
                const approvalTx = await tokenBContract.approve(simpleDEXAddress, swapAmount);
                await approvalTx.wait();
            }
            const tx = await simpleDEXContract.swapBforA(swapAmount);
            await tx.wait();
            console.log("Swap B to A successful!");
        }
    } catch (error) {
        console.error("Error swapping tokens:", error);
    }
}

// Inicializar la conexión al cargar la página
window.onload = () => {
    const connectWalletBtn = document.getElementById("connectWalletBtn");
    connectWalletBtn.addEventListener("click", connectWallet);
};