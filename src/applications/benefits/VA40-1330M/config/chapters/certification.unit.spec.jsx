import { expect } from 'chai';

import {
  certificationUiSchema,
  certificationSchema,
} from './certification';

describe('certification chapter', () => {
  it('exports uiSchema and schema', () => {
    expect(certificationUiSchema).to.be.an('object');
    expect(certificationSchema).to.be.an('object');
  });

  it('schema requires certificationGroup', () => {
    expect(certificationSchema.required).to.include('certificationGroup');
  });

  it('certificationGroup schema is a valid object', () => {
    const { certificationGroup } = certificationSchema.properties;
    expect(certificationGroup).to.be.an('object');
    expect(certificationGroup.type).to.equal('object');
  });

  it('certificationGroup uiSchema field is present', () => {
    expect(certificationUiSchema).to.have.property('certificationGroup');
  });

  it('uiSchema has a ui:title', () => {
    expect(certificationUiSchema['ui:title']).to.be.a('string').that.is.not.empty;
  });
});