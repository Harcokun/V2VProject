import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";
import CarInfo from "../../utils/types";

const SPEED_MULTIPLIER = 250;

interface CarInfoCardProps {
  isFetched: boolean;
  carInfo: CarInfo;
  handleDirectionChange: (dir: string) => void;
  handleSpeedChange: (speedDiff: number) => void;
}

const CarInfoCard: React.FC<CarInfoCardProps> = ({
  isFetched,
  carInfo,
  handleDirectionChange,
  handleSpeedChange,
}) => {
  const [speedLevel, setSpeedLevel] = useState(0);
  const [isSpeedUpAvaibable, setSpeedUpAvailable] = useState(true);
  const [isSpeedDownAvaibable, setSpeedDownAvailable] = useState(false);
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
      <Card heading={carInfo.name + " Data"}>
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
          <table className="font-sans w-5/6 mx-auto mb-4 text-s">
            <tbody>
              <tr className="py-2">
                <td className="text-left">Current Speed</td>
                <td className="text-right text-emerald-600 text-xl">
                  {carInfo.speed} mm/s, Level {speedLevel}
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
                  Block {carInfo.block}, Index {carInfo.index}
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
        </div>
      </Card>
    );
  }
  return (
    <Card heading={"No Car Data"}>
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
        Please select a car from the map.
      </div>
    </Card>
  );
};

export default CarInfoCard;
