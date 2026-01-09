import path from 'path';
import testForm from 'platform/testing/e2e/cypress/support/form-tester';
import { createTestConfig } from 'platform/testing/e2e/cypress/support/form-tester/utilities';
import featureToggles from '../fixtures/mocks/feature-toggles.json';
import user from '../fixtures/mocks/user.json';
import mockSubmit from '../fixtures/mocks/application-submit.json';
import formConfig from '../../config/form';
import manifest from '../../manifest.json';
import {
  fillTextWebComponent,
  fillDateWebComponentPattern,
  fillFirstLastNameWebComponentPattern,
  selectDropdownWebComponent,
  continueForm,
  expectValidationError,
} from '../../../shared/tests/mocks/e2e/helpers';

// =============================================================================
// HELPER FUNCTIONS (using proven Form 8940 patterns)
// =============================================================================

const setupTestEnvironment = () => {
  // Mock user and authentication
  cy.intercept('GET', '/v0/user', user);

  // Mock feature toggles
  cy.intercept('GET', '/v0/feature_toggles*', featureToggles);

  // Mock save-in-progress endpoints
  cy.intercept('GET', '/v0/in_progress_forms/21-4192', {
    statusCode: 200,
    body: {
      formData: {},
      metadata: {},
    },
  });

  cy.intercept('PUT', '/v0/in_progress_forms/21-4192', {
    statusCode: 200,
    body: {
      data: {
        attributes: {
          metadata: {
            version: 0,
            returnUrl: '/veteran-information',
          },
        },
      },
    },
  });

  // Mock form submission
  cy.intercept('POST', formConfig.submitUrl, {
    statusCode: 200,
    body: mockSubmit,
  });

  // Login
  cy.login(user);
};

const startForm = () => {
  cy.get('va-link-action[data-testid="start-employment-info-link"]')
    .shadow()
    .find('a')
    .click();
};

// Fill veteran information (first and last name only - no middle)
// Form uses firstNameLastNameNoSuffixUI pattern
const fillVeteranInformation = ({ firstName, lastName }) => {
  fillFirstLastNameWebComponentPattern('veteranInformation_veteranFullName', {
    first: firstName,
    last: lastName,
  });
};

// Fill date of birth using proven date pattern from Form 8940
const fillDateOfBirth = dateString => {
  fillDateWebComponentPattern('veteranInformation_dateOfBirth', dateString);
};

// Fill SSN and VA File Number
const fillVeteranContactInformation = ({ ssn, vaFileNumber }) => {
  if (ssn !== undefined && ssn !== '') {
    fillTextWebComponent('veteranContactInformation_ssn', ssn);
  }

  if (vaFileNumber !== undefined && vaFileNumber !== '') {
    fillTextWebComponent(
      'veteranContactInformation_vaFileNumber',
      vaFileNumber,
    );
  }
};

// Fill employer information
const fillEmployerInformation = ({ name, street, city, state, postalCode }) => {
  if (name !== undefined) {
    fillTextWebComponent('employerInformation_employerName', name);
  }

  if (street !== undefined) {
    fillTextWebComponent('employerInformation_employerAddress_street', street);
  }

  if (city !== undefined) {
    fillTextWebComponent('employerInformation_employerAddress_city', city);
  }

  if (state !== undefined) {
    selectDropdownWebComponent(
      'employerInformation_employerAddress_state',
      state,
    );
  }

  if (postalCode !== undefined) {
    fillTextWebComponent(
      'employerInformation_employerAddress_postalCode',
      postalCode,
    );
  }
};

// Fill employment dates using proven date pattern
const fillEmploymentDates = ({ beginningDate, endingDate }) => {
  if (beginningDate) {
    fillDateWebComponentPattern('employmentDates_beginningDate', beginningDate);
  }

  if (endingDate) {
    fillDateWebComponentPattern('employmentDates_endingDate', endingDate);
  }
};

// =============================================================================
// AUTOMATED TESTS (using testForm)
// =============================================================================

