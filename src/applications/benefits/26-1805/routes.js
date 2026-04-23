import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import App from './containers/App';

// Standard VA.gov form route tree:
//   /                 → App (renders RoutedSavableApp → FormApp grid wrapper)
//   indexRoute        → redirect bare rootUrl to /introduction
//   childRoutes       → generated from formConfig by createRoutesWithSaveInProgress
// Without `component: App`, FormApp never runs and content spans full viewport.
// Without `indexRoute`, the bare rootUrl falls through to the `*` wildcard and
// infinite-redirects back to itself.
const route = {
  path: '/',
  component: App,
  indexRoute: { onEnter: (_nextState, replace) => replace('/introduction') },
  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default route;
