import { session, getSession, useSession } from "next-auth/react";
import React from "react";

import Header from "../components/Header";
import Order from "../components/order";
import moment from "moment";

import db from "../../firebase";

function Orders({ orderItems }) {
  const { data: session } = useSession();

  // console.log(orderItems, "orderItemsorderItems");

  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orderItems?.length}Orders</h2>
        ) : (
          <button className="button">Please sign in to see your orders</button>
        )}

        {/* <h1 className="text-3xl">In progress....</h1> */}

        <div className="mt-5 space-y-4">
          {orderItems?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  //Get the users logged in credentials...

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // const stripeOrders = db
  //   .collection("users")
  //   .doc(session.user.email)
  //   .collection("orders")
  //   .orderBy("timestamp", "desc")
  //   .get();

  // // console.log(stripeOrders);

  // const orders = await Promise.all(
  //   stripeOrders.docs.map(async (order) => ({
  //     id: order.id,
  //     amount: order.data().amount,
  //     amountShipping: order.data().amount_shipping,
  //     images: order.data().images,
  //     timestamp: moment(order.data().timestamp.toDate()).unix(),
  //     items: (
  //       await stripe.checkout.session.listLineItems(order.id, {
  //         limit: 100,
  //       })
  //     ).data,
  //   }))
  // );

  // return {
  //   props: {
  //     orders,
  //   },
  // };

  const stripeOrdersSnapshot = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = stripeOrdersSnapshot.docs.map((order) => {
    const data = order.data();
    return {
      id: order.id,
      amount: data.amount,
      amountShipping: data.amount_shipping,
      images: data.images,
      timestamp: moment(data.timestamp.toDate()).unix(),
    };
  });

  const orderItems = await Promise.all(
    orders.map(async (order) => {
      const { data } = await stripe.checkout.sessions.listLineItems(order.id, {
        limit: 100,
      });
      return {
        ...order,
        items: data,
      };
    })
  );

  return {
    props: {
      orderItems,
    },
  };
}
