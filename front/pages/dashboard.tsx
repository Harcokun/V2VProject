import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContainer } from "../containers/containerProvider";

const Dashboard: NextPage = () => {
    const {authService} = useContainer();
    const router = useRouter()

    return (
        <></>
    );
}

export default Dashboard;