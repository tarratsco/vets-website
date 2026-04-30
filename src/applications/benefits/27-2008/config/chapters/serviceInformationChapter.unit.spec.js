import { expect } from 'chai';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './serviceInformationChapter';

describe('serviceInformationChapter', () => {
  it('uiSchema has serviceInformation group', () => {
    expect(serviceInformationUiSchema.serviceInformation).to.exist;
  });

  it('uiSchema has branchOfService field', () => {
    expect(
      serviceInformationUiSchema.serviceInformation.branchOfService,
    ).to.exist;
  });

  it('uiSchema has dateEnteredActiveDuty field', () => {
    expect(
      serviceInformationUiSchema.serviceInformation.dateEnteredActiveDuty,
    ).to.exist;
  });

  it('schema requires branchOfService and dates', () => {
    const svc =
      serviceInformationSchema.properties.serviceInformation;
    expect(svc.required).to.include('branchOfService');
    expect(svc.required).to.include('dateEnteredActiveDuty');
    expect(svc.required).to.include('dateReleasedFromActiveDuty');
  });

  it('uiSchema has cross-field date validation', () => {
    expect(serviceInformationUiSchema['ui:validations']).to.be.an('array');
    expect(serviceInformationUiSchema['ui:validations'].length).to.be
      .greaterThan(0);
  });

  describe('date cross-validation', () => {
    const validate =
      serviceInformationUiSchema['ui:validations'][0];
    let messages;
    let errors;

    beforeEach(() => {
      messages = [];
      errors = {
        serviceInformation: {
          dateReleasedFromActiveDuty: {
            addError: msg => messages.push(msg || ''),
          },
        },
      };
    });

    it('does not error when entry is before release', () => {
      validate(errors, {
        serviceInformation: {
          dateEnteredActiveDuty: '2000-01-01',
          dateReleasedFromActiveDuty: '2004-01-01',
        },
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when entry is after release', () => {
      validate(errors, {
        serviceInformation: {
          dateEnteredActiveDuty: '2004-01-01',
          dateReleasedFromActiveDuty: '2000-01-01',
        },
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not error when dates are missing', () => {
      validate(errors, { serviceInformation: {} });
      expect(messages).to.have.lengthOf(0);
    });
  });
});