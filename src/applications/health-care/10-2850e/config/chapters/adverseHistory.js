import {
  adverseLicensureUiSchema,
  adverseLicensureSchema,
} from '../../pages/adverseLicensure';
import {
  malpracticeHistoryUiSchema,
  malpracticeHistorySchema,
} from '../../pages/malpracticeHistory';
import {
  clinicalPrivilegesUiSchema,
  clinicalPrivilegesSchema,
} from '../../pages/clinicalPrivileges';
import { deaAdverseUiSchema, deaAdverseSchema } from '../../pages/deaAdverse';
import {
  criminalHistoryUiSchema,
  criminalHistorySchema,
} from '../../pages/criminalHistory';
import {
  federalExclusionUiSchema,
  federalExclusionSchema,
} from '../../pages/federalExclusion';

export default {
  title: 'Adverse History Disclosure',
  pages: {
    adverseLicensure: {
      path: 'adverse-history-licensure',
      title: 'Adverse licensure actions',
      uiSchema: adverseLicensureUiSchema,
      schema: adverseLicensureSchema,
    },
    malpracticeHistory: {
      path: 'adverse-history-malpractice',
      title: 'Malpractice history',
      uiSchema: malpracticeHistoryUiSchema,
      schema: malpracticeHistorySchema,
    },
    clinicalPrivileges: {
      path: 'adverse-history-clinical-privileges',
      title: 'Clinical privileges',
      uiSchema: clinicalPrivilegesUiSchema,
      schema: clinicalPrivilegesSchema,
    },
    deaAdverse: {
      path: 'adverse-history-dea',
      title: 'DEA adverse actions',
      uiSchema: deaAdverseUiSchema,
      schema: deaAdverseSchema,
    },
    criminalHistory: {
      path: 'adverse-history-criminal',
      title: 'Criminal history',
      uiSchema: criminalHistoryUiSchema,
      schema: criminalHistorySchema,
    },
    federalExclusion: {
      path: 'adverse-history-federal-exclusion',
      title: 'Federal exclusion',
      uiSchema: federalExclusionUiSchema,
      schema: federalExclusionSchema,
    },
  },
};