# Project Rules Log

This file tracks all rule registrations, violations, updates, and disablements for the vets-website project.

## [2026-02-12] - Rule Update: 21-2680-platform-import-path
- **Project**: vets-website
- **Category**: style
- **Rule**: Platform form pattern imports in the `21-2680-house-bound-status-secondary` application must use the path `platform/forms-system/src/js/web-component-patterns` (not the full node_modules path or any other variation).
- **Action**: registered
- **Prevention Suggestion**: Add an ESLint rule to enforce import path conventions. Create a custom ESLint plugin or use `eslint-plugin-import` with the `no-restricted-paths` rule to flag imports from `@department-of-veterans-affairs/va-forms-system-core/dist` and suggest the correct `platform/forms-system/src/js/web-component-patterns` path instead. Document this convention in the application's README and add to code review checklist.
- **Timestamp**: 2026-02-12T00:00:00.000Z

## [2026-02-12] - Rule Update: 21-2680-local-webpack-alias
- **Project**: vets-website
- **Category**: style
- **Rule**: All local imports within the `21-2680-house-bound-status-secondary` application (non-test source files) must use the `@bio-aquia/21-2680-house-bound-status-secondary/` webpack alias instead of relative paths (e.g., `../utils` or `./pages`). This applies to all source files under `src/applications/benefits-optimization-aquia/21-2680-house-bound-status-secondary/` except test files.
- **Action**: registered
- **Prevention Suggestion**: Configure ESLint with `eslint-plugin-import` and add a custom rule or use `import/no-relative-packages` combined with `import/no-relative-parent-imports` to flag relative imports. Create an ESLint override for the `21-2680-house-bound-status-secondary` directory that enforces the webpack alias pattern. Add a pre-commit hook using `lint-staged` to check imports before commits. Document the webpack alias usage in the application's README and provide import examples.
- **Timestamp**: 2026-02-12T23:30:00.000Z
