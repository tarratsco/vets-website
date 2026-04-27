import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createInitialState } from '@department-of-veterans-affairs/platform-forms-system/state/helpers';
import { ConfirmationPage } from './ConfirmationPage';
import formConfig from '../config/form';

const createMockStore = (overrides = {}) => ({
  getState: () => ({
    user: {
      login: { currentlyLoggedIn: true },
      profile: {
        savedForms: [],
        prefillsAvailable: [],
        loa: { current: 3, highest: 3 },
        verified: true,
        dob: '1990-01-01',
        claims: { appeals: false },
        ...(overrides.user?.profile || {}),
      },
      ...(overrides.user || {}),
    },
    form: {
      formId: formConfig.formId,
      loadedStatus: 'success',
      savedStatus: '',
      loadedData: { metadata: {} },
      data: {
        applicant: {
          name: { first: 'Jane', last: 'Doe' },
        },
      },
      submission: {
        response: { confirmationNumber: '1234567890' },
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

describe('ConfirmationPage', () => {
  const mockRoute = {
    formConfig,
  };

  it('renders without crashing', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a success alert', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const alert = container.querySelector('va-alert[status="success"]');
    expect(alert).to.exist;
  });

  it('renders a print button or action element', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const buttons = container.querySelectorAll('va-button');
    expect(buttons.length).to.be.greaterThan(0);
  });
});