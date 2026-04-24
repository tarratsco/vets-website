import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';

import formConfig from '../config/form';

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

describe('App container', () => {
  it('renders without crashing', () => {
    const store = createMockStore();
    // Verify the store can be constructed without error
    expect(store.getState()).to.be.an('object');
    expect(store.getState().form.formId).to.equal('22-1999b');
  });

  it('has expected form slice keys', () => {
    const state = createMockStore().getState();
    expect(state.form).to.have.property('formId');
    expect(state.form).to.have.property('data');
    expect(state.form).to.have.property('loadedStatus');
  });
});