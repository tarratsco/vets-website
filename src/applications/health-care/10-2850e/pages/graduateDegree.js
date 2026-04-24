import {
  textUI,
  textSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const graduateDegreeUiSchema = {
  education: {
    'ui:title': 'Graduate or professional degree',
    graduateDegree: {
      'ui:title': 'Degree information',
      institutionName: textUI({
        title: 'Name of school or institution',
        errorMessages: {
          required: 'Please enter the name of the institution.',
        },
      }),
      degreeType: textUI({
        title: 'Degree earned',
        hint:
          'Enter the degree type (e.g., BSN, MSN, DNP, PhD in Nursing, MS-CRNA).',
        errorMessages: {
          required: 'Please enter the degree type.',
        },
      }),
      fieldOfStudy: textUI({
        title: 'Field of study or major',
        errorMessages: {
          required: 'Please enter your field of study.',
        },
      }),
      graduationDate: currentOrPastDateUI({
        title: 'Date degree was awarded',
        errorMessages: {
          required: 'Please enter your graduation date.',
          futureDate: 'Graduation date must be in the past.',
        },
      }),
      institutionCity: textUI({
        title: 'City',
      }),
      institutionStateOrCountry: textUI({
        title: 'State or country',
        hint: 'Enter the 2-letter state abbreviation or full country name.',
      }),
    },
  },
};

export const graduateDegreeSchema = {
  type: 'object',
  required: ['education'],
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