import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import CarControllerCard from "../components/Card/CarControllerCard";
import MapCard from "../components/Card/MapCard";
import ActiveCarCard from "../components/Card/ActiveCarCard";
import Loading from "../components/Loading";
import ImagePoint from "../components/ImagePoint/ImagePoint";

import { defaultCarsList, defaultActiveCarsList } from "../utils/constants";

const Dashboard: NextPage = () => {
  const { authService, carService } = useContainer();
  const [isFetched, setFetched] = useState(false);
  const [carsList, setCarsList] = useState(defaultCarsList);

  const [activeCarsList, setActiveCarsList] = useState<any>(defaultActiveCarsList);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval( async () => {
      // const carsInfo = defaultCarsList;
      const carsInfo = (await carService.getCarsInfo()).data.cars;
      // const activeCarsList = defaultActiveCarsList;
      const activeCarsList =  (await carService.getActiveCarsInfo()).data.data;
      // console.log("activeCarsList in dashboard", activeCarsList);
      setCarsList(carsInfo);
      setActiveCarsList(activeCarsList);
      if(carsInfo && activeCarsList) setFetched(true);
      else setFetched(false);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if(!isFetched) return <Loading/>

  return (
    <div className="static">
      <h1 className="static font-bold text-xl my-4 ml-10">Dashboard</h1>
      <div className="grid grid-rows-4 grid-cols-6 gap-4">
        <div className="row-start-1 row-end-3 col-start-1 col-end-4">
          <MapCard activeCarsList={activeCarsList}/>
        </div>
        <div className="row-start-1 row-end-3 col-start-4 col-end-6">
          <CarControllerCard
            activeCarsList={activeCarsList}
            carService={carService}
          />
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-6">
          <ActiveCarCard heading="Active Car Data" activeCarsList={activeCarsList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;