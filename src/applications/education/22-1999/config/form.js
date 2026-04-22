// src/applications/education/22-1999/config/form.js
import React from 'react';

import { VA_FORM_IDS } from 'platform/forms/constants';
import FormFooter from 'platform/forms/components/FormFooter';
import GetFormHelp from '../components/GetFormHelp';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import prefillTransformer from './prefillTransformer';
import submitTransformer from './submitTransformer';

// Chapter configs
import certifierInfoChapter from './chapters/certifierInfo';
import institutionInfoChapter from './chapters/institutionInfo';
import studentInfoChapter from './chapters/studentInfo';
import benefitChapterChapter from './chapters/benefitChapter';
import programInfoChapter from './chapters/programInfo';
import enrollmentPeriodChapter from './chapters/enrollmentPeriod';
import creditClockHoursChapter from './chapters/creditClockHours';
import tuitionFeesChapter from './chapters/tuitionFees';
import housingAllowanceChapter from './chapters/housingAllowance';
import ojtDetailsChapter from './chapters/ojtDetails';
import amendmentInfoChapter from './chapters/amendmentInfo';
import advancePayChapter from './chapters/advancePay';
import certifierSignatureChapter from './chapters/certifierSignature';

// Full JSON schema
import fullSchema from '../schemas/22-1999-schema.json';

const { definitions } = fullSchema;

const formConfig = {
  rootUrl: '/education/enrollment-certification-22-1999',
  urlPrefix: '/',
  formId: VA_FORM_IDS.FORM_22_1999 || '22-1999',
  version: 0,

  prefillEnabled: true,
  prefillTransformer,

  savedFormMessages: {
    notFound:
      'Please start over to submit your enrollment certification.',
    noAuth:
      'Please sign in again to continue your enrollment certification.',
  },

  saveInProgress: {
    messages: {
      inProgress:
        'Your enrollment certification (22-1999) is in progress. You can return to finish it.',
      expired:
        'Your saved enrollment certification has expired. Please start a new submission.',
      saved: 'Your enrollment certification has been saved.',
    },
  },

  transformForSubmit: submitTransformer,

  trackingPrefix: 'enrollment-certification-22-1999-',

  introduction: IntroductionPage,
  confirmation: ConfirmationPage,

  footerContent: FormFooter,
  getHelp: GetFormHelp,

  defaultDefinitions: definitions,

  title: 'Submit enrollment certification',
  subTitle: 'VA Form 22-1999',

  preSubmitInfo: {
    required: true,
    field: 'privacyAgreementAccepted',
    label:
      'I certify that the information I have provided in this enrollment certification is accurate and complete to the best of my knowledge. I understand that willful submission of false information may result in criminal penalties under 18 U.S.C. § 1001 and removal of VA approval from this institution.',
    error:
      'You must certify that the information is accurate before submitting.',
  },

  chapters: {
    certifierInfo: certifierInfoChapter,
    institutionInfo: institutionInfoChapter,
    studentInfo: studentInfoChapter,
    benefitChapter: benefitChapterChapter,
    programInfo: programInfoChapter,
    enrollmentPeriod: enrollmentPeriodChapter,
    creditClockHours: creditClockHoursChapter,
    tuitionFees: tuitionFeesChapter,
    housingAllowance: housingAllowanceChapter,
    ojtDetails: ojtDetailsChapter,
    amendmentInfo: amendmentInfoChapter,
    advancePay: advancePayChapter,
    certifierSignature: certifierSignatureChapter,
  },
};

export default formConfig;