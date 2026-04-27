import { expect } from 'chai';
import React from 'react';
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
  pageList: [{ path: '/introduction' }],
};

describe('IntroductionPage', () => {
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

  it('renders the form title', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <IntroductionPage route={mockRoute} />
      </Provider>,
    );
    expect(getByText('Request a Government Headstone or Marker')).to.exist;
  });

  it('renders va-omb-info component', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={mockRoute} />
      </Provider>,
    );
    expect(container.querySelector('va-omb-info')).to.exist;
  });

  it('renders eligibility accordion', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <IntroductionPage route={mockRoute} />
      </Provider>,
    );
    expect(container.querySelector('va-accordion')).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <IntroductionPage route={mockRoute} />
      </Provider>,
    );
    expect(scrollToTopStub.called).to.be.true;
  });
});