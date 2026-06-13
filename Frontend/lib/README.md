# Lib

This folder contains shared data and utilities for the dashboard.

## Files

- `data.ts` defines the static dashboard dataset and TypeScript types for modules, issues, contracts, contributors, and activity.
- `utils.ts` exposes the `cn` class name helper used by UI components.

## Updating Data

Use `data.ts` when changing dashboard content such as:

- repository statistics
- activity feed items
- smart contract functions and state variables
- workflow module status
- issue metadata
- contributor records

Keep exported types close to the data they describe so page components can import both from one place.
