import { useState, useEffect } from "react";

export function useData(request, ...params) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await request(...params);

      if (data.status === "success") {
        setResponse({
          status: "success",
          message: "Данные получены",
          data: data.data,
        });

        return;
      }

      if (data.status === "empty") {
        setResponse({
          status: "error",
          message: "Данные не получены",
          data: [],
        });

        return;
      }

      setResponse({
        status: "error",
        message: "Произошла ошибка",
        data: [],
      });
    })();
  }, []);

  return response;
}
