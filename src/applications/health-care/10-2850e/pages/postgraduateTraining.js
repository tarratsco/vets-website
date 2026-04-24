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
      'List all postgraduate training programs (residency, fellowship, internship) you have completed or are currently enrolled in. If you have no postgraduate training, you may leave this section empty and continue.',
    'ui:options': {
      itemName: 'Training program',
      viewField: item =>
        `${item.trainingType || 'Training'} — ${item.programName || ''}`,
      keepInPageOnReview: true,
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
        errorMessages: { required: 'Please select a completion status.' },
      }),
      nonCompletionExplanation: textareaUI({
        title: 'Explain why this training was not completed',
        'ui:options': {
          hideIf: (formData, index) => {
            const training = formData?.postgraduateTraining;
            if (!training || !training[index]) return true;
            return (
              training[index].completionStatus !== 'did-not-complete'
            );
          },
        },
        errorMessages: {
          required: 'Please explain why the training was not completed.',
        },
      }),
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
          trainingType: selectSchema(Object.keys(TRAINING_TYPE_LABELS)),
          programName: { type: 'string', minLength: 1, maxLength: 200 },
          sponsoringInstitution: {
            type: 'string',
            minLength: 1,
            maxLength: 200,
          },
          specialty: { type: 'string', maxLength: 200 },
          startDate: currentOrPastDateSchema,
          endDate: currentOrPastDateSchema,
          completionStatus: radioSchema(
            Object.keys(COMPLETION_STATUS_LABELS),
          ),
          nonCompletionExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};