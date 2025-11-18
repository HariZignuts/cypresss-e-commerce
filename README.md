<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js Logo" height="64" />
  <span style="display:inline-block;width:32px"></span>
  <img src="https://raw.githubusercontent.com/cypress-io/cypress/develop/assets/cypress-logo-dark.png" alt="Cypress Logo" height="64" />
</p>

<h1 align="center">Cypress E-Commerce Automation Suite</h1>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-24.x-43853d?logo=node.js&logoColor=fff" alt="Node.js">
  </a>
  &nbsp;
  <a href="https://pnpm.io" target="_blank">
    <img src="https://img.shields.io/badge/pnpm-10.x-f69220?logo=pnpm&logoColor=fff" alt="pnpm">
  </a>
  &nbsp;
  <a href="https://www.typescriptlang.org" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=fff" alt="TypeScript">
  </a>
  &nbsp;
  <a href="https://www.cypress.io" target="_blank">
    <img src="https://img.shields.io/badge/Cypress-15.6-04c38e?logo=cypress&logoColor=fff" alt="Cypress">
  </a>
</p>

## Overview

This repository contains an end-to-end automation suite for the Sauce Demo e-commerce experience. It uses Cypress + TypeScript, a Page Object Model, deterministic fixtures, and randomized checkout data to validate the full purchase flow—from login, through cart management, to order confirmation.

### Highlights

- **Page Object Model (POM):** `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage` encapsulate selectors and actions for clean, reusable steps.
- **Custom Cypress Commands:** `cy.login()` and `cy.logout()` provide secure, session-aware authentication that pulls credentials from environment variables.
- **Data-driven flows:** Product names are sourced from `cypress/fixtures/items.json`, and checkout identity data is generated on the fly via `@faker-js/faker`.
- **Typed test code:** Full TypeScript support, including `tsconfig` in both the repo root and `cypress/` folder, ensures editor IntelliSense and safer refactors.
- **Deterministic artifacts:** Screenshots and videos are saved under `cypress/screenshots` and `cypress/videos` when running in headless mode.

## Tech Stack

| Layer                     | Tools                            |
| ------------------------- | -------------------------------- |
| Runtime & Package Manager | Node.js 24.x, pnpm 10.x          |
| Test Runner               | Cypress 15.6 (E2E mode)          |
| Language                  | TypeScript 5.9 (ESM)             |
| Test Data                 | `@faker-js/faker`, JSON fixtures |
| Utilities                 | `dotenv` for environment loading |

## Prerequisites

1. [Node.js 24.x](https://nodejs.org/en/download) (Corepack ships with Node 16+, required for pnpm)
2. Enable `pnpm` via Corepack (recommended):

```bash
corepack enable
corepack prepare pnpm@10 --activate
```

3. (Optional) Cypress binary verification for CI machines:

```bash
pnpm exec cypress verify
```

## Setup & Installation

```bash
pnpm install
cp .env.example .env   # create your own file if needed
```

Populate `.env` with the values your Sauce Demo environment expects:

```dotenv
# cypress/.env template
BASE_URL=https://www.saucedemo.com
CYPRESS_USERNAME=standard_user
CYPRESS_PASSWORD=secret_sauce
# Optional overrides
CYPRESS_VIDEO=true
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=800
```

> The root configuration (`cypress.config.ts`) automatically loads `.env` via `dotenv` so both headed and headless runs read the same values.

## Running the Tests

```bash
pnpm cy:open   # Interactive mode with Cypress App
pnpm cy:run    # Headless run (saves screenshots/videos)
```

- Tests use `cy.session` caching, so repeated specs will reuse authenticated state unless credentials change.
- Videos are gated by `CYPRESS_VIDEO`; screenshots are produced on failure by default.

## Key Test Scenarios

| Spec                                        | Description                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `cypress/e2e/smoke-test.cy.ts`              | Basic Cypress "kitchen sink" example kept as a health check of the toolchain.                                                         |
| `cypress/e2e/saucedemo/purchase-flow.cy.ts` | Full purchase journey: login → add fixture-defined items → validate cart → remove one item → checkout with faker data → confirmation. |

## Project Structure

```text
cypresss-e-commerce/
├─ cypress.config.ts          # Global Cypress + dotenv configuration
├─ package.json               # Scripts, engines, dependencies
├─ pnpm-lock.yaml             # Locked dependency graph
├─ cypress/
│  ├─ e2e/                    # Spec files (smoke + SauceDemo purchase)
│  ├─ fixtures/               # Test data (items, sample JSON)
│  ├─ support/
│  │  ├─ commands.ts          # Base command definitions
│  │  ├─ e2e.ts               # Custom login/logout commands + global hooks
│  │  ├─ selectors.ts         # Centralized data-test selectors
│  │  ├─ page-objects/        # POM classes (Login, Inventory, Cart, Checkout)
│  │  └─ utils/TestUtils.ts   # Faker-powered data helpers
│  ├─ screenshots/            # Output (gitignored)
│  └─ videos/                 # Output (gitignored)
└─ tsconfig.json              # ESM + TS configuration shared across project
```

## Implementation Notes

- **Authentication Guardrails:** `cy.login()` refuses to run if `USERNAME` / `PASSWORD` are missing, preventing false positives in CI.
- **Session Validation:** Each cached session verifies the `session-username` cookie to avoid stale auth reuse.
- **State Cleanup:** After every spec, the suite logs out and clears cookies/local storage to keep tests isolated.
- **Selector Utilities:** `selectors.ts` exposes both raw CSS strings and ergonomic helpers so page objects remain declarative.
- **Randomized Checkout Data:** `TestUtils.generateRandomUserData()` supplies realistic user info while still asserting DOM state.

## Troubleshooting

- **Cypress cannot find BASE_URL:** Ensure `.env` is present or `BASE_URL` is exported in your shell before running `pnpm cy:run`.
- **Login command throws:** Confirm `CYPRESS_USERNAME` and `CYPRESS_PASSWORD` exist; the command intentionally throws early if either is blank.
- **Artifacts missing:** Set `CYPRESS_VIDEO=true` and run headless; screenshots only capture failures by default.

## Contributing

1. Fork and clone the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Run `pnpm cy:run` to ensure tests pass.
4. Submit a pull request with context about the scenario you automated or fixed.

---

## Author

- Github: @HariZignuts
