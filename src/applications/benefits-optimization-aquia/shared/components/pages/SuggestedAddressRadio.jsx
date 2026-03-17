import React from 'react';
import { VaRadio } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { formatAddress } from '@bio-aquia/shared/utils/validators/address-validation';

/**
 * Renders radio tile options allowing the user to choose between the
 * address they entered and a USPS-suggested address.
 *
 * @param {Object} props
 * @param {string} props.title - Heading text
 * @param {Object} props.userAddress - The address the user originally entered
 * @param {Object} props.selectedAddress - Currently selected address
 * @param {Object} props.suggestedAddress - Address suggested by validation API
 * @param {Function} props.onChangeSelectedAddress - Callback on radio change
 */
export default function SuggestedAddressRadio({
  title,
  userAddress,
  selectedAddress,
  suggestedAddress,
  onChangeSelectedAddress,
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>We found a similar address to the one you entered.</p>
      <VaRadio
        label="Tell us which address you'd like to use."
        onVaValueChange={onChangeSelectedAddress}
        required
      >
        {userAddress && (
          <va-radio-option
            key="userAddress"
            name="addressGroup"
            label="Address you entered:"
            description={formatAddress(userAddress)}
            value={JSON.stringify(userAddress)}
            tile
            checked={
              JSON.stringify(selectedAddress) === JSON.stringify(userAddress)
            }
          />
        )}
        {suggestedAddress && (
          <va-radio-option
            key="suggestedAddress"
            name="addressGroup"
            label="Suggested address:"
            description={formatAddress(suggestedAddress)}
            value={JSON.stringify(suggestedAddress)}
            tile
            checked={
              JSON.stringify(selectedAddress) ===
              JSON.stringify(suggestedAddress)
            }
          />
        )}
      </VaRadio>
    </div>
  );
}
