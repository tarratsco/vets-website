import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import * as uiUtils from 'platform/utilities/ui';
import formConfig from '../config/form';
import { IntroductionPage } from './IntroductionPage';

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
  pageList: [{ path: '/introduction' }, { path: '/eligibility-screener' }],
};

describe('IntroductionPage', () => {
  let scrollStub;
  let focusStub;

  beforeEach(() => {
    scrollStub = sinon.stub(uiUtils, 'scrollToTop');
    focusStub = sinon.stub(uiUtils, 'focusElement');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders without crashing', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn={false}
          userIdVerified={false}
        />
      </Provider>,
    );

    expect(container).to.exist;
  });

  it('renders the form title', () => {
    const store = createMockStore();

    const { getByText } = render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn={false}
          userIdVerified={false}
        />
      </Provider>,
    );

    expect(getByText('Request a Government Headstone or Marker')).to.exist;
  });

  it('renders va-omb-info component', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn={false}
          userIdVerified={false}
        />
      </Provider>,
    );

    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn={false}
          userIdVerified={false}
        />
      </Provider>,
    );

    expect(scrollStub.calledOnce).to.be.true;
  });

  it('renders identity warning when logged in but not verified', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn
          userIdVerified={false}
        />
      </Provider>,
    );

    const alerts = container.querySelectorAll('va-alert');
    expect(alerts.length).to.be.greaterThan(0);
  });

  it('does not render identity warning when verified', () => {
    const store = createMockStore();

    const { queryByText } = render(
      <Provider store={store}>
        <IntroductionPage
          route={mockRoute}
          userLoggedIn
          userIdVerified
        />
      </Provider>,
    );

    expect(
      queryByText('Verify your identity to save your progress'),
    ).to.be.null;
  });
});