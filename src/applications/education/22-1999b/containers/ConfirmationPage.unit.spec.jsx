import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createInitialState } from '@department-of-veterans-affairs/platform-forms-system/state/helpers';

import formConfig from '../config/form';
import { ConfirmationPage } from '../containers/ConfirmationPage';

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
      data: {
        studentFirstName: 'James',
        studentLastName: 'Nguyen',
        typeOfChange: 'full_termination',
        effectiveDateOfChange: '2025-01-15',
      },
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

describe('ConfirmationPage', () => {
  const defaultRoute = { formConfig };

  it('renders without crashing', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a va-alert with success status', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );
    const alerts = container.querySelectorAll('va-alert');
    expect(alerts.length).to.be.greaterThan(0);
  });

  it('renders a print button or similar action element', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );
    // va-button or button should exist from PrintThisPage
    const buttons = container.querySelectorAll('va-button, button');
    expect(buttons.length).to.be.greaterThan(0);
  });
});