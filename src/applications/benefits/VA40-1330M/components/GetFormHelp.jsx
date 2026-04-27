import React from 'react';

export const GetFormHelp = () => (
  <div className="help-footer-box">
    <h2 className="help-heading">Need help?</h2>
    <p>
      If you have questions about this form or need help, contact the National
      Cemetery Administration (NCA).
    </p>
    <p>
      <strong>By phone:</strong>
      <br />
      <va-telephone contact="8005351117" />
      <br />
      Monday through Friday, 8:00 a.m. to 5:00 p.m. ET
    </p>
    <p>
      <strong>Online:</strong>
      <br />
      <va-link
        href="https://www.va.gov/burials-memorials/"
        text="VA Burials and Memorials"
      />
    </p>
  </div>
);

export default GetFormHelp;