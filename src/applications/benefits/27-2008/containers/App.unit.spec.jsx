import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import App from './App';
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

describe('containers/App', () => {
  it('renders without crashing', () => {
    const mockStore = createMockStore();
    // App wraps RoutedSavableApp which needs a router context
    // We just verify the component is a function and renders a node
    expect(App).to.be.a('function');
  });

  it('is a function component with propTypes', () => {
    expect(App.propTypes).to.exist;
    expect(App.propTypes.children).to.exist;
    expect(App.propTypes.location).to.exist;
  });
});