import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from 'platform/forms-system/src/js/actions';
import FormNavButtons from 'platform/forms-system/src/js/components/FormNavButtons';
import set from 'platform/utilities/data/set';
import get from 'platform/utilities/data/get';
import { fetchSuggestedAddress } from '@bio-aquia/shared/utils/validators/address-validation';
import AddressConfirmation from './AddressConfirmation';
import SuggestedAddressRadio from './SuggestedAddressRadio';

const USER_ENTERED_VALUE = 'user-entered';
const SUGGESTED_VALUE = 'usps-suggested';

/**
 * Higher-order function that returns a CustomPage component for address
 * validation. Each form passes its own configuration so the same logic
 * can be reused across all aquia bio forms.
 *
 * @param {Object} config
 * @param {string} config.addressPath - Dot-notation path to the address
 *   object inside formData (e.g. "employerInformation.employerAddress")
 * @param {string} [config.title="Confirm your address"] - Page heading
 * @returns {React.FC} A CustomPage component
 */
export function createAddressValidationPage({
  addressPath,
  title = 'Confirm your address',
}) {
  function AddressValidationCustomPage({
    goBack,
    goForward,
    contentBeforeButtons,
    contentAfterButtons,
  }) {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.form?.data);

    const [isLoading, setIsLoading] = useState(true);
    const [hasResolvedValidation, setHasResolvedValidation] = useState(false);
    const [userAddress, setUserAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [suggestedAddress, setSuggestedAddress] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [confidenceScore, setConfidenceScore] = useState(null);

    useEffect(
      () => {
        if (hasResolvedValidation) {
          return;
        }

        setHasResolvedValidation(true);

        const validate = async () => {
          const address = get(addressPath, formData) || {};
          setUserAddress(address);
          setSelectedAddress(address);

          const result = await fetchSuggestedAddress(address);
          setConfidenceScore(result.confidenceScore ?? null);

          if (result.suggestedAddress && result.showSuggestions) {
            setSuggestedAddress(result.suggestedAddress);
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false);
          }

          setIsLoading(false);
        };

        validate();
      },
      [addressPath, dispatch, formData, hasResolvedValidation],
    );

    // Maintain screen reader focus after loading resolves
    useEffect(
      () => {
        if (!isLoading) {
          const progressBar = document.getElementById('nav-form-header');
          if (progressBar) {
            progressBar.setAttribute('tabindex', '-1');
            progressBar.focus();
          }
        }
      },
      [isLoading],
    );

    const onChangeSelectedAddress = event => {
      const selectedValue = event?.detail?.value;
      const selected =
        selectedValue === SUGGESTED_VALUE ? suggestedAddress : userAddress;

      const isKnownSelection =
        selectedValue === USER_ENTERED_VALUE ||
        selectedValue === SUGGESTED_VALUE;

      if (!selected || !isKnownSelection) {
        return;
      }

      setSelectedAddress(selected);

      const updated = set(addressPath, selected, formData);
      dispatch(setData(updated));
    };

    const handleContinue = () => {
      goForward(formData);
    };

    if (isLoading) {
      return (
        <va-loading-indicator
          label="Validating address"
          message="Checking your address with the U.S. Postal Service..."
          set-focus
        />
      );
    }

    return showSuggestions ? (
      <div>
        <SuggestedAddressRadio
          title={title}
          userAddress={userAddress}
          selectedAddress={selectedAddress}
          suggestedAddress={suggestedAddress}
          onChangeSelectedAddress={onChangeSelectedAddress}
        />
        {contentBeforeButtons}
        <FormNavButtons goBack={goBack} goForward={handleContinue} />
        {contentAfterButtons}
      </div>
    ) : (
      <div>
        <AddressConfirmation
          subHeader={title}
          userAddress={userAddress}
          isExactMatch={confidenceScore === 100}
        />
        {contentBeforeButtons}
        <FormNavButtons goBack={goBack} goForward={handleContinue} />
        {contentAfterButtons}
      </div>
    );
  }

  AddressValidationCustomPage.displayName = `AddressValidation(${addressPath})`;

  return AddressValidationCustomPage;
}