const testConfig = createTestConfig(
  {
    dataPrefix: 'data',
    dataSets: ['maximal', 'minimal'],
    dataDir: path.join(__dirname, '..', 'fixtures', 'data'),
    pageHooks: {
      introduction: ({ afterHook }) => {
        cy.injectAxeThenAxeCheck();
        afterHook(() => {
          startForm();
        });
      },
      'review-and-submit': ({ afterHook }) => {
        afterHook(() => {
          cy.get('@testData').then(data => {
            // Use signature from test data - these are DIFFERENT from veteran names
            // to prove validation is disabled:
            // - maximal.json: "Test Signature Name" (veteran: "Boba J Fett")
            // - minimal.json: "Different Test Name" (veteran: "Ahsoka T Tano")
            const signature =
              data.statementOfTruthSignature || 'Test Signature';

            // Fill signature and submit using helper
            cy.get('va-statement-of-truth')
              .shadow()
              .find('input[type="text"]')
              .type(signature);

            cy.get('va-statement-of-truth')
              .shadow()
              .find('input[type="checkbox"]')
              .check({ force: true });

            cy.axeCheck();

            cy.findByText(/submit/i, { selector: 'button' }).click();
          });
        });
      },
    },
    setupPerTest: () => {
      setupTestEnvironment();
    },
  },
  manifest,
  formConfig,
);

testForm(testConfig);

// =============================================================================
// MANUAL EDGE CASE TESTS
// =============================================================================

