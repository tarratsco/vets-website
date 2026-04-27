import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { createInitialState } from '@department-of-veterans-affairs/platform-forms-system/state/helpers';
import formConfig from '../config/form';
import { ConfirmationPage } from './ConfirmationPage';

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
        applicant: {
          name: { first: 'Jane', last: 'Doe' },
        },
        decedent: {
          name: { first: 'John', last: 'Smith' },
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

const mockRoute = {
  formConfig,
  pageList: [],
};

describe('ConfirmationPage', () => {
  it('renders without crashing', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );

    expect(container).to.exist;
  });

  it('renders a success va-alert', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );

    const successAlert = container.querySelector('va-alert[status="success"]');
    expect(successAlert).to.exist;
  });

  it('renders a print button', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );

    const button = container.querySelector('va-button');
    expect(button).to.exist;
  });

  it('renders submission alert title', () => {
    const store = createMockStore();

    const { getByText } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );

    expect(
      getByText('Your headstone or marker request has been submitted'),
    ).to.exist;
  });
});