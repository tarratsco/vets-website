import {
  radioUI,
  radioSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const programSelectionUiSchema = {
  programSelection: {
    program: radioUI({
      title: 'Which program are you filing this claim under?',
      hint:
        'Select the program that covers the patient (the child with the covered birth defect).',
      labels: {
        'spina-bifida': 'Spina Bifida Health Care Benefits Program',
        cwvv: 'Children of Women Vietnam Veterans (CWVV) Program',
      },
      required: () => true,
      errorMessages: {
        required:
          'Please select the program under which you are filing this claim.',
      },
    }),
  },
};

export const programSelectionSchema = {
  type: 'object',
  required: ['programSelection'],
  properties: {
    programSelection: {
      type: 'object',
      required: ['program'],
      properties: {
        program: radioSchema(['spina-bifida', 'cwvv']),
      },
    },
  },
};