# Architecture Overview

## Data Structures

### Escrow State

The `Escrow` struct is the main data structure:

```rust
pub struct Escrow {
    pub buyer: Address,
    pub seller: Address,
    pub amount: i128,
    pub is_funded: bool,
    pub is_released: bool,
    pub is_refunded: bool,
    pub deadline: u64,
}
```

## Storage Layout

- **next_id**: Counter for generating sequential escrow IDs
- **escrows**: Map of escrow ID to Escrow state

## Contract Functions

### 1. `create_escrow`
- **Parameters**: buyer, seller, amount, deadline
- **Returns**: New escrow ID
- **Auth**: Requires buyer signature

### 2. `deposit_funds`
- **Parameters**: escrow_id
- **Returns**: None
- **Auth**: Requires buyer signature
- **Checks**: Escrow exists, not already funded, not already completed

### 3. `release_funds`
- **Parameters**: escrow_id
- **Returns**: None
- **Auth**: Requires buyer signature
- **Checks**: Escrow exists, is funded, not already completed

### 4. `refund_funds`
- **Parameters**: escrow_id
- **Returns**: None
- **Auth**: Implicit (no auth needed, just time check)
- **Checks**: Escrow exists, is funded, not already completed, deadline reached

### 5. `get_escrow`
- **Parameters**: escrow_id
- **Returns**: Escrow
- **Auth**: None

### 6. `get_all_escrows`
- **Parameters**: None
- **Returns**: Vec<Escrow>
- **Auth**: None

## Workflows

### Escrow Release Flow
1. Buyer creates escrow
2. Buyer deposits funds
3. Buyer releases funds to seller

### Escrow Refund Flow
1. Buyer creates escrow with deadline
2. Buyer deposits funds
3. Deadline passes
4. Anyone can trigger refund
