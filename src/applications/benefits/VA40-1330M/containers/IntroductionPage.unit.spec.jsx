import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as uiUtils from 'platform/utilities/ui';
import { IntroductionPage } from './IntroductionPage';
import formConfig from '../config/form';

describe('IntroductionPage', () => {
  let scrollStub;
  let focusStub;

  beforeEach(() => {
    scrollStub = sinon.stub(uiUtils, 'scrollToTop');
    focusStub = sinon.stub(uiUtils, 'focusElement');
  });

  afterEach(() => {
    scrollStub.restore();
    focusStub.restore();
  });

  const defaultRoute = {
    formConfig: {
      prefillEnabled: formConfig.prefillEnabled,
      saveInProgress: formConfig.saveInProgress,
      savedFormMessages: formConfig.savedFormMessages,
    },
    pageList: [{ path: '/introduction' }],
  };

  it('renders without crashing', () => {
    const { container } = render(
      <IntroductionPage route={defaultRoute} />,
    );
    expect(container).to.exist;
  });

  it('renders the form title', () => {
    const { getByText } = render(
      <IntroductionPage route={defaultRoute} />,
    );
    expect(
      getByText('Request a Government Headstone or Marker'),
    ).to.exist;
  });

  it('renders va-omb-info element', () => {
    const { container } = render(
      <IntroductionPage route={defaultRoute} />,
    );
    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    render(<IntroductionPage route={defaultRoute} />);
    expect(scrollStub.calledOnce).to.be.true;
  });

  it('calls focusElement with h1 on mount', () => {
    render(<IntroductionPage route={defaultRoute} />);
    expect(focusStub.calledWith('h1')).to.be.true;
  });

  it('does not show identity verification alert when user is logged in and verified', () => {
    const { queryByText } = render(
      <IntroductionPage
        route={defaultRoute}
        userLoggedIn
        userIdVerified
      />,
    );
    expect(queryByText('You need to verify your identity')).to.be.null;
  });

  it('shows identity verification alert when user is logged in but not verified', () => {
    const { container } = render(
      <IntroductionPage
        route={defaultRoute}
        userLoggedIn
        userIdVerified={false}
      />,
    );
    const alerts = container.querySelectorAll('va-alert');
    expect(alerts.length).to.be.greaterThan(0);
  });
});