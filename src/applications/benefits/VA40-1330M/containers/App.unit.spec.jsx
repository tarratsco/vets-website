import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import formConfig from '../config/form';
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
        ...((overrides.user || {}).profile || {}),
      },
      ...(overrides.user || {}),
    },
    form: {
      formId: formConfig.formId,
      loadedStatus: 'success',
      savedStatus: '',
      loadedData: { metadata: {} },
      data: {},
      ...(overrides.form || {}),
    },
    scheduledDowntime: {
      globalDowntime: null,
      isReady: true,
      isPending: false,
      serviceMap: { get() {} },
      dismissedDowntimeWarnings: [],
      ...(overrides.scheduledDowntime || {}),
    },
    ...overrides,
  }),
  subscribe: () => {},
  dispatch: () => {},
});

describe('App container', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    const location = { pathname: '/introduction' };
    const { container } = render(
      <Provider store={store}>
        <App location={location}>
          <div>child content</div>
        </App>
      </Provider>,
    );
    expect(container).to.not.be.null;
  });

  it('renders children', () => {
    const store = createMockStore();
    const location = { pathname: '/introduction' };
    const { getByText } = render(
      <Provider store={store}>
        <App location={location}>
          <div>test child</div>
        </App>
      </Provider>,
    );
    expect(getByText('test child')).to.exist;
  });
});