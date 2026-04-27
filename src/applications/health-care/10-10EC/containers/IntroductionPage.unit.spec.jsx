import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

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

describe('containers/IntroductionPage', () => {
  let scrollToTopStub;
  let focusElementStub;

  beforeEach(() => {
    scrollToTopStub = sinon.stub(uiUtils, 'scrollToTop');
    focusElementStub = sinon.stub(uiUtils, 'focusElement');
  });

  afterEach(() => {
    scrollToTopStub.restore();
    focusElementStub.restore();
  });

  const defaultRoute = {
    formConfig,
    pageList: [{ path: '/introduction' }, { path: '/veteran-information' }],
  };

  it('renders without crashing', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders the form title', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container.textContent).to.include('Apply for extended care services');
  });

  it('renders va-omb-info element', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container.querySelector('va-omb-info')).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(scrollToTopStub.calledOnce).to.be.true;
  });
});