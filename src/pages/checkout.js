import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import Stripe from "stripe";

const stripePromises = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromises;

    //call the api

    const checkoutsession = await axios.post("api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect to stripe

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutsession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className=" max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1320}
            height={290}
            style={{ objectFit: "contain" }}
            className="h-auto w-[1380px]"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Basket is Empty"
                : "Your Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <div className="whitespace-nowrap">
                <h2 className="text-xl font-bold">SubTotal :-</h2>

                <p className="font-bold text-2xl">
                  ({items.length}item(s):
                  <Currency quantity={total} currency="INR" />)
                </p>
              </div>
              <button
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session && "from-gray-200 to-gray-300 "
                }`}
              >
                {!session ? "SignIn to Checkout" : "Procced to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
