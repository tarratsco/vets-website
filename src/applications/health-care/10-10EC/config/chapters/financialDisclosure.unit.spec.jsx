import { expect } from 'chai';
import {
  financialDisclosureUiSchema,
  financialDisclosureSchema,
} from './financialDisclosure';

describe('financialDisclosure page', () => {
  it('exports uiSchema and schema', () => {
    expect(financialDisclosureUiSchema).to.be.an('object');
    expect(financialDisclosureSchema).to.be.an('object');
  });

  it('financialDisclosureElection is required', () => {
    const required =
      financialDisclosureUiSchema.financialDisclosureElection['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('schema includes yes and no enum values', () => {
    const { enum: values } =
      financialDisclosureSchema.properties.financialDisclosureElection;
    expect(values).to.include('yes');
    expect(values).to.include('no');
    expect(values).to.have.lengthOf(2);
  });

  it('schema requires financialDisclosureElection', () => {
    expect(financialDisclosureSchema.required).to.include(
      'financialDisclosureElection',
    );
  });
});