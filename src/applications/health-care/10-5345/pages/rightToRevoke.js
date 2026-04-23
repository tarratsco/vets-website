/**
 * @module pages/rightToRevoke
 * @description HIPAA right-to-revoke notice and required acknowledgment (45 CFR 164.508(c)(2))
 */
import {
  checkboxGroupUI,
  checkboxGroupSchema,
} from 'platform/forms-system/src/js/web-component-patterns';

export const rightToRevokeUiSchema = {
  'ui:title': 'Your right to revoke this authorization',
  'ui:description': () => (
    <div>
      <va-alert status="info" visible>
        <h2 slot="headline">Important: Your right to revoke</h2>
        <p>
          You have the right to revoke this authorization at any time before the
          records have been released. To revoke, submit a written request to the
          Release of Information (ROI) office at the VA Medical Center(s) you
          identified on this form.
        </p>
        <p>
          <strong>Revocation does not apply to disclosures already made</strong>{' '}
          in reliance on this authorization before we received your revocation
          request.
        </p>
      </va-alert>

      <va-accordion>
        <va-accordion-item
          header="Full right-to-revoke notice and revocation procedure"
          id="right-to-revoke-full"
        >
          <div>
            <p>
              Under HIPAA (45 CFR 164.508(c)(2)), you have the right to revoke
              this authorization at any time, except to the extent that VA or
              another party has already taken action in reliance on this
              authorization.
            </p>
            <p>
              <strong>To revoke this authorization:</strong>
            </p>
            <ol>
              <li>
                Write a signed, dated letter clearly stating that you are
                revoking authorization for release of your health information.
                Include your full name, date of birth, and the last 4 digits of
                your Social Security number.
              </li>
              <li>
                Submit the revocation letter to the Release of Information (ROI)
                office at the VA Medical Center where you submitted this form.
                You may mail, hand-deliver, or fax your revocation.
              </li>
              <li>
                The ROI office will confirm receipt and stop processing of
                records that have not yet been released.
              </li>
            </ol>
            <p>
              <strong>Important:</strong> If records have already been sent to
              the recipient you designated, VA cannot recall them. Revocation
              applies only to future disclosures.
            </p>
            <p>
              Revoking this authorization will not affect your ability to
              receive treatment at VA, or your eligibility for any VA benefits
              or programs.
            </p>
          </div>
        </va-accordion-item>
      </va-accordion>
    </div>
  ),
  rightToRevokeAcknowledged: {
    'ui:title': 'Right-to-revoke acknowledgment',
    'ui:widget': 'checkbox',
    'ui:errorMessages': {
      required:
        'You must acknowledge your right to revoke this authorization before submitting.',
    },
    'ui:required': () => true,
    'ui:options': {
      label:
        'I have read and understand my right to revoke this authorization at any time. I understand that revocation does not apply to disclosures already made in reliance on this authorization.',
    },
  },
};

export const rightToRevokeSchema = {
  type: 'object',
  required: ['rightToRevokeAcknowledged'],
  properties: {
    rightToRevokeAcknowledged: {
      type: 'boolean',
    },
  },
};