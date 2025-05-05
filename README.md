# Soroban Token Contract

This project is a standard token contract developed on the Soroban platform. Soroban is a smart contract platform that runs on the Stellar blockchain.

## Project Overview

Soroban Token Contract is a comprehensive smart contract offering basic token functionalities. With this contract, you can perform standard token operations such as creating, transferring, burning tokens, and authorizing third-party spending.

## Features

- **Token Management**: Mint, burn, and transfer operations
- **Authorization**: Allowance mechanism for third-party spending
- **Admin Control**: Setting admin and operations requiring administrator permission
- **Metadata**: Token name, symbol, and decimal information

## Contract Structure

The project consists of the following modules:

- **admin**: Administrator functions and authorization
- **allowance**: Token spending permission management
- **balance**: Balance management operations
- **contract**: Main contract implementation and token interface
- **metadata**: Token metadata (name, symbol, decimals)
- **storage_types**: Storage data structures

## Technical Details

The contract is written in Rust programming language and compiled without standard library dependencies using the `#![no_std]` directive. This approach ensures that the contract is smaller in size and operates more efficiently.

### Key Functions

#### Token Management
- `mint`: Create new tokens (admin only)
- `burn`: Burn tokens
- `transfer`: Transfer tokens
- `balance`: View address balance

#### Allowance Management
- `approve`: Grant spending permission to another address
- `allowance`: View granted permission amount
- `transfer_from`: Transfer tokens with permission
- `burn_from`: Burn tokens with permission

#### Admin Operations
- `initialize`: Initialize the contract
- `set_admin`: Change the administrator address

## Contact

For questions or contributions, please open an issue or submit a pull request.
