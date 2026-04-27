import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import DocumentsIntroPage from './DocumentsIntroPage';

describe('DocumentsIntroPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <DocumentsIntroPage formData={{}} goForward={() => {}} />,
    );
    expect(container).to.not.be.null;
  });

  it('renders active duty documents when serviceStatusAtDeath is activeDuty', () => {
    const { getByText } = render(
      <DocumentsIntroPage
        formData={{ serviceStatusAtDeath: 'activeDuty' }}
        goForward={() => {}}
      />,
    );
    expect(
      getByText('Required documents for Active Duty'),
    ).to.exist;
  });

  it('renders Guard/Reserve documents when serviceStatusAtDeath is guardOrReserve', () => {
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

  it('renders a Continue button', () => {
    const { container } = render(
      <DocumentsIntroPage formData={{}} goForward={() => {}} />,
    );
    const button = container.querySelector('va-button');
    expect(button).to.not.be.null;
  });
});