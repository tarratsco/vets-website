import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as uiUtils from 'platform/utilities/ui';
import { IntroductionPage } from './IntroductionPage';
import formConfig from '../config/form';

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

  const mockRoute = {
    formConfig: {
      prefillEnabled: true,
      savedFormMessages: {},
      saveInProgress: {
        messages: {
          inProgress: 'Your application is in progress.',
          expired: 'Your saved application has expired.',
          saved: 'Your application has been saved.',
        },
      },
    },
    pageList: [{ path: '/introduction' }, { path: '/veteran-information' }],
  };

  it('renders the form title', () => {
    const { getByText } = render(<IntroductionPage route={mockRoute} />);
    expect(getByText('Apply for extended care services')).to.exist;
  });

  it('renders a va-omb-info element', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.exist;
  });

  it('calls scrollToTop on mount', () => {
    render(<IntroductionPage route={mockRoute} />);
    expect(scrollToTopStub.calledOnce).to.be.true;
  });

  it('calls focusElement on mount', () => {
    render(<IntroductionPage route={mockRoute} />);
    expect(focusElementStub.calledOnce).to.be.true;
  });

  it('renders enrollment prerequisite warning', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const alerts = container.querySelectorAll('va-alert');
    expect(alerts.length).to.be.greaterThan(0);
  });
});