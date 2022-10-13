import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";
import dynamic from "next/dynamic";

const ImagePoint = dynamic(() => import("../ImagePoint/ImagePoint"), {
  ssr: false,
});

interface MapCardProps {
  activeCarsList: any;
}

const MapCard: React.FC<MapCardProps> = ({ activeCarsList }) => {

  return (
    <Card heading="Location">
      <div className="text-center">
        <ImagePoint activeCarsList={activeCarsList} />
      </div>
    </Card>
  );
};

export default MapCard;