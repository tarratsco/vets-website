/**
 * Lender Certification — date and acknowledgment checkbox
 * Screen 6 of VA Form 26-8923
 */
import React from 'react';
import {
  currentOrPastDateUI,
  currentOrPastDateSchema,
} from 'platform/forms-system/src/js/web-component-patterns';
import { validateLenderCertificationDate } from '../../utils/validators';

export const lenderCertificationUiSchema = {
  lenderCertification: {
    'ui:title': 'Lender certification',
    certificationDate: {
      ...currentOrPastDateUI({
        title: 'Date',
        hint: 'Enter the date the worksheet is being completed.',
        errorMessages: {
          required: 'Date is required.',
          pattern: 'Enter a valid date.',
          futureDate: 'Date cannot be more than 7 days in the future.',
        },
        validations: [validateLenderCertificationDate],
      }),
    },
    certificationAcknowledged: {
      'ui:title': 'Lender certification',
      'ui:widget': 'checkbox',
      'ui:options': {
        label:
          'I certify that I am an officer of the lending institution, that the information entered in this worksheet is accurate to the best of my knowledge, that the maximum loan amount on Line 18 has been rounded down as required, and that this transaction will not result in cash being disbursed to the Veteran.',
      },
      'ui:errorMessages': {
        required:
          'You must certify the accuracy of this worksheet before submitting.',
      },
    },
    fundingFeeExemptionCertified: {
      'ui:title': 'Funding fee exemption certification',
      'ui:widget': 'checkbox',
      'ui:options': {
        label:
          'I certify that the Veteran (or eligible surviving spouse) is exempt from the VA funding fee, and that documentation of this exemption is included in the closing package.',
      },
      'ui:depends': formData =>
        formData?.sectionII?.line7FundingFeePercent === 0,
    },
    'view:wetInkNotice': {
      'ui:description': () => (
        <va-additional-info trigger="About the signature requirement" uswds>
          <p>
            VA Form 26-8923 requires the signature and title of an officer of
            the lender, signed in ink, per the form&apos;s printed signature block.
            This digital tool generates a completed PDF that must be printed and
            signed in ink by an authorized officer before it is included in the
            IRRRL closing package, unless your institution has separate VA
            authorization for electronic signatures. Checking this box does not
            substitute for the required wet-ink signature on the printed form.
          </p>
        </va-additional-info>
      ),
    },
  },
};

export const lenderCertificationSchema = {
  type: 'object',
  properties: {
    lenderCertification: {
      type: 'object',
      required: ['certificationDate', 'certificationAcknowledged'],
      properties: {
        certificationDate: {
          ...currentOrPastDateSchema,
        },
        certificationAcknowledged: {
          type: 'boolean',
        },
        fundingFeeExemptionCertified: {
          type: 'boolean',
        },
        'view:wetInkNotice': {
          type: 'object',
          properties: {},
        },
      },
    },
  },
};