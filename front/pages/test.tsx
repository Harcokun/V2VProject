import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/ImagePoint/ImagePoint"), {
  ssr: false,
});

const Test: NextPage = () => {
  return (
    <div>
      <NoSSRComponent />;
    </div>
  );
};

export default Test;