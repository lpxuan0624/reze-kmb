import { useState, useEffect } from "react";
const routeAPI = "https://data.etabus.gov.hk/v1/transport/kmb/route/";

export default function JoeyKMB() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState(null); //empty object can't check boolean, so change to null
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetchStopsofRoute();
  }, [route]);

  async function fetchStopsofRoute() {
    const api = "https://data.etabus.gov.hk/v1/transport/kmb";
    if (route) {
      const res = await fetch(
        `${api}/route-stop/${route.route}/${route.bound}/${route.service_type}`
      );
      const result = await res.json();
      if (result?.data.length) {
        let stopArr = [];
        await Promise.all(
          result.data.map(async ({ stop }) => {
            const res = await fetch(`${api}/stop/${stop}`);
            const result = await res.join();
            stopArr.push({
              stopId: stop,
              name_tc: result.data.name_tc,
            });
          })
        );
        setStops(stopArr);
      }
    }
  }

    useEffect(() => {
      fetchAllRoutes();
    }, []);

    async function fetchAllRoutes() {
      const res = await fetch(routeAPI);
      const result = await res.json();
      setList(result.data);
  }
  
  function handleRT(stopId) {
    const { route, service_type } = route;
    // route, service_type, stopId => fetch ETA
    }

    function handleUserInput(e) {
      let text = e.target.value.replaceAll(/[^a-zA-Z0-9]/g, "").toUpperCase();
      setKeyword(text);
    }

    function handleSearch() {
      let routeArr = [];
      if (!!list.length) {
        //change data type to boolean
        list.map((item) => {
          return item.route === keyword && routeArr.push(item);
        });
      }
      setRoutes(routeArr);
    }
    return (
      <div className="container mx-auto">
        <img
          alt=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_yolPSr1p8k-QJQ7PqLRHNSQbEKd-jNTSew&s"
          width={200}
        />
        <section>
          {/* input */}
          <input
            className={"border border-red-400 rounded-md py-1 px-2"}
            onChange={(e) => handleUserInput(e)} // RegEx
            value={keyword}
            placeholder={"請輸入路線"}
          />
          <button
            className={
              "border rounded-md bg-red-200 py-1 px-2 hover:bg-red-400"
            }
            onClick={handleSearch}
          >
            搜尋路線
          </button>
        </section>
        <section>
          {/* route */}
          {!!routes.length &&
            routes.map(
              ({ bound, dest_tc, orig_tc, service_type, route }, index) => {
                return (
                  <button
                    key={index}
                    className={
                      "border py-1 px-2 bg-gray-100 rounded-md m-1 hover:bg-gray-200"
                    }
                    onClick={() =>
                      setRoute({
                        bound: bound === "O" ? "outbound" : "inbound",
                        service_type, // service_type: service_type
                        route, // route: route
                      })
                    }
                  >{`${orig_tc} >> ${dest_tc}`}</button>
                );
              }
            )}
        </section>
        <section>
          {/* Stops */}
          {!!stops.length &&
            stops.map(({ stopId, stopName }) => {
              return <div
                key={stopId}
                onClick={() => handleUserInput(stopId)}
              >{stopName}</div>;
            })}
        </section>
      </div>
    );
  }

