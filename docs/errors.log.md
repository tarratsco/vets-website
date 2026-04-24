# Error Log

This document tracks errors encountered during development and their resolutions.

## [2026-03-24] - DOB/Employment date validations not triggering in unit tests
- **Error Message**: ```text
yarn run v1.19.1
$ node ./script/run-unit-tests-local.js src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx

  3 passing (54ms)
  7 failing

  1) Veteran Information Page
       date of birth business validations
         should show validation error when DOB is less than 14 years before today:

      AssertionError: expected [] to have a length of 1 but got 0
      + expected - actual
      -0
      +1
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx:76:37)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at Hook.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  2) Veteran Information Page
       date of birth business validations
         should show validation error when DOB is more than 120 years before today:

      AssertionError: expected [] to have a length of 1 but got 0
      + expected - actual
      -0
      +1
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx:88:37)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at Hook.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  3) Employment Dates Page
       should add error when beginning date is before Veteran's date of birth:

      AssertionError: expected [] to deeply equal [ Array(1) ]
      + expected - actual
      -[]
      +[
      +  "Beginning date can't be before the Veteran's date of birth"
      +]
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx:53:44)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  4) Employment Dates Page
       should add error when beginning date is before Veteran's 14th birthday:

      AssertionError: expected [] to deeply equal [ Array(1) ]
      + expected - actual
      -[]
      +[
      +  "Beginning date can't be before the Veteran's 14th birthday"
      +]
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx:68:44)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  5) Employment Dates Page
       should add error when ending date is before Veteran's date of birth:

      AssertionError: expected [] to deeply equal [ Array(1) ]
      + expected - actual
      -[]
      +[
      +  "Ending date can't be before the Veteran's date of birth"
      +]
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx:83:41)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  6) Employment Dates Page
       should add error when ending date is before Veteran's 14th birthday:

      AssertionError: expected [] to deeply equal [ Array(1) ]
      + expected - actual
      -[]
      +[
      +  "Ending date can't be before the Veteran's 14th birthday"
      +]
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx:98:41)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)

  7) Employment Dates Page
       should keep existing ending date before beginning date validation:

      AssertionError: expected [] to deeply equal [ Array(1) ]
      + expected - actual
      -[]
      +[
      +  "Ending date must be on or after the beginning date"
      +]
      at Context.<anonymous> (src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx:116:41)
      at Test.Runnable.run (node_modules/mocha-snapshots/src/index.js:19:22)
      at processImmediate (node:internal/timers:485:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17)
error Command failed with exit code 7.
```
- **Location**: `src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.js:37`, `src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.js:37`, and `src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx:15`
- **Reproduction Steps**: 
  1. Run `yarn lint:js:changed:fix && yarn test:unit src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx`.
  2. Observe 7 assertion failures where expected `addError` messages are never pushed.
  3. Environment: Darwin, Node `v22.22.0`, Yarn `1.19.1`.
  4. Error captured at `2026-03-24 15:32:43 MDT`.
- **Root Cause**: Custom date business-rule logic compared values returned by `convertToDateField` as if they were native `Date` objects. In this forms system, `convertToDateField` returns a structured date-field object (`{ year/month/day: { value } }`), so `instanceof Date` checks fail and `<`/`>` comparisons are invalid for DOB/business-age checks. Separately, the veteran DOB unit test was invoking `ui:validations[0]`, which is the built-in `validateCurrentOrPastMemorableDate` inserted by `dateOfBirthUI`; the custom business validator is actually at index `1`.
- **Solution**: 
  ```javascript
  // veteran-information.js
  import { dateFieldToDate } from 'platform/utilities/date';
  const veteranDobField = convertToDateField(dateOfBirth);
  const veteranDob = dateFieldToDate(veteranDobField);

  // employment-dates.js
  import { dateFieldToDate } from 'platform/utilities/date';
  const parsedDob = dateFieldToDate(convertToDateField(dob));
  const beginningDateValue = beginningDate
    ? dateFieldToDate(convertToDateField(beginningDate))
    : null;
  const endingDateValue = endingDate
    ? dateFieldToDate(convertToDateField(endingDate))
    : null;
  const fromDate = convertToDateField(beginningDate);
  const toDate = convertToDateField(endingDate);
  if (!isValidDateRange(fromDate, toDate, true)) {
    errors.endingDate.addError('Ending date must be on or after the beginning date');
  }

  // veteran-information.unit.spec.jsx
  const getDateValidation = () =>
    veteranInformationUiSchema.veteranInformation.dateOfBirth['ui:validations'][1];
  ```
- **Verification**: Re-ran the same command: `yarn lint:js:changed:fix && yarn test:unit src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/veteran-information.unit.spec.jsx src/applications/benefits-optimization-aquia/21-4192-employment-information/pages/employment-dates.unit.spec.jsx` and got `10 passing`, `0 failing`.
- **Prevention**: When using forms-system date helpers, treat `convertToDateField` output as a date-field object, not a `Date`; convert with `dateFieldToDate` for chronological comparisons. In unit tests for `dateOfBirthUI/currentOrPastDateUI`, account for base validators being prepended, and target the correct custom validator index or locate validator by function identity/name to avoid brittle index assumptions.
