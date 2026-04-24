import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as uiUtils from 'platform/utilities/ui';

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
  pageList: [{ path: '/introduction' }, { path: '/institution-information' }],
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

  it('renders the form title', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    const { container } = render(<IntroductionPage route={mockRoute} />);
    expect(container.querySelector('article')).to.exist;
  });

  it('renders va-omb-info element', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    const { container } = render(<IntroductionPage route={mockRoute} />);
    expect(container.querySelector('va-omb-info')).to.exist;
  });

  it('calls scrollToTop and focusElement on mount', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    render(<IntroductionPage route={mockRoute} />);
    expect(scrollStub.calledOnce).to.be.true;
    expect(focusStub.calledWith('h1')).to.be.true;
  });

  it('renders process list for what information is needed', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    const { container } = render(<IntroductionPage route={mockRoute} />);
    expect(container.querySelector('va-process-list')).to.exist;
  });
});