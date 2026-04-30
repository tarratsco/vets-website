import { expect } from 'chai';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './serviceInformation';

describe('chapters/serviceInformation', () => {
  it('should export uiSchema and schema', () => {
    expect(serviceInformationUiSchema).to.be.an('object');
    expect(serviceInformationSchema).to.be.an('object');
  });

  it('uiSchema should have serviceInformation group with required fields', () => {
    const { serviceInformation } = serviceInformationUiSchema;
    expect(serviceInformation).to.have.property('branchOfService');
    expect(serviceInformation).to.have.property('dateEnteredActiveDuty');
    expect(serviceInformation).to.have.property('dateReleasedFromActiveDuty');
  });

  it('schema should require branchOfService, dateEntered, and dateReleased', () => {
    const { required } = serviceInformationSchema.properties.serviceInformation;
    expect(required).to.include('branchOfService');
    expect(required).to.include('dateEnteredActiveDuty');
    expect(required).to.include('dateReleasedFromActiveDuty');
  });

  it('branchOfService schema should be an object with properties', () => {
    const { branchOfService } = serviceInformationSchema.properties.serviceInformation.properties;
    expect(branchOfService).to.be.an('object');
  });
});