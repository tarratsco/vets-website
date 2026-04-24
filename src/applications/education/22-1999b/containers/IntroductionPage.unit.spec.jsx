import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as uiUtils from 'platform/utilities/ui';
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
  formConfig: {
    prefillEnabled: true,
    savedFormMessages: {},
    saveInProgress: {
      messages: {
        inProgress: 'Your form is in progress.',
        expired: 'Your saved form has expired.',
        saved: 'Your form has been saved.',
      },
    },
  },
  pageList: [{ path: '/introduction' }, { path: '/institution-information' }],
};

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

  it('renders the form title', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    expect(container.innerHTML).to.include('Report an enrollment change');
  });

  it('renders va-omb-info element', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.exist;
  });

  it('renders the info alert about VAONCE', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const alert = container.querySelector('va-alert[status="info"]');
    expect(alert).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    render(<IntroductionPage route={mockRoute} />);
    expect(scrollToTopStub.called).to.be.true;
  });

  it('calls focusElement with h1 on mount', () => {
    render(<IntroductionPage route={mockRoute} />);
    expect(focusElementStub.calledWith('h1')).to.be.true;
  });
});