import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import GetFormHelp from './GetFormHelp';

describe('GetFormHelp', () => {
  it('renders without crashing', () => {
    const { container } = render(<GetFormHelp />);
    expect(container).to.not.be.null;
  });

  it('renders va-telephone with 10-digit contact', () => {
    const { container } = render(<GetFormHelp />);
    const tel = container.querySelector('va-telephone');
    expect(tel).to.not.be.null;
    expect(tel.getAttribute('contact')).to.match(/^\d{10}$/);
  });

  it('renders the need help heading', () => {
    const { getByText } = render(<GetFormHelp />);
    expect(getByText('Need help?')).to.exist;
  });
});