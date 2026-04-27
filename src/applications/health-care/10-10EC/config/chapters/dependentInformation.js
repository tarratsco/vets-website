import {
  textUI,
  textSchema,
  ssnUI,
  ssnSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
  arrayBuilderPages,
  arrayBuilderItemFirstPageTitleUI,
  arrayBuilderYesNoSchema,
  arrayBuilderYesNoUI,
} from 'platform/forms-system/src/js/web-component-patterns';

const dependentOptions = {
  arrayPath: 'dependents',
  nounSingular: 'dependent',
  nounPlural: 'dependents',
  required: false,
  isItemIncomplete: item =>
    !item?.fullName?.first ||
    !item?.fullName?.last ||
    !item?.ssn ||
    !item?.dateOfBirth,
  text: {
    getItemName: item =>
      item?.fullName
        ? `${item.fullName.first || ''} ${item.fullName.last || ''}`.trim()
        : 'Unnamed dependent',
  },
};

export const dependentInformationUiSchema = {
  'view:hasDependent': arrayBuilderYesNoUI(
    dependentOptions,
    {
      title: 'Do you have any dependent children?',
      labels: {
        Y: 'Yes, I have dependent children',
        N: 'No, I do not have dependent children',
      },
      hint: 'A dependent child is one for whom you are responsible.',
    },
    {
      title: 'Do you have any more dependent children to add?',
      labels: {
        Y: 'Yes, I have another dependent to add',
        N: 'No, I have no more dependents to add',
      },
    },
  ),
  dependents: {
    items: {
      'ui:title': arrayBuilderItemFirstPageTitleUI({
        title: 'Dependent information',
        nounSingular: 'dependent',
      }),
      fullName: {
        first: textUI({
          title: "Dependent's first name",
          required: () => true,
          errorMessages: {
            required: "Please enter this dependent's first name",
          },
        }),
        middle: textUI({
          title: "Dependent's middle initial",
          required: () => false,
        }),
        last: textUI({
          title: "Dependent's last name",
          required: () => true,
          errorMessages: {
            required: "Please enter this dependent's last name",
          },
        }),
      },
      ssn: ssnUI({
        title: "Dependent's Social Security number",
        required: () => true,
        errorMessages: {
          required: "Please enter this dependent's Social Security number",
        },
      }),
      dateOfBirth: currentOrPastDateUI({
        title: "Dependent's date of birth",
        required: () => true,
        errorMessages: {
          required: "Please enter this dependent's date of birth",
        },
      }),
    },
  },
};

export const dependentInformationSchema = {
  type: 'object',
  properties: {
    'view:hasDependent': arrayBuilderYesNoSchema,
    dependents: {
      type: 'array',
      minItems: 0,
      maxItems: 50,
      items: {
        type: 'object',
        required: ['fullName', 'ssn', 'dateOfBirth'],
        properties: {
          fullName: {
            type: 'object',
            required: ['first', 'last'],
            properties: {
              first: { ...textSchema, minLength: 1, maxLength: 35 },
              middle: { type: 'string', maxLength: 1 },
              last: { ...textSchema, minLength: 1, maxLength: 35 },
            },
          },
          ssn: ssnSchema,
          dateOfBirth: currentOrPastDateSchema,
        },
      },
    },
  },
};