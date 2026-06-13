# ForgeStream

An open-source collection of reusable Soroban smart contracts and developer tooling for building secure payment workflows on the Stellar network.

ForgeStream provides modular building blocks that help developers accelerate the development of decentralized applications by offering reusable components for escrow, milestone-based payments, treasury management, and related financial workflows.

---

## Why ForgeStream?

Many blockchain applications require similar payment primitives such as escrow contracts, staged fund releases, and treasury management. ForgeStream aims to reduce duplicated effort by providing well-documented, reusable, and extensible modules built with Rust and Soroban.

## Current Focus

The project is currently focused on building:

* 🔒 Escrow contracts
* 📋 Milestone-based payment contracts
* 💰 Treasury management utilities
* 🛠️ Developer-friendly SDKs
* 📚 Documentation and examples

## Repository Structure

```text
ForgeStream/
├── frontend/      # Maintainer dashboard and developer interface
├── contracts/     # Soroban smart contracts written in Rust
├── sdk/           # Client SDKs and helper libraries
├── docs/          # Technical documentation
├── tests/         # Contract and integration tests
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Technology Stack

* Rust
* Soroban SDK
* Stellar
* Next.js
* TypeScript

## Project Status

ForgeStream is under active development.

The initial release focuses on establishing the core architecture and foundational smart contract modules while preparing the repository for community contributions.

## Roadmap

* [ ] Implement Escrow Contract
* [ ] Implement Milestone Contract
* [ ] Add Treasury Module
* [ ] Publish JavaScript SDK
* [ ] Publish Rust SDK
* [ ] Add integration tests
* [ ] Expand technical documentation
* [ ] Provide complete example applications

## Contributing

We welcome contributions from the community.

Whether you're fixing bugs, improving documentation, adding tests, or implementing new features, your contributions are appreciated.

To get started:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request with a clear description.

Please check open issues before starting work.

## Vision

Our long-term goal is to build a reliable open-source foundation of reusable Soroban components that developers can confidently use when building payment-oriented applications on Stellar.

## License

This project is licensed under the MIT License.
