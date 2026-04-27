import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';

import { GetFormHelp } from './GetFormHelp';

describe('GetFormHelp', () => {
  it('renders without crashing', () => {
    const { container } = render(<GetFormHelp />);
    expect(container).to.exist;
  });

  it('renders the help heading', () => {
    const { getByText } = render(<GetFormHelp />);
    expect(getByText('Need help?')).to.exist;
  });

  it('renders a link to the NCA page', () => {
    const { container } = render(<GetFormHelp />);
    const link = container.querySelector('a[href*="headstones-markers-medallions"]');
    expect(link).to.exist;
  });
});