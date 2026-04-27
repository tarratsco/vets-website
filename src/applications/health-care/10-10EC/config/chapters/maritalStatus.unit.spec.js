import { expect } from 'chai';
import {
  maritalStatusUiSchema,
  maritalStatusSchema,
  MARITAL_STATUS_VALUES,
  MARRIED_STATUSES,
} from './maritalStatus';

describe('chapters/maritalStatus', () => {
  it('uiSchema has maritalStatus', () => {
    expect(maritalStatusUiSchema).to.have.property('maritalStatus');
  });

  it('schema requires maritalStatus', () => {
    expect(maritalStatusSchema.required).to.include('maritalStatus');
  });

  it('schema enum includes all 6 marital status values', () => {
    expect(maritalStatusSchema.properties.maritalStatus.enum).to.have.lengthOf(6);
  });

  it('MARITAL_STATUS_VALUES includes all expected values', () => {
    expect(MARITAL_STATUS_VALUES).to.include('single_with_dependent');
    expect(MARITAL_STATUS_VALUES).to.include('single_no_dependent');
    expect(MARITAL_STATUS_VALUES).to.include('married_living_with');
    expect(MARITAL_STATUS_VALUES).to.include('married_separate_not_institutionalized');
    expect(MARITAL_STATUS_VALUES).to.include('married_separate_institutionalized');
    expect(MARITAL_STATUS_VALUES).to.include('divorced_separated_widowed_this_year');
  });

  it('MARRIED_STATUSES contains only the three married values', () => {
    expect(MARRIED_STATUSES).to.have.lengthOf(3);
    expect(MARRIED_STATUSES).to.include('married_living_with');
    expect(MARRIED_STATUSES).to.not.include('single_no_dependent');
    expect(MARRIED_STATUSES).to.not.include('divorced_separated_widowed_this_year');
  });

  it('maritalStatus ui:required returns true', () => {
    const requiredFn = maritalStatusUiSchema.maritalStatus['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({})).to.be.true;
    }
  });
});