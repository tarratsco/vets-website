import {
  textUI,
  textSchema,
  radioUI,
  radioSchema,
  selectUI,
  selectSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const postgraduateTrainingUiSchema = {
  postgraduateTraining: {
    'ui:title': 'Postgraduate training',
    'ui:description':
      'List all residency, fellowship, internship, and other postgraduate training programs you have completed or are currently enrolled in. If you have no postgraduate training, continue to the next section.',
    'ui:options': {
      itemName: 'Training program',
      viewField: ({ formData }) =>
        `${formData?.trainingType || 'Training'} — ${formData?.programName || ''}`,
    },
    items: {
      trainingType: selectUI({
        title: 'Type of postgraduate training',
        errorMessages: { required: 'Please select the training type.' },
      }),
      programName: textUI({
        title: 'Name of training program',
        errorMessages: { required: 'Please enter the program name.' },
      }),
      sponsoringInstitution: textUI({
        title: 'Name of sponsoring institution or hospital',
        errorMessages: { required: 'Please enter the sponsoring institution.' },
      }),
      specialty: textUI({
        title: 'Specialty or focus area of training',
      }),
      startDate: currentOrPastDateUI({
        title: 'Training start date',
        errorMessages: {
          required: 'Please enter the training start date.',
          futureDate: 'Start date cannot be in the future.',
        },
      }),
      endDate: {
        ...currentOrPastDateUI({
          title: 'Training end date',
          hint: 'If you are currently in this training program, leave this blank.',
        }),
        'ui:required': () => false,
      },
      completionStatus: radioUI({
        title: 'Did you complete this training program?',
        labels: {
          completed: 'Yes, completed',
          'in-progress': 'Currently in progress',
          'did-not-complete': 'Did not complete',
        },
        errorMessages: {
          required: 'Please select the completion status.',
        },
      }),
      nonCompletionExplanation: {
        ...textareaUI({
          title: 'Explain why you did not complete this training program',
          charcount: true,
          errorMessages: {
            required: 'Please explain why you did not complete this program.',
          },
        }),
        'ui:options': {
          hideIf: (formData, index) =>
            formData?.postgraduateTraining?.[index]?.completionStatus !==
            'did-not-complete',
        },
      },
    },
  },
};

export const postgraduateTrainingSchema = {
  type: 'object',
  properties: {
    postgraduateTraining: {
      type: 'array',
      items: {
        type: 'object',
        required: ['trainingType', 'programName', 'sponsoringInstitution', 'startDate', 'completionStatus'],
        properties: {
          trainingType: selectSchema([
            'internship',
            'residency',
            'fellowship',
            'clinical-practicum',
            'other',
          ]),
          programName: { type: 'string', maxLength: 200, minLength: 1 },
          sponsoringInstitution: { type: 'string', maxLength: 200, minLength: 1 },
          specialty: { type: 'string', maxLength: 200 },
          startDate: currentOrPastDateSchema,
          endDate: currentOrPastDateSchema,
          completionStatus: radioSchema(['completed', 'in-progress', 'did-not-complete']),
          nonCompletionExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};