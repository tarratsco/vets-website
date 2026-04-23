/**
 * ComputedLineDisplay — renders a single read-only computed line value
 * with proper aria-live for screen reader announcements.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/irrrlCalculations';

export default function ComputedLineDisplay({
  lineLabel,
  value,
  isTotal,
  isMissing,
  ariaLabel,
}) {
  const displayValue = isMissing ? '\u2014' : formatCurrency(value);
  const missingAriaLabel = isMissing
    ? 'Not yet calculated. Complete Sections I and II first.'
    : ariaLabel || `${lineLabel}: ${displayValue}`;

  return (
    <div
      className={`irrrl-computed-line vads-u-margin-bottom--1 ${isTotal ? 'irrrl-computed-line--total' : ''}`}
    >
      <div className="vads-u-display--flex vads-u-justify-content--space-between vads-u-align-items--center vads-u-padding-y--1">
        <span
          className={`irrrl-computed-line__label ${isTotal ? 'vads-u-font-weight--bold' : ''}`}
        >
          {lineLabel}
        </span>
        <span
          aria-live="polite"
          aria-label={missingAriaLabel}
          className={`irrrl-computed-line__value ${isTotal ? 'vads-u-font-weight--bold vads-u-font-size--lg' : ''} ${isMissing ? 'irrrl-computed-line__value--missing' : ''}`}
        >
          {displayValue}
        </span>
      </div>
    </div>
  );
}

ComputedLineDisplay.propTypes = {
  lineLabel: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  isMissing: PropTypes.bool,
  isTotal: PropTypes.bool,
  value: PropTypes.number,
};

ComputedLineDisplay.defaultProps = {
  isMissing: false,
  isTotal: false,
  value: 0,
};