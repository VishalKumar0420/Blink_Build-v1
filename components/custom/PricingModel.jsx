import LookUp from "@/data/LookUp";
import React, { useContext, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PricingModel = () => {
  const {userDetails,setUserDetails}=useContext(UserDetailsContext)
  const UpdateToken = useMutation(api.users.updateTokens);
  const [selectedOption, setSelectedOption] = useState(null);

  const onPaymentSuccess = async () => {
    if (!selectedOption) return;
    const token = userDetails?.token + Number(selectedOption?.value);
    await UpdateToken({
      token: token,
      userId: userDetails?._id,
    });
  };
  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {LookUp.PRICING_OPTIONS.map((pricing, index) => {
        return (
          <div
            key={index}
            className="border p-4 rounded-xl flex flex-col gap-3"
          >
            <h2 className="font-bold text-2xl ">{pricing.name}</h2>
            <h2 className="font-medium text-lg">{pricing.tokens}</h2>
            <p className="text-gray-400 h-20">{pricing.desc}</p>
            <h2 className="font-bold text-4xl text-center">
              ${pricing.price}
            </h2>
            <div className="flex items-center justify-center">
              {/* <Button>Upgrade to {pricing.name}</Button> */}
              <PayPalButtons
                disabled={!userDetails}
                style={{ layout: "horizontal" }}
                onClick={() => setSelectedOption(pricing)}
                onApprove={() => onPaymentSuccess()}
                onCancel={() => console.log("cancel your payment")}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: pricing.price,
                          currency_code: "USD",
                          // intent: "capture",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingModel;
