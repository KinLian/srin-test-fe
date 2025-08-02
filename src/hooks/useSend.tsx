import { useState } from "react";

type Method = "POST" | "PUT" | "DELETE";
export interface RequestProps extends Omit<Partial<Request>, "body" | "method"> {
  onSuccess: (data: unknown) => void;
  onFailed?: (data: unknown) => void;
}

const INIT_CONDITIONS = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
};

function useSend(method: Method) {
  const [conditions, setConditions] = useState(INIT_CONDITIONS);

  function sendData(
    url: string,
    body: unknown,
    { onSuccess, onFailed, ...props }: RequestProps
  ) {
    setConditions((prev) => ({
      ...prev,
      isLoading: true,
      isSuccess: false,
      isFailed: false,
    }));

    fetch(`${process.env.REACT_APP_BE_URL_BASE_LOCAL}${url}`, {
      body: JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...props,
    })
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
        if (onFailed) onFailed(e);
      });
  }

  return { call: sendData, ...conditions };
}

export default useSend;
