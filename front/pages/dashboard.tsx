import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import Card from "../components/Card/Card";
import CarInfoCard from "../components/Card/CarInfoCard";
import MapCard from "../components/Card/MapCard";
import ActiveCarCard from "../components/Card/ActiveCarCard";
import Loading from "../components/Loading";

const Dashboard: NextPage = () => {
  const { authService, carService } = useContainer();
  const [isFetched, setFetched] = useState(false);
  const [carsList, setCarsList] = useState([
    {
      id: "1",
      name: "car test 1",
      mac: "12345",
      speed: 10,
      block: 1,
      index: 1,
    },
    {
      id: "2",
      name: "car test 2",
      mac: "67890",
      speed: 5,
      block: 2,
      index: 1,
    },
  ]);
  const [selectedCarInfo, setSelectedCarInfo] = useState({
    id: "",
    name: "",
    mac: "",
    speed: 0,
    block: -1,
    index: -1,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // const carsInfo = await carService.getCarsInfo().data;
      // setCarsList(carsInfo);
      setSelectedCarInfo({
        ...selectedCarInfo,
        id: "1",
        name: "car test 1",
        mac: "12345",
        speed: 5,
        block: 1,
        index: 1,
      });
      setFetched(true);
    };
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSpeedChange = async (speed: number) => {
    const response = await carService.changeSpeed(selectedCarInfo.id, speed);
  };

  const handleDirectionChange = async (dir: string) => {
    const response = await carService.changeDir(selectedCarInfo.id, dir);
  };

  if(!isFetched) return <Loading/>

  return (
    <div className="static">
      <h1 className="static font-bold text-xl my-4 ml-10">Dashboard</h1>
      <div className="grid grid-rows-4 grid-cols-6 gap-4">
        <div className="row-start-1 row-end-3 col-start-1 col-end-4">
          <MapCard carsList={carsList}/>
        </div>
        <div className="row-start-1 row-end-3 col-start-4 col-end-6">
          <CarInfoCard
            isFetched={selectedCarInfo.mac != ""}
            carInfo={selectedCarInfo}
            handleDirectionChange={handleDirectionChange}
            handleSpeedChange={handleSpeedChange}
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
