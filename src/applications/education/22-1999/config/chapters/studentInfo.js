// src/applications/education/22-1999/config/chapters/studentInfo.js
import React from 'react';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';
import VaRadioField from 'platform/forms-system/src/js/web-component-fields/VaRadioField';
import VaMemorableDateField from 'platform/forms-system/src/js/web-component-fields/VaMemorableDateField';

const studentIdTypePage = {
  path: 'student-id-type',
  title: 'Student identification method',
  uiSchema: {
    'ui:title': 'Student identification',
    studentInfo: {
      studentIdType: {
        'ui:title': 'How would you like to identify the student?',
        'ui:webComponentField': VaRadioField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select how you want to identify the student.',
        },
        'ui:options': {
          labels: {
            SSN: 'Social Security Number (SSN)',
            VA_FILE_NUMBER: 'VA File Number',
          },
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      studentInfo: {
        type: 'object',
        required: ['studentIdType'],
        properties: {
          studentIdType: {
            type: 'string',
            enum: ['SSN', 'VA_FILE_NUMBER'],
          },
        },
      },
    },
  },
};

const studentIdentifierPage = {
  path: 'student-identifier',
  title: 'Student identifier',
  uiSchema: {
    'ui:title': 'Student identifier',
    'ui:description': () => (
      <va-alert status="info" visible class="vads-u-margin-bottom--2">
        <p className="vads-u-margin-top--0">
          We'll check VA records using this information. The student must have
          an approved education benefits claim on file.
        </p>
      </va-alert>
    ),
    studentInfo: {
      studentSsn: {
        'ui:title': 'Student Social Security Number',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          inputType: 'text',
          hint: 'Format: XXX-XX-XXXX',
        },
        'ui:required': formData =>
          formData.studentInfo &&
          formData.studentInfo.studentIdType === 'SSN',
        'ui:depends': formData =>
          formData.studentInfo &&
          formData.studentInfo.studentIdType === 'SSN',
        'ui:errorMessages': {
          required: 'Enter the student\'s Social Security Number.',
          pattern: 'Enter a valid SSN in the format XXX-XX-XXXX.',
        },
      },
      studentVaFileNumber: {
        'ui:title': 'Student VA File Number',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint: 'The VA File Number is 7–9 digits, sometimes preceded by the letter C.',
        },
        'ui:required': formData =>
          formData.studentInfo &&
          formData.studentInfo.studentIdType === 'VA_FILE_NUMBER',
        'ui:depends': formData =>
          formData.studentInfo &&
          formData.studentInfo.studentIdType === 'VA_FILE_NUMBER',
        'ui:errorMessages': {
          required: 'Enter the student\'s VA File Number.',
          pattern: 'Enter a valid VA File Number.',
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      studentInfo: {
        type: 'object',
        properties: {
          studentSsn: {
            type: 'string',
            pattern: '^\\d{3}-\\d{2}-\\d{4}$',
          },
          studentVaFileNumber: {
            type: 'string',
            pattern: '^[cC]?\\d{7,9}$',
            minLength: 7,
            maxLength: 10,
          },
        },
      },
    },
  },
};

const studentNameDobPage = {
  path: 'student-name-dob',
  title: 'Student name and date of birth',
  uiSchema: {
    'ui:title': 'Student name and date of birth',
    studentInfo: {
      studentFirstName: {
        'ui:title': 'Student first name',
        'ui:webComponentField': VaTextInputField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the student\'s first name.',
        },
      },
      studentMiddleInitial: {
        'ui:title': 'Student middle initial',
        'ui:webComponentField': VaTextInputField,
        'ui:options': {
          hint: 'Optional',
        },
      },
      studentLastName: {
        'ui:title': 'Student last name',
        'ui:webComponentField': VaTextInputField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the student\'s last name.',
        },
      },
      studentDateOfBirth: {
        'ui:title': 'Student date of birth',
        'ui:webComponentField': VaMemorableDateField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the student\'s date of birth.',
          pattern: 'Enter a valid date of birth.',
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      studentInfo: {
        type: 'object',
        required: ['studentFirstName', 'studentLastName', 'studentDateOfBirth'],
        properties: {
          studentFirstName: { type: 'string', minLength: 1, maxLength: 50 },
          studentMiddleInitial: {
            type: 'string',
            maxLength: 1,
            pattern: '^[A-Za-z]?$',
          },
          studentLastName: { type: 'string', minLength: 1, maxLength: 50 },
          studentDateOfBirth: {
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          },
          mpiLookupComplete: { type: 'boolean' },
          mpiLookupSuccess: { type: 'boolean' },
        },
      },
    },
  },
};

const studentInfoChapter = {
  title: 'Student identification',
  pages: {
    studentIdTypePage: studentIdTypePage,
    studentIdentifierPage: studentIdentifierPage,
    studentNameDobPage: studentNameDobPage,
  },
};

export default studentInfoChapter;