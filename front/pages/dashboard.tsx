import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import Card from "../components/Card/Card";
import CarInfoCard from "../components/Card/CarInfoCard";
import MapCard from "../components/Card/MapCard";
import ActiveCarCard from "../components/Card/ActiveCarCard";

const Dashboard: NextPage = () => {
  const { authService, carService } = useContainer();
  const [isFetched, setFetched] = useState(false);
  const [carsList, setCarsList] = useState([
    {
      name: "car test 1",
      mac: "12345",
      speed: 10,
      block: 1,
      index: 1,
    },
    {
      name: "car test 2",
      mac: "67890",
      speed: 5,
      block: 2,
      index: 1,
    },
  ]);
  const [selectedCarInfo, setSelectedCarInfo] = useState({
    name: "",
    mac: "",
    speed: 0,
    block: -1,
    index: -1,
  });
  const router = useRouter();

  useEffect(() => {
    const initialLoader = async () => {
      // const carsInfo = await carService.getCarsInfo().data;
      // setCarsList(carsInfo);
      setSelectedCarInfo({
        ...selectedCarInfo,
        name: "car test 1",
        mac: "12345",
        speed: 5,
        block: 1,
        index: 1,
      });
    }
    initialLoader();
  }, []);

  const handleSpeedChange = async (speed: number) => {
    const response = await carService.changeSpeed(speed);
  };

  const handleDirectionChange = async (dir: string) => {
    const response = await carService.changeDir(dir);
  };

  return (
    <div className="static">
      <h1 className="static font-bold text-xl my-4 ml-10">Dashboard</h1>
      <div className="grid grid-rows-4 grid-cols-6 gap-4">
        <div className="row-start-1 row-end-3 col-start-1 col-end-4">
          <MapCard />
        </div>
        <div className="row-start-1 row-end-3 col-start-4 col-end-6">
          <CarInfoCard
            isFetched={selectedCarInfo != null}
            carInfo={selectedCarInfo}
            handleDirectionChange={handleDirectionChange}
            handleSpeedChange={handleSpeedChange}
          />
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-6">
          <ActiveCarCard carsList={carsList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
