import React from 'react';

/**
 * Footer help content shown on each form page.
 */
export default function GetHelp() {
  return (
    <div className="help-footer-box vads-u-margin-top--4 vads-u-padding--3 vads-u-background-color--gray-lightest">
      <h2 className="vads-u-font-size--h4 vads-u-margin-top--0">
        Need help?
      </h2>
      <p>
        If you have questions about completing this advance directive, contact
        your VA social worker, chaplain, or patient advocate.
      </p>
      <p>
        You can also call us at <va-telephone contact="8006982411" />
        {' '}
        (TTY: <va-telephone contact="711" />
        ). We're here Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.
      </p>
    </div>
  );
}