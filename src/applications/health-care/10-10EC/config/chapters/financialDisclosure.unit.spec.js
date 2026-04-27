import { expect } from 'chai';
import {
  financialDisclosureUiSchema,
  financialDisclosureSchema,
} from './financialDisclosure';

describe('chapters/financialDisclosure', () => {
  it('uiSchema has financialDisclosureElection', () => {
    expect(financialDisclosureUiSchema).to.have.property('financialDisclosureElection');
  });

  it('schema requires financialDisclosureElection', () => {
    expect(financialDisclosureSchema.required).to.include('financialDisclosureElection');
  });

  it('schema enum has yes and no', () => {
    expect(financialDisclosureSchema.properties.financialDisclosureElection.enum).to.include('yes');
    expect(financialDisclosureSchema.properties.financialDisclosureElection.enum).to.include('no');
  });

  it('ui:required returns true', () => {
    const requiredFn = financialDisclosureUiSchema.financialDisclosureElection['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({})).to.be.true;
    }
  });
});