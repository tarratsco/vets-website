import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';

import { DocumentsIntroPage } from './DocumentsIntroPage';

describe('DocumentsIntroPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DocumentsIntroPage formData={{}} goForward={() => {}} />,
    );
    expect(container).to.exist;
  });

  it('renders active duty document list when serviceStatusAtDeath is activeDuty', () => {
    const { getByText } = render(
      <DocumentsIntroPage
        formData={{ serviceStatusAtDeath: 'activeDuty' }}
        goForward={() => {}}
      />,
    );
    expect(getByText('Required documents for active duty')).to.exist;
  });

  it('renders guard/reserve document list when serviceStatusAtDeath is guardOrReserve', () => {
    const { getByText } = render(
      <DocumentsIntroPage
        formData={{ serviceStatusAtDeath: 'guardOrReserve' }}
        goForward={() => {}}
      />,
    );
    expect(
      getByText('Required documents for National Guard or Reserve'),
    ).to.exist;
  });

  it('renders continue button', () => {
    const { container } = render(
      <DocumentsIntroPage formData={{}} goForward={() => {}} />,
    );
    expect(container.querySelector('va-button')).to.exist;
  });

  it('renders accordions for help content', () => {
    const { container } = render(
      <DocumentsIntroPage formData={{}} goForward={() => {}} />,
    );
    expect(container.querySelector('va-accordion')).to.exist;
  });
});