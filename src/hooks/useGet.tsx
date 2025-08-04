import { useEffect, useState } from "react";

function useGet<T>(url: string) {
  const [data, setData] = useState<T | null>(null);

  async function fetchData() {
    fetch(`${process.env.REACT_APP_BE_URL_BASE_LOCAL}${url}`)
      .then(async (res) => {
        const resJson = await res.json();
        if (res.status >= 400 && res.status <= 600)
          throw new Error(resJson.detail);
        return resJson;
      })
      .then((jsonData) => setData(jsonData.data))
      .catch((e) => {
        console.error(e);
        alert(e);
        return e;
      });
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
