"use client";

import PricingModel from "@/components/custom/PricingModel";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import React, { useContext } from "react";

const Pricing = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  return (
    <div
      className=" flex flex-col items-center w-full p-6 md:px-32 lg:px-48"
      style={{ backgroundColor: Colors.BACKGROUND }}
    >
      <h2 className="font-bold text-5xl mb-2">Pricing</h2>
      <p className="text-gray-400 max-w-xl text-center">
        {LookUp.PRICING_DESC}
      </p>

      <div className="p-5 border rounded-xl flex justify-between w-full mt-5 items-center">
        <h2 className="text-lg">
          <span className="font-bold">{userDetails?.token} Token Left</span>
        </h2>
        <div>
          <h2 className="font-medium">Need More Token?</h2>
          <p>Upgrade your plan below</p>
        </div>
      </div>
      <PricingModel />
    </div>
  );
};

export default Pricing;
