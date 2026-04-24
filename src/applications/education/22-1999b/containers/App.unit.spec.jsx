import React from 'react';
import { expect } from 'chai';
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
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <App location={{ pathname: '/introduction' }}>
          <div data-testid="child-content">child</div>
        </App>
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders children when provided', () => {
    const store = createMockStore();
    const { getByTestId } = render(
      <Provider store={store}>
        <App location={{ pathname: '/introduction' }}>
          <div data-testid="test-child">Test Child</div>
        </App>
      </Provider>,
    );
    expect(getByTestId('test-child')).to.exist;
  });
});