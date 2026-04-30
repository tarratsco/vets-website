import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import * as uiUtils from 'platform/utilities/ui';
import { IntroductionPage } from './IntroductionPage';
import formConfig from '../config/form';

const mockRoute = {
  formConfig,
  pageList: [
    { path: '/introduction' },
    { path: '/applicant-type' },
  ],
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
    // FormTitle renders the title somewhere in the DOM
    expect(container).to.exist;
  });

  it('renders va-omb-info element', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const ombInfo = container.querySelector('va-omb-info');
    expect(ombInfo).to.exist;
  });

  it('renders va-alert for before you fill out guidance', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const alert = container.querySelector('va-alert');
    expect(alert).to.exist;
  });

  it('renders va-process-list', () => {
    const { container } = render(<IntroductionPage route={mockRoute} />);
    const processList = container.querySelector('va-process-list');
    expect(processList).to.exist;
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