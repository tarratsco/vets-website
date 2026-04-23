import {
  recordTypesUiSchema,
  recordTypesSchema,
} from '../../pages/recordTypes';
import {
  sensitiveRecordsUiSchema,
  sensitiveRecordsSchema,
} from '../../pages/sensitiveRecords';
import {
  recordDateRangeUiSchema,
  recordDateRangeSchema,
} from '../../pages/recordDateRange';

const hasSensitiveRecords = formData => {
  const sensitiveTypes = [
    'substanceUseTreatment',
    'psychotherapyNotes',
    'hivAidsRecords',
    'geneticInformation',
  ];
  return sensitiveTypes.some(
    type => formData.recordTypes?.[type] === true,
  );
};

const recordsRequestedChapter = {
  title: 'Records Requested',
  pages: {
    recordTypes: {
      path: 'record-types',
      title: 'Types of records',
      uiSchema: recordTypesUiSchema,
      schema: recordTypesSchema,
    },
    sensitiveRecords: {
      path: 'sensitive-records',
      title: 'Sensitive record types',
      depends: hasSensitiveRecords,
      uiSchema: sensitiveRecordsUiSchema,
      schema: sensitiveRecordsSchema,
    },
    recordDateRange: {
      path: 'record-date-range',
      title: 'Date range for records',
      uiSchema: recordDateRangeUiSchema,
      schema: recordDateRangeSchema,
    },
  },
};

export default recordsRequestedChapter;