import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";
import CarInfo from "../../utils/types";
import { defaultCarInfo } from "../../utils/constants";
import DropDownButton from "../Button/DropDownButton";
import Button from "../Button/Button";

const SPEED_MULTIPLIER = 250;

const CancelButtonStyle = {
  default: {
    background: "rgba(228, 48, 48, 0.1)",
    border: "#E43030",
    text: "#E43030",
  },
};

interface CarControllerCardProps {
  carsList: Array<CarInfo>;
  carService: any;
}

const CarControllerCard: React.FC<CarControllerCardProps> = ({
  carsList,
  carService,
}) => {
  const [selectedCarInfo, setSelectedCarInfo] = useState(defaultCarInfo);
  const [isFetched, setFetched] = useState(false);
  const [speedLevel, setSpeedLevel] = useState(0);
  const [isSpeedUpAvaibable, setSpeedUpAvailable] = useState(true);
  const [isSpeedDownAvaibable, setSpeedDownAvailable] = useState(false);

  useEffect(() => {
    console.log(selectedCarInfo);
  }, [selectedCarInfo]);

  const getCarFromDropDown = (car: CarInfo) => {
    setSelectedCarInfo(car);
    setFetched(true);
  };

  const handleSpeedChange = async (velocity: number) => {
    const response = await carService.changecelocity(selectedCarInfo._id, velocity);
  };

  const handleDirectionChange = async (dir: string) => {
    const response = await carService.changeDir(selectedCarInfo._id, dir);
  };

  const speedLevelValidation = (speedLevelDiff: number) => {
    if (speedLevel + speedLevelDiff >= 4) {
      setSpeedUpAvailable(false);
      console.log(`Cannot increase speed!`);
      console.log(`isSpeedUpAvaibable: ${isSpeedUpAvaibable}`);
    }
    if (speedLevel + speedLevelDiff <= 0) {
      setSpeedDownAvailable(false);
      console.log(`Cannot decrease speed!`);
      console.log(`isSpeedDownAvaibable: ${isSpeedDownAvaibable}`);
    }
    if (0 < speedLevel + speedLevelDiff && speedLevel + speedLevelDiff < 4) {
      setSpeedUpAvailable(true);
      setSpeedDownAvailable(true);
    }
    console.log(`Current Speed Level: ${speedLevel}`);
    setSpeedLevel(speedLevel + speedLevelDiff);
    handleSpeedChange(SPEED_MULTIPLIER * speedLevel); // Need to wait for currentSpeed update
  };

  if (isFetched) {
    return (
      <Card heading={selectedCarInfo.model + " Controller"}>
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
                  {selectedCarInfo.velocity} mm/s, Level {speedLevel}
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
                      console.log(`Decrease Speed`);
                      speedLevelValidation(-1);
                    }}
                    disabled={!isSpeedDownAvaibable}
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
                      console.log(`Increase Speed`);
                      speedLevelValidation(1);
                    }}
                    disabled={!isSpeedUpAvaibable}
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
                  Piece {selectedCarInfo.piece}, Index {selectedCarInfo.location}
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
                      handleDirectionChange("l");
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
                      handleDirectionChange("r");
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
                  text="Back"
                  colorStyle={CancelButtonStyle}
                  margin={[24, 0, 0, 0]}
                  onClick={() => {
                    setSelectedCarInfo(defaultCarInfo);
                    setFetched(false);
                  }}
                />
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
      <div className="ml-[30%] mt-4">
        <DropDownButton
          carsData={carsList}
          getCarFromDropDown={getCarFromDropDown}
        />
      </div>
    </Card>
  );
};

export default CarControllerCard;
