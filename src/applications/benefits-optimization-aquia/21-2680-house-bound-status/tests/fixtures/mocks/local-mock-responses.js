// yarn mock-api --responses ./src/applications/{application}/tests/e2e/fixtures/mocks/local-mock-responses.js
const mockUser = require('./user.json');
const addressValidation = require('../../../../shared/tests/mocks/address-validation.json');

const responses = {
  'GET /v0/user': mockUser,
  'POST /v0/profile/address_validation': addressValidation,

  // Mock the in-progress forms endpoint for prefill
  'GET /v0/in_progress_forms/21-2680': {
    formData: {},
    metadata: {
      version: 0,
      prefill: true,
      returnUrl: '/veteran-information',
    },
  },
};

module.exports = responses;
