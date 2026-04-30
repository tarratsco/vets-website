import { expect } from 'chai';
import { burialPlaceUiSchema, burialPlaceSchema } from './burialPlace';

describe('burialPlace page', () => {
  it('uiSchema has veteranInformation group with burial place fields', () => {
    const vi = burialPlaceUiSchema.veteranInformation;
    expect(vi).to.have.property('placeOfBurialCemeteryName');
    expect(vi).to.have.property('placeOfBurialCity');
    expect(vi).to.have.property('placeOfBurialState');
  });

  it('schema requires placeOfBurialCemeteryName, placeOfBurialCity, placeOfBurialState', () => {
    const vi = burialPlaceSchema.properties.veteranInformation;
    expect(vi.required).to.include('placeOfBurialCemeteryName');
    expect(vi.required).to.include('placeOfBurialCity');
    expect(vi.required).to.include('placeOfBurialState');
  });

  it('placeOfBurialState schema is a valid schema object', () => {
    const props = burialPlaceSchema.properties.veteranInformation.properties;
    expect(props.placeOfBurialState).to.be.an('object');
    expect(props.placeOfBurialState.enum).to.be.an('array');
    expect(props.placeOfBurialState.enum).to.include('OUTSIDE_US');
  });
});