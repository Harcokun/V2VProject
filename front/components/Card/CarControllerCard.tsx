import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";
// import CarInfo from "../../utils/types";
import { defaultActiveCarInfo } from "../../utils/constants";
import DropDownButton from "../Button/DropDownButton";
import Button from "../Button/Button";
import { ActiveCarsList, CarInfo } from "../../utils/types";

const SPEED_MULTIPLIER = 250;
const DEFAULT_MAC_ID = "D6:93:EB:A8:C1:5D";

const CancelButtonStyle = {
  default: {
    background: "rgba(228, 48, 48, 0.1)",
    border: "#E43030",
    text: "#E43030",
  },
};

interface CarControllerCardProps {
  activeCarsList: any;
  carService: any;
}

const CarControllerCard: React.FC<CarControllerCardProps> = ({
  activeCarsList,
  carService,
}) => {
  const [selectedCarInfo, setSelectedCarInfo] = useState(defaultActiveCarInfo);
  const [isFetched, setFetched] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(0);
  // const [isSpeedUpAvaibable, setSpeedUpAvailable] = useState(true);
  // const [isSpeedDownAvaibable, setSpeedDownAvailable] = useState(false);

  useEffect(() => {
    console.log(activeCarsList[DEFAULT_MAC_ID]);
    setSelectedCarInfo(activeCarsList[DEFAULT_MAC_ID]); //
    setFetched(true);
    console.log(selectedCarInfo);
  }, [selectedCarInfo]);

  // const getCarFromDropDown = (car: any) => {
  //   setSelectedCarInfo(car);
  //   setFetched(true);
  // };

  const handleSpeedUp = async () => {
    const data = await carService.speedUp();
    setSpeedLevel(data.speed/250);
    console.log(`Speed up status: ${JSON.stringify(data)}`);
  };

  const handleSpeedDown = async () => {
    const data = await carService.speedDown();
    setSpeedLevel(data.speed/250);
    console.log(`Speed down status: ${JSON.stringify(data)}`);
  };

  const handleTurnLeft = async () => {
    const data = await carService.turnLeft();
    console.log(`Turn left status: ${JSON.stringify(data)}`);
  };

  const handleTurnRight = async () => {
    const data = await carService.turnRight();
    console.log(`Turn right status: ${JSON.stringify(data)}`);
  };

  // const speedLevelValidation = (speedLevelDiff: number) => {
  //   if (speedLevel + speedLevelDiff >= 4) {
  //     setSpeedUpAvailable(false);
  //     console.log(`Cannot increase speed!`);
  //     console.log(`isSpeedUpAvaibable: ${isSpeedUpAvaibable}`);
  //   }
  //   if (speedLevel + speedLevelDiff <= 0) {
  //     setSpeedDownAvailable(false);
  //     console.log(`Cannot decrease speed!`);
  //     console.log(`isSpeedDownAvaibable: ${isSpeedDownAvaibable}`);
  //   }
  //   if (0 < speedLevel + speedLevelDiff && speedLevel + speedLevelDiff < 4) {
  //     setSpeedUpAvailable(true);
  //     setSpeedDownAvailable(true);
  //   }
  //   console.log(`Current Speed Level: ${speedLevel}`);
  //   setSpeedLevel(speedLevel + speedLevelDiff);
  //   handleSpeedChange(SPEED_MULTIPLIER * speedLevel); // Need to wait for currentSpeed update
  // };

  if (isFetched) {
    return (
      <Card heading={DEFAULT_MAC_ID + " Controller"}>
        <div className="text-center">
          <Image
            className="flex justify-center items-center"
            src="/images/directions_car_24px_outlined.svg"
            alt="Test Map"
            width={130}
            height={130}
            layout="fixed"
            objectFit="scale-down"
          />
          <table className="font-sans w-5/6 mx-auto text-s">
            <tbody>
              <tr className="py-2">
                <td className="text-left">Current Speed</td>
                <td className="text-right text-emerald-600 text-xl">
                  {activeCarsList[DEFAULT_MAC_ID].speed} mm/s, Level {speedLevel}
                </td>
              </tr>
              <tr className="font-sans w-5/6 mx-auto mb-4 text-s">
                <td className="text-left">
                  <ButtonWithIcon
                    className="
                        bg-primary
                        text-white
                        px-4
                        h-8
                        rounded-full"
                    intext={"Speed Down"}
                    iconPath={"/icons/arrow_back_24px.svg"}
                    iconPosition={"left"}
                    onClick={() => {
                      // console.log(`Decrease Speed`);
                      // speedLevelValidation(-1);
                      handleSpeedDown();
                    }}
                    // disabled={!isSpeedDownAvaibable}
                  />
                </td>
                <td className="text-right">
                  <ButtonWithIcon
                    className="
                        bg-primary
                        text-white
                        px-4
                        h-8
                        rounded-full"
                    intext={"Speed Up"}
                    iconPath={"/icons/arrow_forward_24px.svg"}
                    iconPosition={"right"}
                    onClick={() => {
                      // console.log(`Increase Speed`);
                      // speedLevelValidation(1);
                      handleSpeedUp();
                    }}
                    // disabled={!isSpeedUpAvaibable}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="h-5">
                  <hr></hr>
                </td>
              </tr>
              <tr className="font-sans w-5/6 mx-auto mb-4 text-s">
                <td className="text-left">Location</td>
                <td className="text-right text-amber-500 text-xl">
                  Piece {activeCarsList[DEFAULT_MAC_ID].piece}, Index {activeCarsList[DEFAULT_MAC_ID].location}
                </td>
              </tr>
              <tr className="font-sans w-5/6 mx-auto mb-4 text-s">
                <td className="text-left">
                  <ButtonWithIcon
                    className="
                        bg-primary
                        text-white
                        px-4
                        h-8
                        rounded-full"
                    intext={"Turn Left"}
                    iconPath={"/icons/arrow_back_24px.svg"}
                    iconPosition={"left"}
                    onClick={() => {
                      handleTurnLeft();
                    }}
                  />
                </td>
                <td className="text-right">
                  <ButtonWithIcon
                    className="
                        bg-primary
                        text-white
                        px-4
                        h-8
                        rounded-full"
                    intext={"Turn Right"}
                    iconPath={"/icons/arrow_forward_24px.svg"}
                    iconPosition={"right"}
                    onClick={() => {
                      handleTurnRight();
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {/* <Button
                  text="Back"
                  colorStyle={CancelButtonStyle}
                  margin={[24, 0, 0, 0]}
                  onClick={() => {
                    setSelectedCarInfo(defaultActiveCarInfo);
                    setFetched(false);
                  }}
                /> */}
        </div>
      </Card>
    );
  }
  return (
    <Card heading={"Car Controller"}>
      <div className="text-center">
        <Image
          className="flex justify-center items-center"
          src="/images/directions_car_24px_outlined.svg"
          alt="Test Map"
          width={400}
          height={150}
          layout="intrinsic"
          objectFit="scale-down"
        />
      </div>
      <div className="text-center text-lg">
        Please select a car from the list to control.
      </div>
      {/* <div className="ml-[30%] mt-4">
        <DropDownButton
          carsData={carsList}
          getCarFromDropDown={getCarFromDropDown}
        />
      </div> */}
    </Card>
  );
};

export default CarControllerCard;
