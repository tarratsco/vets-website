import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { apiRequest } from 'platform/utilities/api';
import { focusElement } from 'platform/utilities/ui';
import recordEvent from 'platform/monitoring/record-event';
import { API_ENDPOINTS } from '../../constants/constants';
import { ensureValidCSRFToken } from '../../utils/actions/ensure-valid-csrf-token';

const DownloadFormPDF = ({ downloadGuid, formData }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePdfDownload = useCallback(blob => {
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.href = downloadUrl;
    downloadLink.download = '21-4192_completed.pdf';
    document.body.appendChild(downloadLink);

    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadUrl);
  }, []);

  const fetchPdf = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);
      setErrorMessage(null);

      try {
        await ensureValidCSRFToken('fetchPdf');

        const fetchPdfByPost = () =>
          apiRequest(API_ENDPOINTS.downloadPdf, {
            method: 'POST',
            body: formData,
            headers: { 'Content-Type': 'application/json' },
          });

        let response;
        if (downloadGuid) {
          try {
            response = await apiRequest(
              API_ENDPOINTS.downloadPdfByGuid(downloadGuid),
              {
                method: 'GET',
              },
            );

            if (!response?.ok) {
              throw new Error('GET PDF download failed');
            }
          } catch (error) {
            response = await fetchPdfByPost();
          }
        } else {
          response = await fetchPdfByPost();
        }

        if (!response?.ok) {
          throw new Error();
        }

        const blob = await response.blob();
        handlePdfDownload(blob);
        recordEvent({ event: '21-4192-pdf-download--success' });
      } catch (error) {
        setErrorMessage(
          "We're sorry. Something went wrong when downloading your form. Please try again later.",
        );
        recordEvent({ event: '21-4192-pdf-download--failure' });
      } finally {
        setLoading(false);
      }
    },
    [downloadGuid, formData, handlePdfDownload],
  );

  // apply focus to the error alert if we have errors set
  useEffect(
    () => {
      if (errorMessage) focusElement('.form-download-error');
    },
    [errorMessage],
  );

  // render loading indicator while application download is processing
  if (loading) {
    return (
      <va-loading-indicator
        label="Loading your form"
        message="Downloading your completed form..."
      />
    );
  }

  return (
    <>
      {errorMessage && (
        <div className="form-download-error vads-u-margin-y--1">
          <va-alert status="error">{errorMessage}</va-alert>
        </div>
      )}
      <va-link
        text="Download a copy of your VA Form 21-4192"
        onClick={fetchPdf}
        filetype="PDF"
        href="#"
        download
      />
    </>
  );
};

DownloadFormPDF.propTypes = {
  downloadGuid: PropTypes.string,
  formData: PropTypes.string,
};

export default DownloadFormPDF;
