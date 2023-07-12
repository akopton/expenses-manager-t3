import { useEffect, useState } from "react";

export const useLoadingState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setLoading(false);
    setSuccess(false);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setError(false);
    setLoading(false);
  };

  const resetStatus = () => {
    setSuccess(false);
    setError(false);
    setLoading(false);
  };

  const handleLoadingStatus = (type: string) => {
    switch (type) {
      case "loading":
        handleLoading();
        break;

      case "error":
        handleError();
        break;

      case "success":
        handleSuccess();
        break;

      default:
        break;
    }
  };

  return { error, loading, success, handleLoadingStatus, resetStatus };
};
