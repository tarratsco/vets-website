import {
  employmentHistoryUiSchema,
  employmentHistorySchema,
} from '../../pages/employmentHistory';
import {
  employmentGapUiSchema,
  employmentGapSchema,
} from '../../pages/employmentGap';
import {
  professionalReferencesUiSchema,
  professionalReferencesSchema,
} from '../../pages/professionalReferences';

export default {
  title: 'Employment History',
  pages: {
    employmentHistory: {
      path: 'employment-history',
      title: 'Employment history',
      uiSchema: employmentHistoryUiSchema,
      schema: employmentHistorySchema,
    },

    employmentGap: {
      path: 'employment-gap-explanation',
      title: 'Employment gap explanation',
      uiSchema: employmentGapUiSchema,
      schema: employmentGapSchema,
    },
    professionalReferences: {
      path: 'professional-references',
      title: 'Professional references',
      uiSchema: professionalReferencesUiSchema,
      schema: professionalReferencesSchema,
    },
  },
};