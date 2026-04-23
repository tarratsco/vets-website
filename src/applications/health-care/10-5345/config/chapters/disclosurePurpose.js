import {
  purposeOfDisclosureUiSchema,
  purposeOfDisclosureSchema,
} from '../../pages/purposeOfDisclosure';

const disclosurePurposeChapter = {
  title: 'Disclosure Purpose',
  pages: {
    purposeOfDisclosure: {
      path: 'purpose-of-disclosure',
      title: 'Purpose of disclosure',
      uiSchema: purposeOfDisclosureUiSchema,
      schema: purposeOfDisclosureSchema,
    },
  },
};

export default disclosurePurposeChapter;