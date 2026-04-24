import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  textareaUI,
  textareaSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const TRAINING_TYPE_LABELS = {
  internship: 'Internship',
  residency: 'Residency',
  fellowship: 'Fellowship',
  'clinical-practicum': 'Clinical practicum',
  other: 'Other',
};

const COMPLETION_STATUS_LABELS = {
  completed: 'Yes, completed',
  'in-progress': 'Currently in progress',
  'did-not-complete': 'Did not complete',
};

export const postgraduateTrainingUiSchema = {
  postgraduateTraining: {
    'ui:title': 'Postgraduate training',
    'ui:description':
      'List all residencies, fellowships, internships, and other postgraduate training programs. If you have no postgraduate training, select Continue to proceed.',
    'ui:options': {
      itemName: 'Training program',
      viewField: ({ formData }) =>
        `${formData.trainingType || 'Training'} — ${formData.programName || ''}`,
    },
    items: {
      trainingType: selectUI({
        title: 'Type of postgraduate training',
        labels: TRAINING_TYPE_LABELS,
        errorMessages: { required: 'Please select the training type.' },
      }),
      programName: textUI({
        title: 'Name of training program',
        errorMessages: { required: 'Please enter the program name.' },
      }),
      sponsoringInstitution: textUI({
        title: 'Name of sponsoring institution or hospital',
        errorMessages: {
          required: 'Please enter the sponsoring institution.',
        },
      }),
      specialty: textUI({
        title: 'Specialty or focus area of training',
        errorMessages: { required: 'Please enter the specialty.' },
      }),
      startDate: currentOrPastDateUI({
        title: 'Training start date',
        errorMessages: {
          required: 'Please enter the training start date.',
          futureDate: 'Start date cannot be in the future.',
        },
      }),
      endDate: currentOrPastDateUI({
        title: 'Training end date',
        hint: 'If you are currently in this training program, leave this blank.',
      }),
      completionStatus: radioUI({
        title: 'Did you complete this training program?',
        labels: COMPLETION_STATUS_LABELS,
        errorMessages: {
          required: 'Please indicate whether you completed this program.',
        },
      }),
      nonCompletionExplanation: {
        ...textareaUI({
          title: 'Explain why you did not complete this program',
          charcount: true,
          errorMessages: {
            required: 'Please explain why you did not complete this program.',
          },
        }),
        'ui:options': {
          hideIf: formData =>
            !formData || formData.completionStatus !== 'did-not-complete',
          expandUnder: 'completionStatus',
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
        required: [
          'trainingType',
          'programName',
          'sponsoringInstitution',
          'startDate',
          'completionStatus',
        ],
        properties: {
          trainingType: selectSchema(
            Object.keys(TRAINING_TYPE_LABELS),
          ),
          programName: { type: 'string', maxLength: 200 },
          sponsoringInstitution: { type: 'string', maxLength: 200 },
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