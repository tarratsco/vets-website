import {
  recipientInformationUiSchema,
  recipientInformationSchema,
} from '../../pages/recipientInformation';

const recipientChapter = {
  title: 'Recipient',
  pages: {
    recipientInformation: {
      path: 'recipient-information',
      title: 'Recipient information',
      uiSchema: recipientInformationUiSchema,
      schema: recipientInformationSchema,
    },
  },
};

export default recipientChapter;