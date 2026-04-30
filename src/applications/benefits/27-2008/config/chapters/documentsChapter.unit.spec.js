import { expect } from 'chai';
import {
  documentsUiSchema,
  documentsSchema,
} from './documentsChapter';

describe('documentsChapter', () => {
  it('uiSchema has documents group', () => {
    expect(documentsUiSchema.documents).to.exist;
  });

  it('uiSchema has dd214Upload field', () => {
    expect(documentsUiSchema.documents.dd214Upload).to.exist;
  });

  it('schema has documents.dd214Upload property', () => {
    expect(
      documentsSchema.properties.documents.properties.dd214Upload,
    ).to.exist;
  });

  it('documents are not required at schema level', () => {
    const docs = documentsSchema.properties.documents;
    const required = docs.required || [];
    expect(required).to.not.include('dd214Upload');
  });
});