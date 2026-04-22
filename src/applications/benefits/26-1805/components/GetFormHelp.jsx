import React from 'react';

/**
 * GetFormHelp component for VA Form 26-1805
 * Displayed in the form footer; provides lender contact information
 * for form-related questions.
 */
export default function GetFormHelp() {
  return (
    <p className="help-talk">
      If you have questions about this form or VA appraisal requests, contact
      your{' '}
      <a
        href="https://www.benefits.va.gov/homeloans/contact_rlc_info.asp"
        target="_blank"
        rel="noopener noreferrer"
      >
        VA Regional Loan Center (RLC)
      </a>
      . For technical issues with this form, call us at{' '}
      <va-telephone contact="8008271000" /> (TTY:{' '}
      <va-telephone contact="711" tty />
      ), Monday through Friday, 8:00 a.m. to 9:00 p.m.{' '}
      <dfn>
        <abbr title="Eastern Time">ET</abbr>
      </dfn>
      .
    </p>
  );
}