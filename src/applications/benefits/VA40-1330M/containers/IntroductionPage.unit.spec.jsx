import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntroductionPage } from './IntroductionPage';
import formConfig from '../config/form';

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

const defaultRoute = {
  formConfig,
  pageList: [{ path: '/introduction' }],
};

describe('IntroductionPage', () => {
  let scrollToTopStub;
  let focusElementStub;

  beforeEach(() => {
    scrollToTopStub = sinon.stub();
    focusElementStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders the form title', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );

    expect(getByText(/Request a Government Headstone or Marker/i)).to.not.be
      .null;
  });

  it('renders va-omb-info element', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );

    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.not.be.null;
  });

  it('renders a va-alert element', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );

    const alert = container.querySelector('va-alert');
    expect(alert).to.not.be.null;
  });

  it('renders without crashing when userLoggedIn and userIdVerified are provided', () => {
    const store = createMockStore();
    expect(() =>
      render(
        <Provider store={store}>
          <IntroductionPage
            route={defaultRoute}
            userLoggedIn
            userIdVerified
          />
        </Provider>,
      ),
    ).to.not.throw();
  });
});