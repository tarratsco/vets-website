import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';

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

describe('containers/IntroductionPage', () => {
  let scrollToTopStub;
  let focusElementStub;

  beforeEach(() => {
    scrollToTopStub = sinon.stub();
    focusElementStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the form title', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    const route = {
      formConfig,
      pageList: [{ path: '/introduction' }, { path: '/applicant-type' }],
    };

    // Stub platform utilities
    const uiModule = require('platform/utilities/ui');
    sinon.stub(uiModule, 'scrollToTop').callsFake(scrollToTopStub);
    sinon.stub(uiModule, 'focusElement').callsFake(focusElementStub);

    const { container } = render(
      <IntroductionPage route={route} />,
    );
    expect(container.querySelector('article')).to.not.be.null;
  });

  it('should include OMB info component', () => {
    const { IntroductionPage } = require('./IntroductionPage');
    const route = {
      formConfig,
      pageList: [{ path: '/introduction' }],
    };

    const uiModule = require('platform/utilities/ui');
    if (!uiModule.scrollToTop.restore) {
      sinon.stub(uiModule, 'scrollToTop').callsFake(() => {});
    }
    if (!uiModule.focusElement.restore) {
      sinon.stub(uiModule, 'focusElement').callsFake(() => {});
    }

    const { container } = render(
      <IntroductionPage route={route} />,
    );
    expect(container.querySelector('va-omb-info')).to.not.be.null;
  });
});