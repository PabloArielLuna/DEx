// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleDEX
 * @author Pablo Luna
 * @notice A decentralized exchange (DEX) for swapping two ERC20 tokens.
 * @dev This contract uses a constant product formula for token swaps and manages liquidity pools.
 */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev A decentralized exchange for swapping two ERC20 tokens, adding liquidity, and removing liquidity.
 */
contract SimpleDEX {
    /// @notice The first token supported by the DEX.
    IERC20 public tokenA;

    /// @notice The second token supported by the DEX.
    IERC20 public tokenB;

    /// @notice The address of the contract owner.
    address public owner;

    /// @notice Reserve amount of token A in the pool.
    uint256 public reserveA;

    /// @notice Reserve amount of token B in the pool.
    uint256 public reserveB;

    /**
     * @dev Emitted when liquidity is added to the pool.
     * @param amountA The amount of token A added.
     * @param amountB The amount of token B added.
     */
    event LiquidityAdded(uint256 amountA, uint256 amountB);

    /**
     * @dev Emitted when liquidity is removed from the pool.
     * @param amountA The amount of token A removed.
     * @param amountB The amount of token B removed.
     */
    event LiquidityRemoved(uint256 amountA, uint256 amountB);

    /**
     * @dev Emitted when a token swap occurs.
     * @param user The address of the user performing the swap.
     * @param amountIn The amount of input tokens swapped.
     * @param amountOut The amount of output tokens received.
     */
    event TokenSwapped(
        address indexed user,
        uint256 amountIn,
        uint256 amountOut
    );

    /**
     * @notice Initializes the DEX with the addresses of two ERC20 tokens.
     * @param _tokenA The address of token A.
     * @param _tokenB The address of token B.
     */
    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        owner = msg.sender;
    }

    /**
     * @dev Modifier to restrict access to only the owner of the contract.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    /**
     * @notice Adds liquidity to the pool.
     * @dev The provided amounts must maintain the reserve ratio if reserves exist.
     * @param amountA The amount of token A to add.
     * @param amountB The amount of token B to add.
     * @custom:requires Both amounts must be greater than zero.
     */
    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA > 0 && amountB > 0, "Amounts must be > 0");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);

        emit LiquidityAdded(amountA, amountB);
    }

    /**
     * @notice Swaps token A for token B.
     * @param amountAIn The amount of token A to swap.
     * @custom:returns The amount of token B received.
     */
    function swapAforB(uint256 amountAIn) external {
        require(amountAIn > 0, "Amount must be > 0");

        uint256 amountBOut = getAmountOut(
            amountAIn,
            tokenA.balanceOf(address(this)),
            tokenB.balanceOf(address(this))
        );

        tokenA.transferFrom(msg.sender, address(this), amountAIn);
        tokenB.transfer(msg.sender, amountBOut);

        emit TokenSwapped(msg.sender, amountAIn, amountBOut);
    }

    /**
     * @notice Swaps token B for token A.
     * @param amountBIn The amount of token B to swap.
     * @custom:returns The amount of token A received.
     */
    function swapBforA(uint256 amountBIn) external {
        require(amountBIn > 0, "Amount must be > 0");

        uint256 amountAOut = getAmountOut(
            amountBIn,
            tokenB.balanceOf(address(this)),
            tokenA.balanceOf(address(this))
        );

        tokenB.transferFrom(msg.sender, address(this), amountBIn);
        tokenA.transfer(msg.sender, amountAOut);

        emit TokenSwapped(msg.sender, amountBIn, amountAOut);
    }

    /**
     * @notice Removes liquidity from the pool.
     * @param amountA The amount of token A to withdraw.
     * @param amountB The amount of token B to withdraw.
     * @custom:requires The pool must have sufficient reserves.
     */
    function removeLiquidity(
        uint256 amountA,
        uint256 amountB
    ) external onlyOwner {
        require(
            amountA <= tokenA.balanceOf(address(this)) &&
                amountB <= tokenB.balanceOf(address(this)),
            "Low liquidity"
        );

        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);

        emit LiquidityRemoved(amountA, amountB);
    }

    /**
     * @notice Gets the price of one token in terms of the other based on reserves.
     * @param _token The token address to query the price for.
     * @return The price of the token in terms of the other token, scaled by 1e18.
     * @custom:requires The token must be either tokenA or tokenB.
     */
    function getPrice(address _token) external view returns (uint256) {
        require(
            _token == address(tokenA) || _token == address(tokenB),
            "Invalid token"
        );

        return
            _token == address(tokenA)
                ? (tokenB.balanceOf(address(this)) * 1e18) /
                    tokenA.balanceOf(address(this))
                : (tokenA.balanceOf(address(this)) * 1e18) /
                    tokenB.balanceOf(address(this));
    }

    /// @notice Calculates the output amount of a swap
    /// @dev Implements constant product formula
    /// @param amountIn The input token amount
    /// @param reserveIn The reserve of the input token
    /// @param reserveOut The reserve of the output token
    /// @return The amount of output tokens
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) private pure returns (uint256) {
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}
