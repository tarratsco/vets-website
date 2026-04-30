import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import ConfirmationPage from './ConfirmationPage';
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
      data: {
        veteranInformation: {
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      submission: {
        response: { confirmationNumber: 'BF-20240101-12345678' },
        timestamp: new Date('2024-01-15'),
      },
      ...(overrides.form || {}),
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

const route = { formConfig };

describe('ConfirmationPage', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders the confirmation number', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container.textContent).to.include('BF-20240101-12345678');
  });

  it('includes veteran name in the alert content', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container.textContent).to.include('John Doe');
  });
});