import {
  fileInputMultipleUI,
  fileInputMultipleSchema,
  selectUI,
  selectSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import VaTextInputField from 'platform/forms-system/src/js/web-component-fields/VaTextInputField';

const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png';
const MAX_FILE_SIZE_MB = 25;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const RECEIPT_CATEGORY_LABELS = {
  lodging: 'Lodging',
  meals: 'Meals',
  airline: 'Airline',
  taxi: 'Taxi',
  bus: 'Bus',
  train: 'Train',
  'parking-tolls': 'Parking or tolls',
  other: 'Other',
};

const RECEIPT_CATEGORY_KEYS = Object.keys(RECEIPT_CATEGORY_LABELS);

export const travelMiscellaneousExpensesUiSchema = {
  expenses: {
    'ui:title': 'Patient/Attendant Miscellaneous Expenses (Section III)',
    lodging: {
      'ui:title': 'Lodging expense amount',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Enter the total lodging cost. Attach receipt below.',
        inputmode: 'decimal',
        prefix: '$',
      },
      'ui:errorMessages': {
        required: 'Please enter the lodging amount.',
        pattern: 'Please enter a valid dollar amount greater than $0.00.',
      },
    },
    meals: {
      'ui:title': 'Meals expense amount',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint: 'Enter the total meal costs. Attach receipts below.',
        inputmode: 'decimal',
        prefix: '$',
      },
      'ui:errorMessages': {
        required: 'Please enter the meals amount.',
        pattern: 'Please enter a valid dollar amount greater than $0.00.',
      },
    },
    other: {
      'ui:title': 'Other expenses amount (parking, tolls, etc.)',
      'ui:webComponentField': VaTextInputField,
      'ui:options': {
        hint:
          'Enter the total for parking, tolls, and other incidental expenses. Attach receipts below.',
        inputmode: 'decimal',
        prefix: '$',
      },
      'ui:errorMessages': {
        required: 'Please enter the other expenses amount.',
        pattern: 'Please enter a valid dollar amount greater than $0.00.',
      },
    },
  },
  receipts: fileInputMultipleUI({
    label: 'Upload your receipts',
    hint:
      'Upload receipts for all expenses except POV mileage. You can upload photos (JPG or PNG) or PDF files. Maximum file size: 25 MB per file.',
    required: false,
    allowMultipleFiles: true,
    fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
    maxSize: MAX_FILE_SIZE_BYTES,
    createPayload: (file, _formId, _password) => {
      const payload = new FormData();
      payload.append('file', file);
      payload.append('form_id', '10-7959E');
      return payload;
    },
    parseResponse: (response, file) => ({
      name: file.name,
      confirmationCode: response.data?.attributes?.guid || response.confirmationCode,
      attachmentId: response.data?.attributes?.guid || response.confirmationCode,
      size: file.size,
    }),
    uploadUrl: '/v0/form10_7959e_documents',
    errorMessages: {
      required:
        'Please upload at least one receipt. Receipts are required for all expenses except POV mileage.',
      size: `That file is too large. Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`,
      fileType:
        'That file type is not accepted. Please upload a PDF, JPG, or PNG file.',
    },
  }),
};

export const travelMiscellaneousExpensesSchema = {
  type: 'object',
  properties: {
    expenses: {
      type: 'object',
      properties: {
        lodging: { type: 'number', minimum: 0.01 },
        meals: { type: 'number', minimum: 0.01 },
        other: { type: 'number', minimum: 0.01 },
      },
    },
    receipts: fileInputMultipleSchema(),
  },
};