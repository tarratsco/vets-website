import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { render, waitFor, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import set from 'platform/utilities/data/set';
import { createAddressValidationPage } from './AddressValidationPage';
import * as addressValidationUtils from '../../utils/validators/address-validation';

const buildStore = formData =>
  createStore((state = { form: { data: formData } }) => state);

describe('AddressValidationPage', () => {
  let fetchSuggestedAddressStub;

  beforeEach(() => {
    fetchSuggestedAddressStub = sinon.stub(
      addressValidationUtils,
      'fetchSuggestedAddress',
    );
  });

  afterEach(() => {
    fetchSuggestedAddressStub.restore();
    cleanup();
  });

  it('auto-advances with normalized form data for 100 confidence', async () => {
    const addressPath = 'applicant.mailingAddress';
    const originalAddress = {
      street: '37 N 1st St',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'USA',
    };
    const suggestedAddress = {
      street: '37 North 1st Street',
      city: 'Brooklyn',
      state: 'NY',
      postalCode: '11249',
      country: 'USA',
    };
    const formData = {
      applicant: {
        mailingAddress: originalAddress,
      },
    };

    fetchSuggestedAddressStub.resolves({
      suggestedAddress,
      showSuggestions: false,
      confidenceScore: 100,
    });

    const goBack = sinon.spy();
    const goForward = sinon.spy();
    const CustomPage = createAddressValidationPage({
      addressPath,
      title: 'Confirm mailing address',
    });

    render(
      <Provider store={buildStore(formData)}>
        <CustomPage
          goBack={goBack}
          goForward={goForward}
          contentBeforeButtons={null}
          contentAfterButtons={null}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(goForward.calledOnce).to.equal(true);
    });

    expect(goBack.called).to.equal(false);
    expect(fetchSuggestedAddressStub.calledOnce).to.equal(true);
    expect(fetchSuggestedAddressStub.firstCall.args[0]).to.deep.equal(
      originalAddress,
    );

    const expectedFormData = set(addressPath, suggestedAddress, formData);
    expect(goForward.firstCall.args[0]).to.deep.equal(expectedFormData);
  });

  it('does not call goBack on remount after a 100-confidence validation', async () => {
    const addressPath = 'applicant.mailingAddress';
    const formData = {
      applicant: {
        mailingAddress: {
          street: '37 N 1st St',
          city: 'Brooklyn',
          state: 'NY',
          postalCode: '11249',
          country: 'USA',
        },
      },
    };

    fetchSuggestedAddressStub.resolves({
      suggestedAddress: {
        street: '37 North 1st Street',
        city: 'Brooklyn',
        state: 'NY',
        postalCode: '11249',
        country: 'USA',
      },
      showSuggestions: false,
      confidenceScore: 100,
    });

    const CustomPage = createAddressValidationPage({
      addressPath,
      title: 'Confirm mailing address',
    });

    const goBack = sinon.spy();
    const goForward = sinon.spy();

    const firstRender = render(
      <Provider store={buildStore(formData)}>
        <CustomPage
          goBack={goBack}
          goForward={goForward}
          contentBeforeButtons={null}
          contentAfterButtons={null}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(goForward.calledOnce).to.equal(true);
    });

    firstRender.unmount();

    render(
      <Provider store={buildStore(formData)}>
        <CustomPage
          goBack={goBack}
          goForward={goForward}
          contentBeforeButtons={null}
          contentAfterButtons={null}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(goForward.calledTwice).to.equal(true);
    });

    expect(goBack.called).to.equal(false);
    expect(fetchSuggestedAddressStub.calledTwice).to.equal(true);
  });
});
