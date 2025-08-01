import { useState } from "react";

interface useSendProps extends Request {
  url: string;
  onSuccess: (data: unknown) => void;
  onFailed: (data: unknown) => void;
}

const INIT_CONDITIONS = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
};

function useSend({ url, onSuccess, onFailed, ...props }: useSendProps) {
  const [conditions, setConditions] = useState(INIT_CONDITIONS);

  function sendData() {
    setConditions((prev) => ({
      ...prev,
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    }));

    fetch(`${process.env.REACT_APP_BE_URL_BASE_LOCAL}${url}`, props)
      .then((res) => res.json())
      .then((data) => {
        setConditions((prev) => ({
          ...prev,
          isLoading: false,
          isSuccess: true,
          isFailed: false,
        }));
        onSuccess(data);
      })
      .catch((e) => {
        setConditions((prev) => ({
          ...prev,
          isLoading: false,
          isSuccess: false,
          isFailed: true,
        }));
        onFailed(e);
      });
  }

  return { call: sendData, ...conditions };
}

export default useSend;
