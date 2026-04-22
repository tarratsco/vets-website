// src/applications/education/22-1999/config/chapters/tuitionFees.js
import React from 'react';
import VaNumberInputField from 'platform/forms-system/src/js/web-component-fields/VaNumberInputField';
import VaRadioField from 'platform/forms-system/src/js/web-component-fields/VaRadioField';
import VaTextareaField from 'platform/forms-system/src/js/web-component-fields/VaTextareaField';
import VaCheckboxGroupField from 'platform/forms-system/src/js/web-component-fields/VaCheckboxGroupField';

const tuitionFeesPage = {
  path: 'tuition-fees',
  title: 'Tuition and fees',
  depends: formData =>
    formData.benefitChapter &&
    formData.benefitChapter.chapterSelection === 'chapter33',
  uiSchema: {
    'ui:title': 'Tuition and fees',
    'ui:description': () => (
      <va-alert status="info" visible class="vads-u-margin-bottom--2">
        <p className="vads-u-margin-top--0">
          VA will pay the lesser of your certified tuition and fees or the
          applicable academic year cap. Caps vary for public in-state, public
          out-of-state, and private or foreign schools. Refer to the current
          VA Chapter 33 rate tables.
        </p>
      </va-alert>
    ),
    tuitionFees: {
      tuitionCharges: {
        'ui:title': 'Total tuition charges',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'Enter the total tuition charges for this enrollment period.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the total tuition charges.',
        },
        'ui:options': {
          currency: true,
        },
      },
      tuitionRateType: {
        'ui:title': 'Tuition rate type',
        'ui:webComponentField': VaRadioField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select whether tuition is in-state or out-of-state.',
        },
        'ui:options': {
          labels: {
            IN_STATE: 'In-state tuition rate',
            OUT_OF_STATE: 'Out-of-state tuition rate',
          },
        },
      },
      mandatoryFees: {
        'ui:title': 'Total mandatory fees',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'Enter the total of all mandatory institutional fees.',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the total mandatory fees.',
        },
        'ui:options': {
          currency: true,
        },
      },
      feeDescription: {
        'ui:title': 'Fee description',
        'ui:webComponentField': VaTextareaField,
        'ui:description':
          'List each mandatory fee by name and amount. Example: "Student Activity Fee $150, Technology Fee $75, Health Services Fee $200".',
        'ui:options': {
          maxlength: 1000,
        },
      },
      yellowRibbonContribution: {
        'ui:title': 'Yellow Ribbon Program contribution from institution',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'Enter 0 if your institution is not participating in the Yellow Ribbon Program for this student.',
        'ui:options': {
          currency: true,
        },
      },
      'view:yellowRibbonWarning': {
        'ui:description': formData =>
          formData.tuitionFees &&
          formData.tuitionFees.yellowRibbonContribution > 0 ? (
            <va-alert
              status="warning"
              visible
              class="vads-u-margin-bottom--2"
            >
              <p className="vads-u-margin-top--0">
                The Yellow Ribbon contribution may not exceed your
                institution's signed Yellow Ribbon agreement amount for this
                academic year. Verify the amount before submitting.
              </p>
            </va-alert>
          ) : null,
      },
      totalTuitionAndFeesCertified: {
        'ui:title': 'Total tuition and fees being certified',
        'ui:webComponentField': VaNumberInputField,
        'ui:description':
          'Enter the total amount being certified to VA for payment (tuition + mandatory fees, minus any applicable exclusions).',
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Enter the total tuition and fees being certified.',
        },
        'ui:options': {
          currency: true,
        },
      },
      feeExclusions: {
        'ui:title': 'Fee calculation flags (select all that apply)',
        'ui:webComponentField': VaCheckboxGroupField,
        'ui:options': {
          labels: {
            TUITION_ONLY: 'Certifying tuition only (fees not included)',
            FEES_INCLUDED: 'Fees included in total',
            YELLOW_RIBBON_APPLIED: 'Yellow Ribbon contribution applied',
          },
        },
      },
    },
  },
  schema: {
    type: 'object',
    properties: {
      tuitionFees: {
        type: 'object',
        required: [
          'tuitionCharges',
          'tuitionRateType',
          'mandatoryFees',
          'totalTuitionAndFeesCertified',
        ],
        properties: {
          tuitionCharges: { type: 'number', minimum: 0, maximum: 999999.99 },
          tuitionRateType: {
            type: 'string',
            enum: ['IN_STATE', 'OUT_OF_STATE'],
          },
          mandatoryFees: { type: 'number', minimum: 0, maximum: 999999.99 },
          feeDescription: { type: 'string', maxLength: 1000 },
          yellowRibbonContribution: {
            type: 'number',
            minimum: 0,
            maximum: 999999.99,
          },
          totalTuitionAndFeesCertified: {
            type: 'number',
            minimum: 0,
            maximum: 999999.99,
          },
          feeExclusions: {
            type: 'array',
            uniqueItems: true,
            items: {
              type: 'string',
              enum: ['TUITION_ONLY', 'FEES_INCLUDED', 'YELLOW_RIBBON_APPLIED'],
            },
          },
        },
      },
      'view:yellowRibbonWarning': {
        type: 'object',
        properties: {},
      },
    },
  },
};

const tuitionFeesChapter = {
  title: 'Tuition and fees',
  pages: {
    tuitionFeesPage: tuitionFeesPage,
  },
};

export default tuitionFeesChapter;