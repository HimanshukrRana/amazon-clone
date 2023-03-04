import React from "react";
import { Icon } from "@iconify/react";
import Header from "../components/Header";

import { useRouter } from "next/router";

function success() {
  const router = useRouter();

  return (
    <div className=" bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto pt-8">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 ">
            <Icon
              icon="material-symbols:check-circle-rounded"
              color="green"
              width={40}
            />
            <h1 className="text-3xl">
              Thank you , your order has been confirmed
            </h1>
          </div>
          <p className="mt-2 ml-12">
            Thank you for shopping with us.We'll send a confirmation once your
            order is shipped,if you would like to check the status of your
            order(s) please visit the orders sections or the link below
          </p>
          <button
            className="button mt-8"
            onClick={() => router.push("/orders")}
          >
            Go to my Order(s)
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
