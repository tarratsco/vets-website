// src/applications/education/22-1999/app-entry.jsx
import 'platform/polyfills';
import './sass/enrollment-certification-22-1999.scss';

import startApp from 'platform/startup';
import routes from './routes';
import reducer from './reducers';
import manifest from './manifest.json';

startApp({
  url: manifest.rootUrl,
  reducer,
  routes,
  entryName: manifest.entryName,
});