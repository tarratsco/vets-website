# USPS Address Validation Patch Report

Date: 2026-03-18
Branch: `tarratsco/135782-bio-forms-address-validation-integration`

## Scope
This patch addresses the critical USPS address-validation issues found in the shared Benefits Optimization Aquia implementation.

## Issues Fixed

### 1. Navigation loop risk caused by shared closure state
- File: `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.jsx`
- Problem:
  - A mutable closure variable (`addressConfirmed`) was used to skip the validation page on back-navigation.
  - After a 100-confidence auto-advance, navigating back could immediately trigger `goBack()` again and trap users in a loop.
- Fix:
  - Removed the shared closure skip logic.
  - Preserved normal per-visit validation behavior.
- Result:
  - Back/forward navigation no longer depends on stale shared closure state.

### 2. Exact-match flow forwarded stale form data
- File: `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.jsx`
- Problem:
  - In the 100-confidence path, normalized USPS address could be dispatched but `goForward(formData)` still used pre-update data.
- Fix:
  - Compute `nextFormData` using normalized address when present.
  - Dispatch `setData(nextFormData)` and call `goForward(nextFormData)`.
- Result:
  - Exact-match auto-advance now carries normalized address state forward consistently.

### 3. Domestic/international mismatch when country was missing
- File: `src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.js`
- Problem:
  - `country_code_iso3` defaulted to `USA`, but `address_type` was computed before defaulting and could incorrectly become `INTERNATIONAL`.
- Fix:
  - Introduced `countryCode = address.country || 'USA'`.
  - Derive both `country_code_iso3` and `address_type` from `countryCode`.
- Result:
  - Payload now stays internally consistent for missing-country input.

### 4. Suggestion mode triggered when confidence was missing
- File: `src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.js`
- Problem:
  - `showSuggestions: confidenceScore !== 100` treated `undefined` as true.
- Fix:
  - Updated to `typeof confidenceScore === 'number' && confidenceScore !== 100`.
- Result:
  - Suggestions are shown only when confidence is explicitly provided and not exact-match.

### 5. Unit tests mocked the wrong network layer
- File: `src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.unit.spec.jsx`
- Problem:
  - Tests stubbed `global.fetch`, but production code uses `apiRequest`.
  - This caused false failures in confidence-related assertions.
- Fix:
  - Replaced fetch stubs with `mockApiRequest` from `platform/testing/unit/helpers`.
  - Updated success and failure cases accordingly.
- Result:
  - Tests now validate the real implementation path used by `fetchSuggestedAddress`.

## Validation Performed

Command run:

```bash
yarn test:unit src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.unit.spec.jsx
```

Result:

- `11 passing`
- `0 failing`

Additional colocated regression test command:

```bash
yarn test:unit src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.unit.spec.jsx
```

Result:

- `2 passing`
- `0 failing`

Combined validation command:

```bash
yarn test:unit src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.unit.spec.jsx src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.unit.spec.jsx
```

Result:

- `13 passing`
- `0 failing`

## New Colocated Test Coverage

Added colocated unit test file:

- `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.unit.spec.jsx`

Scenarios covered:

1. Exact-match auto-advance forwards normalized form data (100 confidence).
2. Regression guard: remounting the same generated page after a 100-confidence validation does not call `goBack()` and does re-validate.

## Follow-up Fix: Invalid Selector From JSON Radio Values

- Files:
  - `src/applications/benefits-optimization-aquia/shared/components/pages/SuggestedAddressRadio.jsx`
  - `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.jsx`
- Problem:
  - `va-radio-option` values used `JSON.stringify(address)`, which introduced quotes/braces into generated attributes.
  - Browser autofill overlay scripts attempted to query labels using that value, producing invalid CSS selectors.
- Fix:
  - Replaced JSON string values with stable tokens: `user-entered` and `usps-suggested`.
  - Updated change handler to map token values back to the corresponding address object before dispatching `setData`.
- Result:
  - Eliminates invalid selector construction while preserving address selection behavior.

## Follow-up Fix: Exact-Match Back Navigation Trap

- Files:
  - `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.jsx`
  - `src/applications/benefits-optimization-aquia/shared/components/pages/AddressConfirmation.jsx`
  - `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.unit.spec.jsx`
- Problem:
  - For `confidenceScore === 100`, the page auto-called `goForward(...)` on mount.
  - Pressing Back from the next page returned to validation, which immediately auto-forwarded again, trapping users.
