import React from 'react';

export default function GetFormHelp() {
  return (
    <div className="help-footer-box">
      <h2 className="help-heading">Need help?</h2>
      <p>
        If you have questions about this form or need help completing it, call
        us at <va-telephone contact="8008271000" /> (TTY:{' '}
        <va-telephone contact="8008271000" tty />
        ). We're available Monday through Friday, 8:00 a.m. to 9:00 p.m. ET.
      </p>
      <p>
        You can also contact the Release of Information office at your local VA
        Medical Center.
      </p>
    </div>
  );
}