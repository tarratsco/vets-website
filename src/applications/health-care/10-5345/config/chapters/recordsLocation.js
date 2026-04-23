import {
  vaFacilityUiSchema,
  vaFacilitySchema,
} from '../../pages/vaFacility';

const recordsLocationChapter = {
  title: 'Records Location',
  pages: {
    vaFacility: {
      path: 'va-facility',
      title: 'VA Medical Center(s)',
      uiSchema: vaFacilityUiSchema,
      schema: vaFacilitySchema,
    },
  },
};

export default recordsLocationChapter;