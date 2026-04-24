import {
  employmentHistoryUiSchema,
  employmentHistorySchema,
} from '../../pages/employmentHistory';
import {
  employmentGapsUiSchema,
  employmentGapsSchema,
} from '../../pages/employmentGaps';
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
    employmentGaps: {
      path: 'employment-gaps',
      title: 'Employment gap explanations',
      uiSchema: employmentGapsUiSchema,
      schema: employmentGapsSchema,
    },
    professionalReferences: {
      path: 'professional-references',
      title: 'Professional references',
      uiSchema: professionalReferencesUiSchema,
      schema: professionalReferencesSchema,
    },
  },
};