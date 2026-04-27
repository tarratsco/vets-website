import React from 'react';

export const GetFormHelp = () => (
  <div className="help-footer-box">
    <h2 className="help-heading">Need help?</h2>
    <p>
      For help with this form, contact the National Cemetery Administration
      (NCA):
    </p>
    <ul>
      <li>
        <strong>Phone:</strong> Call NCA at{' '}
        <va-telephone contact="18005351117" uswds /> (TTY:{' '}
        <va-telephone contact="18008294833" uswds />)
      </li>
      <li>
        <strong>Online:</strong>{' '}
        <a href="https://www.va.gov/burials-memorials/memorial-items/headstones-markers-medallions/">
          Learn more about headstones and markers
        </a>
      </li>
    </ul>
  </div>
);

export default GetFormHelp;