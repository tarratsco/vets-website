import { expect } from 'chai';
import { applicantTypeUiSchema } from './applicantType';

describe('applicantType page', () => {
  describe('uiSchema', () => {
    it('has applicantType field with ui:title', () => {
      expect(applicantTypeUiSchema.applicantType).to.be.an('object');
      expect(applicantTypeUiSchema.applicantType['ui:title']).to.be.a('string');
    });

    it('has four label options', () => {
      const labels =
        applicantTypeUiSchema.applicantType['ui:options']?.labels;
      expect(labels).to.be.an('object');
      expect(Object.keys(labels)).to.have.lengthOf(4);
    });

    it('includes nextOfKin label', () => {
      const labels =
        applicantTypeUiSchema.applicantType['ui:options']?.labels;
      expect(labels).to.have.property('nextOfKin');
    });

    it('includes funeralDirector label', () => {
      const labels =
        applicantTypeUiSchema.applicantType['ui:options']?.labels;
      expect(labels).to.have.property('funeralDirector');
    });
  });
});