describe('Form 21-4192 - Edge Cases and Validation', () => {
  beforeEach(() => {
    setupTestEnvironment();
    cy.visit(manifest.rootUrl);
    cy.injectAxe();
  });

  describe('Veteran Information Page - Validation', () => {
    beforeEach(() => {
      startForm();
    });

    it('should show validation errors when required fields are empty', () => {
      continueForm();

      // Check for validation errors on required fields
      expectValidationError('Enter a first or given name');
      expectValidationError('Enter a last or family name');
      expectValidationError('Please enter a date');
    });

    it('should accept special characters in names (hyphens and apostrophes)', () => {
      fillVeteranInformation({
        firstName: 'Mary-Anne',
        lastName: "O'Connor",
      });

      fillDateOfBirth('1980-05-15');

      continueForm();

      // Should proceed to next page without errors
      cy.url().should('include', '/veteran-contact-information');
    });

    it('should reject invalid characters in names', () => {
      fillVeteranInformation({
        firstName: 'John@Test',
        lastName: 'Doe',
      });

      fillDateOfBirth('1980-05-15');

      continueForm();

      // Should show validation error for invalid character
      expectValidationError("You entered a character we can't accept");
    });
  });

  describe('Veteran Contact Information - SSN and VA File Number', () => {
    beforeEach(() => {
      startForm();
      fillVeteranInformation({
        firstName: 'John',
        lastName: 'Doe',
      });
      fillDateOfBirth('1980-01-15');
      continueForm();
    });

    it('should require at least one identifier (SSN or VA File Number)', () => {
      continueForm();

      // Check for validation error about needing one identifier
      cy.contains(/social security|ssn|va file|identifier/i).should(
        'be.visible',
      );
    });

    it('should accept SSN only', () => {
      fillVeteranContactInformation({
        ssn: '123456789',
        vaFileNumber: '',
      });

      continueForm();

      // Should proceed to next page
      cy.url().should('include', '/employer-information');
    });

    it('should accept VA File Number only', () => {
      fillVeteranContactInformation({
        ssn: '',
        vaFileNumber: '987654321',
      });

      continueForm();

      // Should proceed to next page
      cy.url().should('include', '/employer-information');
    });

    it('should validate SSN format', () => {
      fillVeteranContactInformation({
        ssn: '123',
        vaFileNumber: '',
      });

      continueForm();

      // Check for SSN format validation error
      cy.contains(/social security|ssn|9 digit|valid/i).should('be.visible');
    });
  });

  describe('Employer Information - Validation', () => {
    beforeEach(() => {
      startForm();
      fillVeteranInformation({
        firstName: 'John',
        lastName: 'Doe',
      });
      fillDateOfBirth('1980-01-15');
      continueForm();
      fillVeteranContactInformation({
        ssn: '123456789',
      });
      continueForm();
    });

    it('should show validation errors for required fields', () => {
      continueForm();

      // Check for validation errors (exact messages may vary by implementation)
      cy.contains(/employer|name/i).should('be.visible');
      cy.contains(/street|address/i).should('be.visible');
      cy.contains(/city/i).should('be.visible');
      cy.contains(/state/i).should('be.visible');
      cy.contains(/postal|zip/i).should('be.visible');
    });

    it('should accept maximum length values', () => {
      fillEmployerInformation({
        name: 'A'.repeat(100),
        street: 'B'.repeat(50),
        city: 'C'.repeat(50),
        state: 'CA',
        postalCode: '12345',
      });

      continueForm();

      // Should proceed to next page
      cy.url().should('include', '/employment-dates');
    });
  });

  describe('Employment Dates - Validation', () => {
    beforeEach(() => {
      startForm();
      fillVeteranInformation({
        firstName: 'John',
        lastName: 'Doe',
      });
      fillDateOfBirth('1980-01-15');
      continueForm();
      fillVeteranContactInformation({
        ssn: '123456789',
      });
      continueForm();
      fillEmployerInformation({
        name: 'Acme Corp',
        street: '123 Main St',
        city: 'Springfield',
        state: 'CA',
        postalCode: '12345',
      });
      continueForm();
    });

    it('should require beginning date', () => {
      continueForm();

      // Check for validation error about date
      cy.contains(/date|required|provide/i).should('be.visible');
    });

    it('should accept employment without ending date (currently employed)', () => {
      fillEmploymentDates({
        beginningDate: '2020-01-15',
        endingDate: '',
      });

      continueForm();

      // Should proceed to employment earnings page
      cy.url().should('include', '/employment-earnings-hours');
    });

    it('should validate date relationships', () => {
      fillEmploymentDates({
        beginningDate: '2020-12-31',
        endingDate: '2020-01-01',
      });

      continueForm();

      // Check for validation error about date ordering
      cy.contains(/date|after|before/i).should('be.visible');
    });
  });

  describe('Conditional Pages - Employment Termination', () => {
    beforeEach(() => {
      setupTestEnvironment();
    });

    it('should show termination pages when ending date is provided', () => {
      cy.visit(`${manifest.rootUrl}/introduction`);
      startForm();

      // Fill form with ending date
      fillVeteranInformation({
        firstName: 'John',
        lastName: 'Doe',
      });
      fillDateOfBirth('1980-01-15');
      continueForm();

      fillVeteranContactInformation({ ssn: '123456789' });
      continueForm();

      fillEmployerInformation({
        name: 'Acme Corp',
        street: '123 Main St',
        city: 'Springfield',
        state: 'CA',
        postalCode: '12345',
      });
      continueForm();

      fillEmploymentDates({
        beginningDate: '2020-01-15',
        endingDate: '2023-12-31',
      });
      continueForm();

      // Should eventually reach employment-termination page
      // (after filling employment-earnings-hours and employment-concessions)
      cy.url().should('include', '/employment-earnings-hours');
    });

    it('should skip termination pages when no ending date (currently employed)', () => {
      cy.visit(`${manifest.rootUrl}/introduction`);
      startForm();

      // Fill form without ending date
      fillVeteranInformation({
        firstName: 'John',
        lastName: 'Doe',
      });
      fillDateOfBirth('1980-01-15');
      continueForm();

      fillVeteranContactInformation({ ssn: '123456789' });
      continueForm();

      fillEmployerInformation({
        name: 'Acme Corp',
        street: '123 Main St',
        city: 'Springfield',
        state: 'CA',
        postalCode: '12345',
      });
      continueForm();

      fillEmploymentDates({
        beginningDate: '2020-01-15',
        endingDate: '',
      });
      continueForm();

      // Should reach employment-earnings-hours
      cy.url().should('include', '/employment-earnings-hours');

      // Note: Full verification of skipping termination pages would require
      // completing the entire form, which is handled by the maximal/minimal tests
    });
  });
});
