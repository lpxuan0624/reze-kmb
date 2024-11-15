import { useState, useEffect } from "react";

export function useFetchBusRoutes() {
  const api = "https://data.etabus.gov.hk/v1/transport/kmb/route/";
  const [busRoutes, setBusRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setBusRoutes(result.data);
      } catch (error) {
        setError("Failed to fetch bus routes");
      }
    };
    fetchRoute();
  }, []);

  return { busRoutes, error };
}