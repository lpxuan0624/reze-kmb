import Counter from "./counter";
import JoeyKMB from "./JoeyKMB"

import "./App.css";
import { useState, useEffect } from "react";

const routeList = [{}, {}];
function App() {
  const [content, setContent] = useState("");
  // const {busRoutes, error} = useFetchBusRoutes();
  // console.log('content', content)
  const [busRoutes, setBusRoutes] = useState([]);
  const [busLine, setBusLine] = useState([]);
  const [busInfo, setBusInfo] = useState({});
  const [route, setRoute] = useState("");
  const [bound, setBound] = useState([]);
  const [serviceType, setServiceType] = useState("")
  const [Id, setStopIds] = useState([])
  

  // console.log("busInfo", busInfo)
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const api = "https://data.etabus.gov.hk/v1/transport/kmb/route/";

        const res = await fetch(api);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        const routeData = result.data;
        setBusRoutes(routeData);
        // console.log("data", routeData);

        // console.log(content)

        // setBusRoutes(result.data);
      } catch (error) {
        // setBusRoutes(null)
        console.log(error.message);
      }
    };
    fetchRoute();
  }, []);

  
  useEffect(() => {
    const busStopURL = `https://data.etabus.gov.hk/v1/transport/kmb/route-stop`;
    const fetchBusStop = async (route, bound, serviceType) => {
      bound = "I" ? bound = "inbound" : "outbound";
      const res = await fetch(
        `${busStopURL}/${route}/${bound}/${serviceType}`
      );
      // console.log(`${busStopURL}/${route}/${bound}/${serviceType}`)
      const result = await res.json();
      setStopIds(result.data.map((el) => el.stop))
      console.log(result.data.map((el) => el.stop))
    };
    if (route && bound && serviceType) {
    fetchBusStop(route, bound, serviceType);
    }
  }, [route, bound, serviceType]);

  useEffect(() => {
    const stopURL = "https://data.etabus.gov.hk/v1/transport/kmb/stop"
    const fetchStop = async (Id) => {
      const res = await fetch(`${stopURL}/${Id}`)
      const result = await res.json()
      // console.log("API3", result)
    };
    fetchStop(Id)
  },[Id])


  return (
    //search bar => search
    // In - out two options
    // show time
    // UI: let client know the data is fetching (loading)

    // LOGO
    <>
      <form className="form">
        <input
          className="border border-blue-700"
          placeholder="請輸入路線"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            // console.log(e);
            const filterBus = busRoutes.filter(
              (busRoute) => busRoute.route === e.target.value
            );
            console.log("filterBus", filterBus);
            setBusLine(filterBus);

            // setBusLine(filterBus.map
          }}
        />
      </form>
      <div>
        {busLine.map((el, idx) => (
          <p key={idx}>
            <button
              className="bg-zinc-100 border"
              onClick={() => {
                setBusInfo(el);
                setRoute(el.route);
                setBound(el.bound);
                setServiceType(el.service_type)
                // console.log("st", el.service_type)
                // console.log("click-route", el.route)
                // console.log("bound2", bound)
              }}
            >{`${el.route}: ${el.orig_tc} --> ${el.dest_tc}`}</button>
          </p>
        ))}
    <JoeyKMB />

      </div>
    </>
    //search button
    //<bus route option/>
    //<display />
  );
}

export default App;
