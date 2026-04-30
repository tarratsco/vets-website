import { expect } from 'chai';
import {
  serviceInformationUiSchema,
  serviceInformationSchema,
} from './serviceInformation';

describe('serviceInformation page', () => {
  it('uiSchema has serviceInformation group', () => {
    expect(serviceInformationUiSchema).to.have.property('serviceInformation');
  });

  it('uiSchema has branchOfService, dateEnteredActiveDuty, dateReleasedFromActiveDuty', () => {
    const si = serviceInformationUiSchema.serviceInformation;
    expect(si).to.have.property('branchOfService');
    expect(si).to.have.property('dateEnteredActiveDuty');
    expect(si).to.have.property('dateReleasedFromActiveDuty');
  });

  it('schema requires branchOfService, dateEnteredActiveDuty, dateReleasedFromActiveDuty', () => {
    const si = serviceInformationSchema.properties.serviceInformation;
    expect(si.required).to.include('branchOfService');
    expect(si.required).to.include('dateEnteredActiveDuty');
    expect(si.required).to.include('dateReleasedFromActiveDuty');
  });

  it('branchOfService schema is an object with properties', () => {
    const props = serviceInformationSchema.properties.serviceInformation.properties;
    expect(props.branchOfService).to.be.an('object');
  });
});