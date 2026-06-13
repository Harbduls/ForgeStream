# Escrow Smart Contract

A Soroban smart contract that implements trustless escrow functionality on the Stellar network.

## Features

- **Create Escrow**: Set up a new escrow agreement between a buyer and seller
- **Deposit Funds**: Mark escrow as funded
- **Release Funds**: Release funds to seller once conditions are met
- **Refund Funds**: Refund buyer after a deadline is reached
- **Query Escrow**: Read escrow details and list all active escrows

## Quick Start

### Prerequisites

- Rust 1.75+
- `cargo-soroban` CLI tool

### Building the Contract

```bash
cd contract
cargo build --release
```

### Testing

```bash
cargo test
```

## Documentation

For detailed documentation, see:
- [Getting Started Guide](docs/getting-started.md)
- [Architecture Overview](docs/architecture.md)

## Contributing

We welcome contributions! Please see our [CONTRIBUTING](./CONTRIBUTING.md) guidelines for more information.
