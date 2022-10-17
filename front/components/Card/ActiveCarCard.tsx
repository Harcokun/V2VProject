import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";

interface ActiveCarCardProps {
  heading: string;
  activeCarsList: any;
  carService: any;
}

const ActiveCarCard: React.FC<ActiveCarCardProps> = ({
  heading,
  activeCarsList,
  carService,
}) => {
  let sharedSpeedLevel = carService.getSharedSpeedLevel();
  let showingSpeedA = activeCarsList["D6:93:EB:A8:C1:5D"].speed;
  let showingSpeedB = activeCarsList["ED:9A:B3:A0:20:74"].speed;
  if(sharedSpeedLevel == 0) {
    showingSpeedA = 0;
    showingSpeedB = 0;
  }
  return (
    <Card heading={heading}>
      <table className="table-auto w-5/6">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">MAC Address</th>
            <th scope="col">Speed</th>
            <th scope="col">Current Piece</th>
            <th scope="col">Current Location</th>
          </tr>
        </thead>
        <tbody>
          {/* {Object.keys(activeCarsList).forEach(function (
            MacId: any,
            index: number
          ) {
            console.log("MacId in table: ", MacId);
            console.log("speed in table: ", activeCarsList[MacId].speed);
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{MacId}</td>
                <td>{activeCarsList[MacId].speed}</td>
                <td>{activeCarsList[MacId].piece}</td>
                <td>{activeCarsList[MacId].location}</td>
              </tr>
          );
          })} */}
          <tr key={"D6:93:EB:A8:C1:5D"}>
            <th scope="row">{1}</th>
            <td>{"D6:93:EB:A8:C1:5D"}</td>
            <td>{showingSpeedA}</td>
            <td>{activeCarsList["D6:93:EB:A8:C1:5D"].piece}</td>
            <td>{activeCarsList["D6:93:EB:A8:C1:5D"].location}</td>
          </tr>
          <tr key={"ED:9A:B3:A0:20:74"}>
            <th scope="row">{2}</th>
            <td>{"ED:9A:B3:A0:20:74"}</td>
            <td>{showingSpeedB}</td>
            <td>{activeCarsList["ED:9A:B3:A0:20:74"].piece}</td>
            <td>{activeCarsList["ED:9A:B3:A0:20:74"].location}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default ActiveCarCard;
