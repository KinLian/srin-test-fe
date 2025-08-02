import { useEffect, useState } from "react";

function useGet<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  function fetchData() {
    fetch(`${process.env.REACT_APP_BE_URL_BASE_LOCAL}${url}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData.data);
      })
      .catch((e) => console.warn(e));
  }

  useEffect(() => {
    let getData = true;
    if (getData) fetchData();
    return () => {
      getData = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, refetch: fetchData };
}

export default useGet;
