/**
 * @module pages/recordDateRange
 * @description Date range for records requested — required HIPAA element
 */
import {
  radioUI,
  radioSchema,
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const recordDateRangeUiSchema = {
  'ui:title': 'Date range for records',
  'ui:description': () => (
    <va-alert status="info" visible>
      <span slot="headline">Date range is required by HIPAA</span>
      <p>
        Under HIPAA (45 CFR 164.508(c)(1)), a valid authorization must specify
        the period of records being requested. "All records ever" is generally
        not accepted — please specify a meaningful date range.
      </p>
    </va-alert>
  ),
  recordDateRange: {
    rangeType: radioUI({
      title: 'How would you like to specify the date range?',
      labels: {
        specific_dates: 'Specify a date range',
        first_treatment_to_present:
          'From date of first treatment to present',
      },
      errorMessages: {
        required: 'Please select a date range option.',
      },
    }),
    startDate: {
      ...currentOrPastDateUI({
        title: 'Start date',
        hint: 'The beginning of the period for records you are requesting.',
        errorMessages: {
          required: 'Please enter a start date for the records period.',
          pattern: 'Please enter a valid start date.',
        },
      }),
      'ui:options': {
        expandUnder: 'rangeType',
        expandUnderCondition: 'specific_dates',
      },
      'ui:required': formData =>
        formData?.recordDateRange?.rangeType === 'specific_dates',
    },
    endDate: {
      ...currentOrPastDateUI({
        title: 'End date',
        hint:
          'The end of the period for records you are requesting. Must be on or after the start date.',
        errorMessages: {
          required: 'Please enter an end date for the records period.',
          pattern: 'Please enter a valid end date.',
        },
      }),
      'ui:options': {
        expandUnder: 'rangeType',
        expandUnderCondition: 'specific_dates',
      },
      'ui:required': formData =>
        formData?.recordDateRange?.rangeType === 'specific_dates',
    },
  },
};

export const recordDateRangeSchema = {
  type: 'object',
  required: ['recordDateRange'],
  properties: {
    recordDateRange: {
      type: 'object',
      required: ['rangeType'],
      properties: {
        rangeType: radioSchema([
          'specific_dates',
          'first_treatment_to_present',
        ]),
        startDate: currentOrPastDateSchema,
        endDate: currentOrPastDateSchema,
      },
    },
  },
};