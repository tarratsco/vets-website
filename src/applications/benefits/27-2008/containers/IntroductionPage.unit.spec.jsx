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

const defaultRoute = {
  formConfig,
  pageList: [{ path: '/introduction' }, { path: '/applicant-type' }],
};

describe('IntroductionPage container', () => {
  let scrollStub;
  let focusStub;

  beforeEach(() => {
    scrollStub = sinon.stub(uiUtils, 'scrollToTop');
    focusStub = sinon.stub(uiUtils, 'focusElement');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('renders without crashing', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container).to.exist;
  });

  it('renders the form title', () => {
    const mockStore = createMockStore();
    const { getByText } = render(
      <Provider store={mockStore}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(
      getByText(
        'Apply for a United States flag for burial purposes',
      ),
    ).to.exist;
  });

  it('renders va-omb-info element', () => {
    const mockStore = createMockStore();
    const { container } = render(
      <Provider store={mockStore}>
        <IntroductionPage route={defaultRoute} />
      </Provider>,
    );
    expect(container.querySelector('va-omb-info')).to.exist;
  });
});