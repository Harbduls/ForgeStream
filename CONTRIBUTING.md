# Contributing to ForgeStream OSS Dashboard

Thank you for your interest in contributing to ForgeStream OSS Dashboard! We welcome all contributions, from code to docs to issue reports.

## Table of Contents

1. [Project Structure](#project-structure)
2. [How to Set Up the Project](#how-to-set-up-the-project)
3. [Coding Standards](#coding-standards)
4. [How to Claim Issues](#how-to-claim-issues)
5. [How to Submit Pull Requests](#how-to-submit-pull-requests)
6. [Code of Conduct](#code-of-conduct)

---

## Project Structure

This monorepo has two main parts:
- `contract/`: Soroban Escrow Smart Contract
- `Frontend/`: Next.js Dashboard UI

---

## How to Set Up the Project

### Prerequisites

First, install all required tools:

- **Rust & Cargo**: For the smart contract ([rustup.rs](https://rustup.rs/))
- **Node.js & pnpm**: For the frontend (we use [pnpm](https://pnpm.io/))
- **cargo-soroban**: For Soroban contract deployment (`cargo install --locked cargo-soroban`)

### Step 1: Fork and Clone the Repository

1. Click "Fork" in the top-right
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/forge-stream-oss-dashboard.git
   cd forge-stream-oss-dashboard
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the dev server:
   ```bash
   pnpm dev
   ```
4. Open your browser to http://localhost:3000

---

### Contract Setup

1. Navigate to the contract directory:
   ```bash
   cd contract
   ```
2. Build the contract:
   ```bash
   cargo build --release
   ```
3. Run tests:
   ```bash
   cargo test
   ```

---

## Coding Standards

### Commit Messages

We follow **Conventional Commits**:
```
<type>(<scope>): <description>
```
Examples:
```
feat(contract): add partial release
fix(frontend): fix broken contract page
docs: update contributing guide
test(contract): add auth tests
```

---

### Frontend Standards

- **Code Style**: We use ESLint and Prettier (run `pnpm lint` and `pnpm format`)
- **Components**: Use shadcn-style primitives from `components/ui/`
- **Types**: Full TypeScript support required
- **Testing**: Add tests where applicable

---

### Contract Standards

- **Code Style**: Run `cargo fmt` and `cargo clippy -- -D warnings`
- **Testing**: Add tests for all new functionality
- **Docs**: Add Rustdoc comments to public functions/structs

---

## How to Claim Issues

1. **Browse Issues**: Check our [issues page](../../issues)
2. **Look for Labels**: Pick `good first issue` if you're new!
3. **Comment to Claim**: Leave a comment like "I'd like to work on this!"
4. **Wait for Assignment**: A maintainer will assign it to you
5. **Start Working**: Follow PR steps below!

---

## How to Submit Pull Requests

### Step 1: Create a Branch
```bash
git checkout -b <type>/<description>
# Examples:
# git checkout -b feat/contract-partial-release
# git checkout -b fix/frontend-contract-page
```

### Step 2: Make & Commit Changes
- Follow coding standards
- Add tests for changes
- Commit with conventional messages

### Step 3: Push & Open PR
```bash
git push origin <branch-name>
```
Then open a PR on GitHub and fill out the PR template!

### PR Checklist
- [ ] I've followed coding standards
- [ ] I've added/updated tests
- [ ] All existing tests pass
- [ ] I've updated documentation if needed
- [ ] I've linked to the issue my PR closes

---

## Code of Conduct
We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Be respectful and kind!

---

Thank you for contributing! 🎉
