import { expect } from 'chai';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './serviceInformation';

describe('chapters/serviceInformation', () => {
  it('exports uiSchema and schema', () => {
    expect(serviceInformationUiSchema).to.be.an('object');
    expect(serviceInformationSchema).to.be.an('object');
  });

  it('has branchOfService, dateEnteredActiveDuty, dateReleasedFromActiveDuty in uiSchema', () => {
    const fields = serviceInformationUiSchema.serviceInformation;
    expect(fields.branchOfService).to.exist;
    expect(fields.dateEnteredActiveDuty).to.exist;
    expect(fields.dateReleasedFromActiveDuty).to.exist;
  });

  it('schema requires branchOfService, dateEnteredActiveDuty, dateReleasedFromActiveDuty', () => {
    const required =
      serviceInformationSchema.properties.serviceInformation.required;
    expect(required).to.include('branchOfService');
    expect(required).to.include('dateEnteredActiveDuty');
    expect(required).to.include('dateReleasedFromActiveDuty');
  });

  it('uiSchema has a top-level ui:validations array', () => {
    expect(serviceInformationUiSchema['ui:validations']).to.be.an('array');
    expect(serviceInformationUiSchema['ui:validations'].length).to.be.greaterThan(0);
  });

  describe('validateServiceDates', () => {
    const validateFn = serviceInformationUiSchema['ui:validations'][0];

    it('does not add error when dates are valid', () => {
      const messages = [];
      const errors = {
        serviceInformation: {
          dateReleasedFromActiveDuty: {
            addError: msg => messages.push(msg),
          },
        },
      };
      const formData = {
        serviceInformation: {
          dateEnteredActiveDuty: '1960-01-01',
          dateReleasedFromActiveDuty: '1965-01-01',
        },
      };
      validateFn(errors, formData);
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when released date is before entered date', () => {
      const messages = [];
      const errors = {
        serviceInformation: {
          dateReleasedFromActiveDuty: {
            addError: msg => messages.push(msg),
          },
        },
      };
      const formData = {
        serviceInformation: {
          dateEnteredActiveDuty: '1965-01-01',
          dateReleasedFromActiveDuty: '1960-01-01',
        },
      };
      validateFn(errors, formData);
      expect(messages.length).to.equal(1);
    });

    it('does not throw when formData is empty', () => {
      const errors = {
        serviceInformation: {
          dateReleasedFromActiveDuty: { addError: () => {} },
        },
      };
      expect(() => validateFn(errors, {})).to.not.throw();
    });
  });
});