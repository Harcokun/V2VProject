import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import CarListCard from "../components/Card/CarListCard";
import { defaultCarInfo ,defaultCarsList } from "../utils/constants";

const Car: NextPage = () => {
  const { authService, carService } = useContainer();
  const [isFetched, setFetched] = useState(false);
  const [carsList, setCarsList] = useState(defaultCarsList);
  const [selectedCarInfo, setSelectedCarInfo] = useState(defaultCarInfo);
  const router = useRouter();

  useEffect(() => {
    const initialLoader = async () => {
      const carsInfo = (await carService.getCarsInfo()).data.cars;
      setCarsList(carsInfo || defaultCarsList);
      setSelectedCarInfo(defaultCarInfo);
    };
    initialLoader();
  }, []);

  return (
    <div className="static">
      <h1 className="inline-block static font-bold text-xl my-4 ml-10">
        Car Management
      </h1>
      <button
        className="absolute inline-block top-4 right-[17%] bg-primary text-white text-sm
                    px-4 h-8 rounded-full"
        onClick={()=>{router.push("/addCar")}}
      >
        ADD NEW CAR
      </button>
      <div className="grid grid-rows-1 grid-cols-6 gap-4">
        <div className="col-start-1 col-end-6">
          <CarListCard heading="Car List" carsList={carsList} />
        </div>
      </div>
    </div>
  );
};

export default Car;
