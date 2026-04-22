// src/applications/education/22-1999/config/chapters/benefitChapter.js
import React from 'react';
import VaRadioField from 'platform/forms-system/src/js/web-component-fields/VaRadioField';
import StudentEntitlementDisplay from '../../components/StudentEntitlementDisplay';

const benefitChapterPage = {
  path: 'benefit-chapter',
  title: 'GI Bill chapter selection',
  uiSchema: {
    'ui:title': 'GI Bill chapter selection',
    'ui:description': () => (
      <va-alert status="info" visible class="vads-u-margin-bottom--2">
        <p className="vads-u-margin-top--0">
          Chapter 33 (Post-9/11 GI Bill) requires tuition and fee itemization
          on a later screen. Select the chapter under which this student is
          currently using their benefits.
        </p>
      </va-alert>
    ),
    benefitChapter: {
      chapterSelection: {
        'ui:title': 'Which GI Bill chapter is the student using?',
        'ui:webComponentField': VaRadioField,
        'ui:required': () => true,
        'ui:errorMessages': {
          required: 'Select the GI Bill chapter.',
        },
        'ui:options': {
          labels: {
            chapter33: 'Chapter 33 — Post-9/11 GI Bill',
            chapter30: 'Chapter 30 — Montgomery GI Bill Active Duty (MGIB-AD)',
            chapter35:
              "Chapter 35 — Dependents' Educational Assistance (DEA)",
            chapter1606:
              'Chapter 1606 — Montgomery GI Bill Selected Reserve (MGIB-SR)',
            chapter1607: 'Chapter 1607 — Reserve Educational Assistance Program (REAP)',
            veap: 'VEAP — Veterans Educational Assistance Program',
          },
        },
      },
    },
    studentEntitlementDisplay: {
      'ui:field': StudentEntitlementDisplay,
    },
  },
  schema: {
    type: 'object',
    properties: {
      benefitChapter: {
        type: 'object',
        required: ['chapterSelection'],
        properties: {
          chapterSelection: {
            type: 'string',
            enum: [
              'chapter33',
              'chapter30',
              'chapter35',
              'chapter1606',
              'chapter1607',
              'veap',
            ],
          },
        },
      },
      // Virtual field — display only, not submitted
      studentEntitlementDisplay: {
        type: 'object',
        properties: {},
      },
    },
  },
};

const benefitChapterChapter = {
  title: 'GI Bill chapter',
  pages: {
    benefitChapterPage: benefitChapterPage,
  },
};

export default benefitChapterChapter;