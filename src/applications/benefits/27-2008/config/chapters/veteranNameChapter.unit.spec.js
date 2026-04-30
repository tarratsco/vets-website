import { expect } from 'chai';
import {
  veteranNameUiSchema,
  veteranNameSchema,
} from './veteranNameChapter';

describe('veteranNameChapter', () => {
  it('uiSchema has veteranInformation group', () => {
    expect(veteranNameUiSchema.veteranInformation).to.exist;
  });

  it('uiSchema has firstName, middleName, lastName fields', () => {
    expect(veteranNameUiSchema.veteranInformation.firstName).to.exist;
    expect(veteranNameUiSchema.veteranInformation.middleName).to.exist;
    expect(veteranNameUiSchema.veteranInformation.lastName).to.exist;
  });

  it('uiSchema has maidenOrOtherName field', () => {
    expect(veteranNameUiSchema.veteranInformation.maidenOrOtherName).to
      .exist;
  });

  it('schema requires firstName and lastName', () => {
    const vetInfo =
      veteranNameSchema.properties.veteranInformation;
    expect(vetInfo.required).to.include('firstName');
    expect(vetInfo.required).to.include('lastName');
    expect(vetInfo.required).to.not.include('middleName');
  });
});