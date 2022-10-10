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
            <th scope="col">Car Model</th>
            <th scope="col">MAC Address</th>
            <th scope="col">Current Speed</th>
            <th scope="col">Current Piece</th>
            <th scope="col">Current Index</th>
          </tr>
        </thead>
        <tbody>
          {carsList.map((car: any, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{car.model}</td>
                <td>{car.MacId}</td>
                <td>{car.velocity}</td>
                <td>{car.piece}</td>
                <td>{car.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default ActiveCarCard;
