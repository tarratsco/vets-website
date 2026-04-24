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

const trainingItemUiSchema = {
  trainingType: selectUI({
    title: 'Type of postgraduate training',
    labels: {
      internship: 'Internship',
      residency: 'Residency',
      fellowship: 'Fellowship',
      'clinical-practicum': 'Clinical practicum',
      other: 'Other',
    },
    errorMessages: {
      required: 'Please select the type of postgraduate training.',
    },
  }),
  programName: textUI({
    title: 'Name of training program',
    errorMessages: {
      required: 'Please enter the program name.',
    },
  }),
  sponsoringInstitution: textUI({
    title: 'Name of sponsoring institution or hospital',
    errorMessages: {
      required: 'Please enter the sponsoring institution name.',
    },
  }),
  specialty: textUI({
    title: 'Specialty or focus area of training',
  }),
  startDate: currentOrPastDateUI({
    title: 'Training start date',
    errorMessages: {
      required: 'Please enter a start date.',
    },
  }),
  endDate: currentOrPastDateUI({
    title: 'Training end date',
    hint: 'If you are currently in this training program, leave this blank.',
  }),
  completionStatus: radioUI({
    title: 'Did you complete this training program?',
    labels: {
      completed: 'Yes, completed',
      'in-progress': 'Currently in progress',
      'did-not-complete': 'Did not complete',
    },
    errorMessages: {
      required: 'Please select a completion status.',
    },
  }),
  nonCompletionExplanation: textareaUI({
    title: 'Explain why you did not complete this training program',
    charcount: true,
    'ui:options': {
      hideIf: (formData, index) => {
        const training = formData?.postgraduateTraining;
        if (!training || !training[index]) return true;
        return training[index].completionStatus !== 'did-not-complete';
      },
    },
  }),
};

const trainingItemSchema = {
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
};

export const postgraduateTrainingUiSchema = {
  'ui:title': 'Postgraduate training',
  'ui:description':
    'List any residency, fellowship, internship, or other postgraduate training programs. If none, select Continue.',
  postgraduateTraining: {
    'ui:options': {
      itemName: 'postgraduate training program',
      viewField: TrainingViewField,
      keepInPageOnReview: true,
    },
    items: trainingItemUiSchema,
  },
};

function TrainingViewField({ formData }) {
  return (
    <div>
      <strong>{formData.trainingType}</strong> &mdash; {formData.programName}
    </div>
  );
}

export const postgraduateTrainingSchema = {
  type: 'object',
  properties: {
    postgraduateTraining: {
      type: 'array',
      items: trainingItemSchema,
    },
  },
};