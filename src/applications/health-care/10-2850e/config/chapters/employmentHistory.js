import {
  employmentHistoryUiSchema,
  employmentHistorySchema,
} from '../../pages/employmentHistoryPage';
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
    professionalReferences: {
      path: 'professional-references',
      title: 'Professional references',
      uiSchema: professionalReferencesUiSchema,
      schema: professionalReferencesSchema,
    },
  },
};