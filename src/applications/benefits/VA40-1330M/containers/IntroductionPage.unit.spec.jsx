import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
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

  const mockRoute = {
    formConfig,
    pageList: [{ path: '/introduction' }, { path: '/eligibility-screener' }],
  };

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
    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.not.be.null;
  });

  it('renders the what you will need section', () => {
    const store = createMockStore();
    const { getByText } = render(
      <Provider store={store}>
        <IntroductionPage route={mockRoute} />
      </Provider>,
    );
    expect(getByText("What you'll need")).to.exist;
  });
});