import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
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
      ...((overrides.form) || {}),
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
    const store = createMockStore();
    const location = { pathname: '/introduction', search: '', hash: '' };

    // RoutedSavableApp requires router context; we just confirm it mounts
    const { container } = render(
      <Provider store={store}>
        <App location={location}>
          <div id="test-child">child</div>
        </App>
      </Provider>,
    );

    expect(container).to.not.be.null;
  });

  it('passes children through', () => {
    const store = createMockStore();
    const location = { pathname: '/introduction', search: '', hash: '' };

    const { getByText } = render(
      <Provider store={store}>
        <App location={location}>
          <span>hello world</span>
        </App>
      </Provider>,
    );

    expect(getByText('hello world')).to.not.be.null;
  });
});