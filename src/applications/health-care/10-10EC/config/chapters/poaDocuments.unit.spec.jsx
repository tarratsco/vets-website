import { expect } from 'chai';
import { poaDocumentsUiSchema, poaDocumentsSchema } from './poaDocuments';

describe('poaDocuments page', () => {
  it('exports uiSchema and schema', () => {
    expect(poaDocumentsUiSchema).to.be.an('object');
    expect(poaDocumentsSchema).to.be.an('object');
  });

  it('submitterType is required', () => {
    const required = poaDocumentsUiSchema.submitterType['ui:required'];
    expect(required).to.be.a('function');
    expect(required({})).to.be.true;
  });

  it('poaDocumentGuid is required when submitterType is poa_representative', () => {
    const required = poaDocumentsUiSchema.poaDocumentGuid['ui:required'];
    expect(required).to.be.a('function');
    expect(required({ submitterType: 'poa_representative' })).to.be.true;
    expect(required({ submitterType: 'veteran' })).to.be.false;
    expect(required({})).to.be.false;
  });

  it('schema requires submitterType', () => {
    expect(poaDocumentsSchema.required).to.include('submitterType');
  });

  it('schema includes veteran and poa_representative enum values', () => {
    const { enum: values } = poaDocumentsSchema.properties.submitterType;
    expect(values).to.include('veteran');
    expect(values).to.include('poa_representative');
  });
});