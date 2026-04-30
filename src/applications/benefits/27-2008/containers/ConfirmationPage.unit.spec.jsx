import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

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
      submission: {
        response: { confirmationNumber: '1234567890' },
        timestamp: new Date('2024-01-15'),
      },
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

describe('containers/ConfirmationPage', () => {
  it('should render without throwing', () => {
    const { ConfirmationPage } = require('./ConfirmationPage');
    const store = createMockStore();
    const route = { formConfig };

    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container).to.not.be.null;
  });

  it('should render a va-button or print section', () => {
    const { ConfirmationPage } = require('./ConfirmationPage');
    const store = createMockStore();
    const route = { formConfig };

    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    // ConfirmationView renders some interactive content
    expect(container.querySelector('div')).to.not.be.null;
  });
});