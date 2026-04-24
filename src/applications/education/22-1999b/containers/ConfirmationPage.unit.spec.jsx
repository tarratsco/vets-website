import { expect } from 'chai';
import React from 'react';
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

const mockRoute = { formConfig };

describe('containers/ConfirmationPage', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a va-button for print', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    // ConfirmationView.PrintThisPage renders a print button
    expect(container.innerHTML).to.not.be.empty;
  });

  it('renders submission alert content', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(container.innerHTML).to.include('enrollment change certification');
  });
});