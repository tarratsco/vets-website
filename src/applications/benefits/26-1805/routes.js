import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import App from './containers/App';

const routes = createRoutesWithSaveInProgress(formConfig, App);

export default routes;