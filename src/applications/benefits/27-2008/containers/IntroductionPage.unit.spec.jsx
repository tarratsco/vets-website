import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';

import IntroductionPage from './IntroductionPage';
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

const route = {
  formConfig,
  pageList: [
    { path: '/introduction' },
    { path: '/applicant-type' },
  ],
};

describe('IntroductionPage', () => {
  let uiStub;
  let uiModule;

  beforeEach(() => {
    uiModule = require('platform/utilities/ui');
    uiStub = {
      scrollToTop: sinon.stub(uiModule, 'scrollToTop'),
      focusElement: sinon.stub(uiModule, 'focusElement'),
    };
  });

  afterEach(() => {
    uiStub.scrollToTop.restore();
    uiStub.focusElement.restore();
  });

  it('renders the form title', () => {
    const { getByText } = render(<IntroductionPage route={route} />);
    expect(getByText('Apply for a burial flag')).to.exist;
  });

  it('renders OMB control number', () => {
    const { getByText } = render(<IntroductionPage route={route} />);
    expect(getByText(/2900-0013/)).to.exist;
  });

  it('renders the VA Form number', () => {
    const { container } = render(<IntroductionPage route={route} />);
    expect(container.textContent).to.include('27-2008');
  });
});