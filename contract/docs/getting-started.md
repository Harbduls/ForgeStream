# Getting Started

## Prerequisites

- **Rust & Cargo**: Install from https://rustup.rs/
- **cargo-soroban**: Install via `cargo install --locked cargo-soroban`
- **Soroban CLI**: For contract deployment and interaction

## Step 1: Install Rust Toolchain

```bash
rustup update stable
```

## Step 2: Build the Contract

```bash
cd contract
cargo build --release
```

## Step 3: Run Tests

```bash
cargo test
```

This will run all unit tests for the contract.

## Step 4: Deploy the Contract

After building, deploy to Soroban testnet using cargo-soroban:

```bash
cargo soroban deploy --network testnet --source ACCOUNT
```

## Next Steps

Read the [Architecture Overview](./architecture.md) to understand how the contract works internally.
