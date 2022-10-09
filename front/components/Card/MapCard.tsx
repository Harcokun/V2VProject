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
  carsList: Array<any>;
}

const MapCard: React.FC<MapCardProps> = ({ carsList }) => {
  return (
    <Card heading="Location">
      <div className="text-center">
        <ImagePoint carsList={carsList} />
      </div>
    </Card>
  );
};

export default MapCard;
