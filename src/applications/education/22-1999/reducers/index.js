// src/applications/education/22-1999/reducers/index.js
import { createSaveInProgressFormReducer } from 'platform/forms/save-in-progress/reducers';
import formConfig from '../config/form';

const rootReducer = {
  form: createSaveInProgressFormReducer(formConfig),
};

export default rootReducer;