- Fix:
  - Switched to medallions-style behavior: no auto-forward on exact match.
  - Exact match now renders a success confirmation state and waits for explicit user Continue/Back navigation.
  - Added/updated colocated tests to assert:
    - exact-match path does not auto-forward on mount,
    - explicit Continue triggers forward,
    - remount does not force forward (back navigation remains possible).
- Result:
  - Users can navigate back from downstream pages and edit employer address without being bounced forward.

## Follow-up Fix: Cypress E2E Runtime Error (`undefined.call`)

- Date: 2026-03-20
- Symptom:
  - Multiple BIO Aqua Cypress specs failed with:
    - `TypeError: Cannot read properties of undefined (reading 'call')`
  - Affected specs included:
    - `src/applications/benefits-optimization-aquia/21-0779-nursing-home-information/tests/e2e/21-0779-nursing-home-information.cypress.spec.js`
    - `src/applications/benefits-optimization-aquia/21-4192-employment-information/tests/e2e/21-4192-employment-information.cypress.spec.js`
    - `src/applications/benefits-optimization-aquia/21p-530a-interment-allowance/tests/21p-530a-interment-allowance.cypress.spec.js`
    - `src/applications/benefits-optimization-aquia/21-2680-house-bound-status/tests/e2e/21-2680-house-bound-status.cypress.spec.js`

- Root cause analysis:
  - This was not caused by invalid Cypress hook callback shapes in the E2E spec files.
  - The highest-probability failure path was module initialization through the shared pages barrel import:
    - `@bio-aquia/shared/components/pages`
  - In Cypress bundling/runtime, resolving the broad barrel in form-config critical path can trigger module-init ordering/circular-resolution failures that surface as `undefined.call`.

- Fix applied:
  - Replaced barrel import with direct import of the concrete module used by form config:
    - From:
      - `import { createAddressValidationPage } from '@bio-aquia/shared/components/pages';`
    - To:
      - `import { createAddressValidationPage } from '@bio-aquia/shared/components/pages/AddressValidationPage';`
  - Updated form config files:
    - `src/applications/benefits-optimization-aquia/21-0779-nursing-home-information/config/form.js`
    - `src/applications/benefits-optimization-aquia/21-4192-employment-information/config/form/form.js`
    - `src/applications/benefits-optimization-aquia/21p-530a-interment-allowance/config/form/form.js`
    - `src/applications/benefits-optimization-aquia/21-2680-house-bound-status/config/form/form.js`

- Why this works:
  - Direct import narrows the dependency graph in a hot initialization path.
  - It avoids loading unrelated barrel exports during Cypress module bootstrap.
  - It reduces risk of transpiler/bundler edge cases that produce `undefined.call` style runtime failures.

- Prevention guidance:
  - Prefer direct imports (feature-local module path) in form config entry points used by Cypress E2E.
  - Avoid broad barrel imports in initialization-critical paths when only one symbol is needed.
  - If a `reading 'call'` error appears after introducing a new shared dependency:
    - First test direct import replacement for the newly introduced symbol.
    - Re-run one failing spec to confirm before deeper refactors.

- Quick triage checklist for future incidents:
  1. Compare branch diff against `main` for changed form config imports and custom pages.
  2. Identify newly introduced barrel imports in `config/form` files.
  3. Swap to direct module import for the exact symbol used.
  4. Re-run one representative Cypress spec.
  5. Apply same import pattern consistently across sibling forms using the same shared feature.

## Files Updated

- `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.jsx`
- `src/applications/benefits-optimization-aquia/shared/components/pages/AddressValidationPage.unit.spec.jsx`
- `src/applications/benefits-optimization-aquia/shared/components/pages/SuggestedAddressRadio.jsx`
- `src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.js`
- `src/applications/benefits-optimization-aquia/shared/utils/validators/address-validation.unit.spec.jsx`
- `src/applications/benefits-optimization-aquia/21-0779-nursing-home-information/config/form.js`
- `src/applications/benefits-optimization-aquia/21-4192-employment-information/config/form/form.js`
- `src/applications/benefits-optimization-aquia/21p-530a-interment-allowance/config/form/form.js`
- `src/applications/benefits-optimization-aquia/21-2680-house-bound-status/config/form/form.js`
- `docs/usps-address-validation-patch-report.md`
