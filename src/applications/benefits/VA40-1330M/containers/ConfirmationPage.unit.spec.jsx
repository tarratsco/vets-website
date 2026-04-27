import { expect } from 'chai';
import React from 'react';
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
        ...((overrides.user || {}).profile || {}),
      },
      ...(overrides.user || {}),
    },
    form: {
      ...createInitialState(formConfig),
      formId: formConfig.formId,
      loadedStatus: 'success',
      savedStatus: '',
      loadedData: { metadata: {} },
      data: {},
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

const mockRoute = { formConfig };

describe('ConfirmationPage', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    expect(container).to.not.be.null;
  });

  it('renders a success alert', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const alert = container.querySelector('va-alert[status="success"]');
    expect(alert).to.not.be.null;
  });

  it('renders a print button', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={mockRoute} />
      </Provider>,
    );
    const button = container.querySelector('va-button');
    expect(button).to.not.be.null;
  });
});