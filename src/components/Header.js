import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  const items = useSelector(selectItems);

  return (
    <header>
      {/* top nav */}

      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 px-2">
          <Image
            src="https://links.papareact.com/f90"
            width={110}
            height={40}
            alt="amazon2.0"
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Search */}
        <div className=" hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md"
          />
          <div className="text-12 p-2">
            <Icon icon="ic:sharp-search" className="text-12" />
          </div>
        </div>

        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className=" link ">
            <p className="link">
              {session ? `Hello,${session.user.name}` : "Sign In"}
            </p>
            <p className="font-bold md:text-sm">Account & List</p>
          </div>
          <div className=" link ">
            <p>Returns</p>
            <p className="font-bold md:text-sm">& Orders</p>
          </div>
          <div
            className="relative items-center link flex  "
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 bg-yellow-400 h-4 w-4 text-center text-black font-bold rounded-full">
              {items.length}
            </span>
            <Icon icon="material-symbols:shopping-cart-outline" height={35} />
            <p className="font-bold hidden md:inline md:text-sm mt-2">Basket</p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Icon icon="material-symbols:menu-rounded" height={29} />
          All
        </p>
        <p className="link">Amazon Prime</p>
        <p className="link">Today's Deal</p>
        <p className="link">Mobiles</p>
        <p className="link hidden md:inline-flex">Best Sellers</p>

        <p className="link hidden md:inline-flex">Amazon Pay</p>
        <p className="link hidden md:inline-flex">Fashion</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Customer Services</p>
      </div>
    </header>
  );
}

export default Header;
