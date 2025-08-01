import { useEffect, useState } from "react";

function useGet<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  function fetchData() {
    let getData = true;
    fetch(`${process.env.REACT_APP_BE_URL_BASE_LOCAL}${url}`)
      .then((res) => res.json())
      .then((jsonData) => {
        if (getData) setData(jsonData);
      });

    return () => {
      getData = false;
    };
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchData(), [url]);

  return { data, refetch: fetchData };
}

export default useGet;
