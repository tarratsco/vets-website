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
          lastName: 'Smith',
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

describe('containers/ConfirmationPage', () => {
  const route = { formConfig };

  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders a va-alert or success content', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    const hasAlert =
      container.querySelector('va-alert') !== null ||
      container.innerHTML.includes('submitted');
    expect(hasAlert).to.be.true;
  });

  it('displays the confirmation number when present', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={route} />
      </Provider>,
    );
    expect(container.innerHTML).to.include('1234567890');
  });
});