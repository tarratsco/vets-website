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
        veteranInformation: {
          firstName: 'John',
          lastName: 'Doe',
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

describe('ConfirmationPage container', () => {
  it('renders without crashing', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage
          route={{ formConfig }}
        />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a va-alert with success status', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <ConfirmationPage
          route={{ formConfig }}
        />
      </Provider>,
    );
    const alert = container.querySelector('va-alert[status="success"]');
    expect(alert).to.exist;
  });

  it('displays the confirmation number', () => {
    const mockStore = createMockStore();
    const { getByText } = render(
      <Provider store={mockStore}>
        <ConfirmationPage
          route={{ formConfig }}
        />
      </Provider>,
    );
    expect(getByText('1234567890')).to.exist;
  });
});