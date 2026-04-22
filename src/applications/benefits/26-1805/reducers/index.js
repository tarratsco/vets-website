import { createSaveInProgressFormReducer } from 'platform/forms/save-in-progress/reducers';
import formConfig from '../config/form';

const reducers = {
  form: createSaveInProgressFormReducer(formConfig),
};

export default reducers;