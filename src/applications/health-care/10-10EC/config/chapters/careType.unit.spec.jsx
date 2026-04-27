import { expect } from 'chai';
import { careTypeUiSchema, careTypeSchema } from './careType';

describe('careType page', () => {
  it('exports uiSchema and schema', () => {
    expect(careTypeUiSchema).to.be.an('object');
    expect(careTypeSchema).to.be.an('object');
  });

  it('careType is required', () => {
    const required = careTypeUiSchema.careType['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('schema includes institutional and non_institutional values', () => {
    const { enum: values } = careTypeSchema.properties.careType;
    expect(values).to.include('institutional');
    expect(values).to.include(
      'non_institutional',
    );
    expect(values).to.have.lengthOf(2);
  });

  it('schema requires careType', () => {
    expect(careTypeSchema.required).to.include('careType');
  });
});