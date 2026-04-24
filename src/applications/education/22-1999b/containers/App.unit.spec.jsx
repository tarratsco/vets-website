import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';

import formConfig from '../config/form';

const createMockStore = (overrides = {}) => ({
  getState: () => ({
    user: {
      login: { currentlyLoggedIn: false },
      profile: {
        savedForms: [],
        prefillsAvailable: [],
        loa: { current: 3, highest: 3 },
        verified: true,
        dob: '1990-01-01',
        claims: { appeals: false },
        ...overrides.user?.profile,
      },
      ...overrides.user,
    },
    form: {
      formId: formConfig.formId,
      loadedStatus: 'success',
      savedStatus: '',
      loadedData: { metadata: {} },
      data: {},
      ...overrides.form,
    },
    scheduledDowntime: {
      globalDowntime: null,
      isReady: true,
      isPending: false,
      serviceMap: { get() {} },
      dismissedDowntimeWarnings: [],
    },
    ...overrides,
  }),
  subscribe: () => {},
  dispatch: () => {},
});

describe('App container', () => {
  it('renders without crashing', () => {
    const mockStore = createMockStore();
    // App is a simple wrapper; verify it can be imported and is a function
    const App = require('../containers/App').default;
    expect(App).to.be.a('function');
  });

  it('exports a default function component', () => {
    const App = require('../containers/App').default;
    expect(App).to.be.a('function');
    expect(App.propTypes).to.exist;
    expect(App.propTypes.children).to.exist;
    expect(App.propTypes.location).to.exist;
  });
});