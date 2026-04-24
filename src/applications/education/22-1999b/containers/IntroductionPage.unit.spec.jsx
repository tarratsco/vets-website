import { expect } from 'chai';
import React from 'react';
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

  const defaultRoute = {
    formConfig: {
      formId: formConfig.formId,
      prefillEnabled: true,
      savedFormMessages: {},
      saveInProgress: {
        messages: {
          inProgress: 'Your form is in progress.',
          expired: 'Your form has expired.',
          saved: 'Your form has been saved.',
        },
      },
    },
    pageList: [],
  };

  it('renders the form title', () => {
    const { IntroductionPage } = require('../containers/IntroductionPage');
    const { container } = render(
      <IntroductionPage
        route={defaultRoute}
        userLoggedIn={false}
        userIdVerified={false}
      />,
    );
    expect(container.querySelector('article')).to.exist;
  });

  it('renders a va-omb-info element', () => {
    const { IntroductionPage } = require('../containers/IntroductionPage');
    const { container } = render(
      <IntroductionPage
        route={defaultRoute}
        userLoggedIn={false}
        userIdVerified={false}
      />,
    );
    expect(container.querySelector('va-omb-info')).to.exist;
  });

  it('renders va-process-list', () => {
    const { IntroductionPage } = require('../containers/IntroductionPage');
    const { container } = render(
      <IntroductionPage
        route={defaultRoute}
        userLoggedIn={false}
        userIdVerified={false}
      />,
    );
    expect(container.querySelector('va-process-list')).to.exist;
  });
});