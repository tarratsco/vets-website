import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const graduateDegreeUiSchema = {
  education: {
    'ui:title': 'Graduate degree information',
    graduateDegree: {
      'ui:title': 'Professional degree',
      institutionName: textUI({
        title: 'Name of school or institution',
        errorMessages: { required: 'Please enter the institution name.' },
      }),
      degreeType: textUI({
        title: 'Degree earned',
        hint: 'For example: BSN, MSN, DNP, PhD in Nursing, MS-CRNA, MD, DO',
        errorMessages: { required: 'Please enter your degree type.' },
      }),
      fieldOfStudy: textUI({
        title: 'Field of study or major',
        errorMessages: { required: 'Please enter your field of study.' },
      }),
      graduationDate: currentOrPastDateUI({
        title: 'Date degree was awarded',
        errorMessages: {
          required: 'Please enter your graduation date.',
          futureDate: 'Graduation date cannot be in the future.',
        },
      }),
      institutionCity: textUI({
        title: 'City',
      }),
      institutionStateOrCountry: textUI({
        title: 'State or country',
      }),
    },
  },
};

export const graduateDegreeSchema = {
  type: 'object',
  properties: {
    education: {
      type: 'object',
      properties: {
        graduateDegree: {
          type: 'object',
          required: ['institutionName', 'degreeType', 'fieldOfStudy', 'graduationDate'],
          properties: {
            institutionName: { type: 'string', maxLength: 200, minLength: 1 },
            degreeType: { type: 'string', maxLength: 100 },
            fieldOfStudy: { type: 'string', maxLength: 200 },
            graduationDate: currentOrPastDateSchema,
            institutionCity: { type: 'string', maxLength: 100 },
            institutionStateOrCountry: { type: 'string', maxLength: 100 },
          },
        },
      },
    },
  },
};