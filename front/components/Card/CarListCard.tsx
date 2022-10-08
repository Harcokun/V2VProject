import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CarListCardProps {
  heading: string;
  carsList: Array<any>;
}

const CarListCard: React.FC<CarListCardProps> = ({ heading, carsList }) => {
  return (
    <Card heading={heading}>
      <table className="table-auto w-1/2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car Name</th>
            <th scope="col">MAC Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {carsList.map((car: any, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{car.name}</td>
                <td>{car.mac}</td>
                <td>
                  <button
                    className="
                        bg-primary
                        text-white
                        text-sm
                        px-4
                        h-5
                        rounded-full"
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default CarListCard;
