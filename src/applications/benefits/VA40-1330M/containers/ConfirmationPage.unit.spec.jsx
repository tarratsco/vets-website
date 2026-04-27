import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
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
        ...((overrides.user || {}).profile || {}),
      },
      ...(overrides.user || {}),
    },
    form: {
      formId: formConfig.formId,
      loadedStatus: 'success',
      savedStatus: '',
      loadedData: { metadata: {} },
      data: {},
      submission: {
        response: {
          confirmationNumber: '1234567890',
        },
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

const defaultRoute = { formConfig };

describe('ConfirmationPage', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    expect(() =>
      render(
        <Provider store={store}>
          <ConfirmationPage route={defaultRoute} />
        </Provider>,
      ),
    ).to.not.throw();
  });

  it('renders a va-alert element', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );

    const alert = container.querySelector('va-alert');
    expect(alert).to.not.be.null;
  });

  it('renders a va-button or print button', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );

    const buttons = container.querySelectorAll('va-button, button');
    expect(buttons.length).to.be.greaterThan(0);
  });

  it('renders confirmation number when provided', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <ConfirmationPage route={defaultRoute} />
      </Provider>,
    );

    // Confirmation number should appear somewhere in the output
    expect(getByText(/1234567890/)).to.not.be.null;
  });

  it('handles missing confirmation number gracefully', () => {
    const store = createMockStore({
      form: {
        formId: formConfig.formId,
        loadedStatus: 'success',
        savedStatus: '',
        loadedData: { metadata: {} },
        data: {},
        submission: {
          response: {},
          timestamp: new Date('2024-01-15'),
        },
      },
    });

    expect(() =>
      render(
        <Provider store={store}>
          <ConfirmationPage route={defaultRoute} />
        </Provider>,
      ),
    ).to.not.throw();
  });
});