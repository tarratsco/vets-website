import { expect } from 'chai';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './serviceInformation';

describe('serviceInformation page', () => {
  describe('uiSchema', () => {
    it('has serviceInformation group', () => {
      expect(serviceInformationUiSchema.serviceInformation).to.be.an('object');
    });

    it('has branchOfService field', () => {
      expect(
        serviceInformationUiSchema.serviceInformation.branchOfService,
      ).to.be.an('object');
    });

    it('has dateEnteredActiveDuty field', () => {
      expect(
        serviceInformationUiSchema.serviceInformation.dateEnteredActiveDuty,
      ).to.be.an('object');
    });

    it('has dateReleasedFromActiveDuty field', () => {
      expect(
        serviceInformationUiSchema.serviceInformation
          .dateReleasedFromActiveDuty,
      ).to.be.an('object');
    });
  });

  describe('schema', () => {
    it('requires branchOfService', () => {
      const required =
        serviceInformationSchema.properties.serviceInformation.required;
      expect(required).to.include('branchOfService');
    });

    it('requires dateEnteredActiveDuty', () => {
      const required =
        serviceInformationSchema.properties.serviceInformation.required;
      expect(required).to.include('dateEnteredActiveDuty');
    });

    it('requires dateReleasedFromActiveDuty', () => {
      const required =
        serviceInformationSchema.properties.serviceInformation.required;
      expect(required).to.include('dateReleasedFromActiveDuty');
    });
  });

  describe('validateServiceDates', () => {
    let messages;
    const makeErrors = () => {
      messages = [];
      return {
        serviceInformation: {
          dateReleasedFromActiveDuty: {
            addError: msg => messages.push(msg || ''),
          },
        },
      };
    };

    it('does not add error when dates are valid', () => {
      const errors = makeErrors();
      const validations = serviceInformationUiSchema['ui:validations'];
      expect(validations).to.be.an('array');
      validations.forEach(fn => {
        fn(errors, {
          serviceInformation: {
            dateEnteredActiveDuty: '1960-01-01',
            dateReleasedFromActiveDuty: '1964-12-31',
          },
        });
      });
      expect(messages).to.have.lengthOf(0);
    });

    it('adds error when released date is before entered date', () => {
      const errors = makeErrors();
      const validations = serviceInformationUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, {
          serviceInformation: {
            dateEnteredActiveDuty: '1964-12-31',
            dateReleasedFromActiveDuty: '1960-01-01',
          },
        });
      });
      expect(messages).to.have.lengthOf(1);
    });

    it('does not add error when dates are missing', () => {
      const errors = makeErrors();
      const validations = serviceInformationUiSchema['ui:validations'];
      validations.forEach(fn => {
        fn(errors, { serviceInformation: {} });
      });
      expect(messages).to.have.lengthOf(0);
    });
  });
});