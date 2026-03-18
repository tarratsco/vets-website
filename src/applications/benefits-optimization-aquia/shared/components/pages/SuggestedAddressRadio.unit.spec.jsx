import React from 'react';
import { expect } from 'chai';
import { render, cleanup } from '@testing-library/react';
import SuggestedAddressRadio from './SuggestedAddressRadio';

describe('SuggestedAddressRadio', () => {
  afterEach(() => {
    cleanup();
  });

  const baseProps = {
    title: 'Confirm employer address',
    userAddress: {
      street: '37 N 1st St',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'USA',
    },
    suggestedAddress: {
      street: '37 North 1st Street',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'USA',
    },
    selectedAddress: {
      street: '37 N 1st St',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'USA',
    },
    onChangeSelectedAddress: () => {},
  };

  it('renders heading text and both radio options', () => {
    const { getByText, container } = render(
      <SuggestedAddressRadio {...baseProps} />,
    );

    expect(getByText('Confirm employer address')).to.exist;

    const options = container.querySelectorAll('va-radio-option');
    expect(options.length).to.equal(2);
    expect(options[0].getAttribute('label')).to.equal('Address you entered:');
    expect(options[1].getAttribute('label')).to.equal('Suggested address:');
    expect(options[0].getAttribute('value')).to.equal('user-entered');
    expect(options[1].getAttribute('value')).to.equal('usps-suggested');
  });

  it('renders only one option when no suggested address exists', () => {
    const { container } = render(
      <SuggestedAddressRadio {...baseProps} suggestedAddress={null} />,
    );

    const options = container.querySelectorAll('va-radio-option');
    expect(options.length).to.equal(1);
    expect(options[0].getAttribute('label')).to.equal('Address you entered:');
  });

  it('marks suggested option as checked when selectedAddress matches it', () => {
    const { container } = render(
      <SuggestedAddressRadio
        {...baseProps}
        selectedAddress={baseProps.suggestedAddress}
      />,
    );

    const options = container.querySelectorAll('va-radio-option');
    expect(options[0].getAttribute('checked')).to.equal('false');
    expect(options[1].getAttribute('checked')).to.equal('true');
  });
});
