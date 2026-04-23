/**
 * @module pages/vaFacility
 * @description Identify the VAMC(s) where the Veteran's records are held
 */
import {
  textUI,
  textSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const vaFacilityUiSchema = {
  'ui:title': 'VA Medical Center(s)',
  'ui:description': () => (
    <div>
      <va-alert status="info" visible>
        <span slot="headline">About facility selection</span>
        <p>
          Select the VA Medical Center(s) where your records are held. Your
          authorization form will be routed to the Release of Information (ROI)
          office at each facility you select. If you are unsure which facility
          holds your records, contact your primary VA Medical Center.
        </p>
      </va-alert>
    </div>
  ),
  'view:primaryFacility': {
    'ui:title': 'Primary enrolled VA Medical Center',
    'ui:description':
      'This is your primary enrolled facility based on your VA enrollment information.',
    'view:facilityName': textUI({
      title: 'Primary VA Medical Center name',
      hint:
        'Enter the name of your primary VA Medical Center (e.g., "VA Central Iowa Health Care System").',
      errorMessages: {
        required: 'Please enter the name of the VA Medical Center.',
      },
    }),
    'view:facilityId': textUI({
      title: 'VA Medical Center station number (optional)',
      hint:
        'The 3–5 character station number for the facility, if known (e.g., "583").',
    }),
  },
};

export const vaFacilitySchema = {
  type: 'object',
  required: [],
  properties: {
    'view:primaryFacility': {
      type: 'object',
      properties: {
        'view:facilityName': {
          type: 'string',
          maxLength: 200,
        },
        'view:facilityId': {
          type: 'string',
          maxLength: 10,
        },
      },
    },
  },
};