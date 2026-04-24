import {
  graduateDegreeUiSchema,
  graduateDegreeSchema,
} from '../../pages/graduateDegree';
import {
  postgraduateTrainingUiSchema,
  postgraduateTrainingSchema,
} from '../../pages/postgraduateTraining';

export default {
  title: 'Education & Training',
  pages: {
    graduateDegree: {
      path: 'education/graduate',
      title: 'Graduate degree',
      uiSchema: graduateDegreeUiSchema,
      schema: graduateDegreeSchema,
    },
    postgraduateTraining: {
      path: 'education/postgraduate',
      title: 'Postgraduate training',
      uiSchema: postgraduateTrainingUiSchema,
      schema: postgraduateTrainingSchema,
    },
  },
};