import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";
import Card from "../components/Card";

const Dashboard: NextPage = () => {
  const { authService } = useContainer();
  const router = useRouter();

  return (
    <div>
      <Card heading="Test Card">
        <Image
          className="flex justify-center items-center"
          src="/images/testmap.png"
          alt="Test Map"
          width={400}
          height={250}
          layout="intrinsic"
          objectFit="scale-down"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
