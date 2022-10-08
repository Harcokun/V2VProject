import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";

interface ActiveCarCardProps {
  heading: string;
  carsList: Array<any>;
}

const ActiveCarCard: React.FC<ActiveCarCardProps> = ({ heading, carsList }) => {
  return (
    <Card heading={heading}>
      <table className="table-auto w-5/6">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car Name</th>
            <th scope="col">MAC Address</th>
            <th scope="col">Current Speed</th>
            <th scope="col">Current Block</th>
            <th scope="col">Current Index</th>
          </tr>
        </thead>
        <tbody>
          {carsList.map((car: any, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{car.name}</td>
                <td>{car.mac}</td>
                <td>{car.speed}</td>
                <td>{car.block}</td>
                <td>{car.index}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default ActiveCarCard;
