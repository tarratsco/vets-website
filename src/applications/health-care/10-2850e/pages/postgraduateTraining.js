import {
  textUI,
  textSchema,
  selectUI,
  selectSchema,
  radioUI,
  radioSchema,
  textareaUI,
  textareaSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

const trainingTypeOptions = ['internship', 'residency', 'fellowship', 'clinical-practicum', 'other'];
const completionStatusOptions = ['completed', 'in-progress', 'did-not-complete'];

export const postgraduateTrainingUiSchema = {
  postgraduateTraining: {
    'ui:title': 'Postgraduate Training',
    'ui:description':
      'List any residency, fellowship, internship, or other postgraduate training programs you have completed or are currently enrolled in. Leave blank if not applicable.',
    'ui:options': {
      itemName: 'Training program',
      viewField: ({ formData }) =>
        `${formData.trainingType || 'Training'} — ${formData.programName || ''}`,
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
          futureDate: 'Training start date cannot be in the future.',
        },
      }),
      endDate: {
        ...currentOrPastDateUI({
          title: 'Training end date',
          hint:
            'If you are currently in this training program, leave this blank.',
        }),
      },
      completionStatus: radioUI({
        title: 'Did you complete this training program?',
        labels: {
          completed: 'Yes, completed',
          'in-progress': 'Currently in progress',
          'did-not-complete': 'Did not complete',
        },
        errorMessages: { required: 'Please select the completion status.' },
      }),
      nonCompletionExplanation: {
        ...textareaUI({
          title: 'Explain why you did not complete this training program',
          charcount: true,
        }),
        'ui:options': {
          hideIf: (formData, index) => {
            const trainings = formData?.postgraduateTraining;
            if (!trainings || !trainings[index]) return true;
            return trainings[index].completionStatus !== 'did-not-complete';
          },
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
          trainingType: selectSchema(trainingTypeOptions),
          programName: { type: 'string', minLength: 1, maxLength: 200 },
          sponsoringInstitution: { type: 'string', minLength: 1, maxLength: 200 },
          specialty: { type: 'string', maxLength: 200 },
          startDate: currentOrPastDateSchema,
          endDate: currentOrPastDateSchema,
          completionStatus: radioSchema(completionStatusOptions),
          nonCompletionExplanation: { type: 'string', maxLength: 1000 },
        },
      },
    },
  },
};