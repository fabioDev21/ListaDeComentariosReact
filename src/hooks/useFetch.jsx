import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [dados, setDados] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const httpConfig = (dados, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "applicaton/json",
        },
        body: JSON.stringify(dados),
      });
      setMethod(method);
    }
  };

  useEffect(() => {
    const puxaDados = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        setDados(json);
      } catch (error) {
        console.log(error.message);
        setError("Erro ao carregar aos dados!");
      }
    };

    puxaDados();
    setLoading(false);
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      let json;

      if (method === "POST") {
        let fetchOptions = [url, config];
        setLoading(true);

        const res = await fetch(...fetchOptions);
        json = await res.json();

        setLoading(false);
      }

      setCallFetch(json);
    };
    httpRequest();
  }, [config, method, url]);

  return { dados, httpConfig, loading, error };
};
