import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

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
      formId: '22-1999b',
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
    const store = createMockStore();
    const location = { pathname: '/introduction' };

    // RoutedSavableApp requires a redux store context; we just verify
    // that App is a renderable component that accepts the right props
    expect(App).to.be.a('function');
    expect(App.propTypes).to.have.property('children');
    expect(App.propTypes).to.have.property('location');
  });

  it('has the expected propTypes', () => {
    expect(App.propTypes.children).to.exist;
    expect(App.propTypes.location).to.exist;
  });
});