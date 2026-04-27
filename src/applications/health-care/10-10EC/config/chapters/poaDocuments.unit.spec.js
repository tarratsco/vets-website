import { expect } from 'chai';
import { poaDocumentsUiSchema, poaDocumentsSchema } from './poaDocuments';

describe('chapters/poaDocuments', () => {
  it('uiSchema has submitterType', () => {
    expect(poaDocumentsUiSchema).to.have.property('submitterType');
  });

  it('uiSchema has poaDocumentUpload', () => {
    expect(poaDocumentsUiSchema).to.have.property('poaDocumentUpload');
  });

  it('schema requires submitterType', () => {
    expect(poaDocumentsSchema.required).to.include('submitterType');
  });

  it('schema enum for submitterType has veteran and poa_representative', () => {
    expect(poaDocumentsSchema.properties.submitterType.enum).to.include('veteran');
    expect(poaDocumentsSchema.properties.submitterType.enum).to.include('poa_representative');
  });

  it('poaDocumentUpload is required when submitterType is poa_representative', () => {
    const requiredFn = poaDocumentsUiSchema.poaDocumentUpload?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ submitterType: 'poa_representative' })).to.be.true;
    }
  });

  it('poaDocumentUpload is not required when submitterType is veteran', () => {
    const requiredFn = poaDocumentsUiSchema.poaDocumentUpload?.['ui:required'];
    if (typeof requiredFn === 'function') {
      expect(requiredFn({ submitterType: 'veteran' })).to.be.false;
    }
  });

  it('poaDocumentUpload hideIf hides when submitterType is veteran', () => {
    const hideIf = poaDocumentsUiSchema.poaDocumentUpload?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ submitterType: 'veteran' })).to.be.true;
    }
  });

  it('poaDocumentUpload hideIf shows when submitterType is poa_representative', () => {
    const hideIf = poaDocumentsUiSchema.poaDocumentUpload?.['ui:options']?.hideIf;
    if (typeof hideIf === 'function') {
      expect(hideIf({ submitterType: 'poa_representative' })).to.be.false;
    }
  });
});