import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };
  const RemoveFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        alt="product"
        height={200}
        width={200}
        style={{ objectFit: "contain" }}
      />

      {/* Middle */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Icon
                icon="material-symbols:star-rate-rounded"
                color="yellow"
                height={20}
                key={i}
              />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="INR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="prime"
              className="h-[40px]"
            />
            <p className="text-xs text-gray-500">Free Fast Delivery</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={RemoveFromBasket}>
          Remove from Basket
        </button>
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
