import { expect } from 'chai';
import React from 'react';
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

describe('IntroductionPage', () => {
  let scrollToTopStub;
  let focusElementStub;

  beforeEach(() => {
    scrollToTopStub = sinon.stub(uiUtils, 'scrollToTop');
    focusElementStub = sinon.stub(uiUtils, 'focusElement');
  });

  afterEach(() => {
    sinon.restore();
  });

  const defaultRoute = {
    formConfig: {
      prefillEnabled: true,
      saveInProgress: {
        messages: {
          inProgress: 'Your form is in progress.',
          expired: 'Your saved form has expired.',
          saved: 'Your form has been saved.',
        },
      },
    },
    pageList: [{ path: '/introduction' }],
  };

  it('renders the form title', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container.querySelector('article')).to.not.be.null;
  });

  it('renders va-omb-info component', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container.querySelector('va-omb-info')).to.not.be.null;
  });

  it('calls scrollToTop on mount', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(scrollToTopStub.called).to.be.true;
  });

  it('calls focusElement on mount', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(focusElementStub.calledWith('h1')).to.be.true;
  });
});