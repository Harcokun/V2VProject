import * as React from "react";
import Card from "./Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import ButtonWithIcon from "../Button/ButtonWithIcon";
import ImagePoint from "../ImagePoint/ImagePoint";

interface MapCardProps {}

const MapCard: React.FC<MapCardProps> = ({}) => {
  return (
    <Card heading="Location">
      <div className="flex-col justify-center items-center">
        {/* <ImagePoint /> */}
        <Image
          className="flex justify-center items-center"
          src="/images/testmap.png"
          alt="Test Map"
          width={400}
          height={290}
          layout="intrinsic"
          objectFit="scale-down"
        />
      </div>
    </Card>
  );
};

export default MapCard;
