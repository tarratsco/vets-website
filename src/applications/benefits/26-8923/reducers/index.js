import { createSaveInProgressInitialState } from 'platform/forms/save-in-progress/reducers';
import formConfig from '../config/form';

const initialState = createSaveInProgressInitialState(formConfig);

function formReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default {
  form: formReducer,
};