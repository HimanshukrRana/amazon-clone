import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

// const dotenv = require("dotenv");
// dotenv.config();

export default function Home({ products }) {
  //   console.log(products);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />

      <main className="max-w-screen-xl m-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // const session = getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      // session,
    },
  };
}
