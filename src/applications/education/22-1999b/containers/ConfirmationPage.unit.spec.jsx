import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import formConfig from '../config/form';
import { ConfirmationPage } from './ConfirmationPage';

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
        studentAndPriorCertification: {
          studentFirstName: 'James',
          studentLastName: 'Nguyen',
        },
        enrollmentChangeDetails: {
          typeOfChange: 'full_termination',
          effectiveDateOfChange: '2025-01-15',
        },
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
  const mockRoute = { formConfig };

  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a va-alert with success status', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const alert = container.querySelector('va-alert[status="success"]');
    expect(alert).to.exist;
  });

  it('displays the confirmation number', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(getByText(/1234567890/)).to.exist;
  });

  it('renders the print button', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const button = container.querySelector('va-button');
    expect(button).to.exist;
  });

  it('displays student name in summary', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(getByText(/James/)).to.exist;
    expect(getByText(/Nguyen/)).to.exist;
  });
});