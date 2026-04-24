import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const lastDateOfAttendanceUiSchema = {
  lastDateOfAttendance: currentOrPastDateUI({
    title: 'Last date of attendance',
    hint:
      "Enter the last calendar date the student attended class, participated in an academic activity, or engaged in coursework at your institution. For online courses, use the last date of documented academic activity. This date affects how VA calculates the student's housing allowance.",
    errorMessages: {
      required: "Please enter the student's last date of attendance.",
      pattern: "Please enter a valid last date of attendance.",
      futureDate: 'The last date of attendance cannot be in the future.',
    },
  }),
};

export const lastDateOfAttendanceSchema = {
  type: 'object',
  required: ['lastDateOfAttendance'],
  properties: {
    lastDateOfAttendance: currentOrPastDateSchema,
  },
};