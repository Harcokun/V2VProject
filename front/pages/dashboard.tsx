import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import CarControllerCard from "../components/Card/CarControllerCard";
import MapCard from "../components/Card/MapCard";
import ActiveCarCard from "../components/Card/ActiveCarCard";
import Loading from "../components/Loading";

import { defaultCarInfo, defaultCarsList } from "../utils/constants";

const Dashboard: NextPage = () => {
  const { authService, carService } = useContainer();
  const [isFetched, setFetched] = useState(false);
  const [carsList, setCarsList] = useState(defaultCarsList);
  const [selectedCarInfo, setSelectedCarInfo] = useState(defaultCarInfo);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // const carsInfo = await carService.getCarsInfo().data;
      // setCarsList(carsInfo);
      setFetched(true);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if(!isFetched) return <Loading/>

  return (
    <div className="static">
      <h1 className="static font-bold text-xl my-4 ml-10">Dashboard</h1>
      <div className="grid grid-rows-4 grid-cols-6 gap-4">
        <div className="row-start-1 row-end-3 col-start-1 col-end-4">
          <MapCard carsList={carsList}/>
        </div>
        <div className="row-start-1 row-end-3 col-start-4 col-end-6">
          <CarControllerCard
            carsList={carsList}
            carService={carService}
          />
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-6">
          <ActiveCarCard heading="Activated Car Data" carsList={carsList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
