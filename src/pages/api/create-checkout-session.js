const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateAmount = (amount) => {
  return amount * 100;
};

export default async (req, res) => {
  const { items, email } = req.body;

  //   console.log(items);

  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "INR",
      unit_amount: calculateAmount(item.price),
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  //   console.log(transformedItems);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate: "shr_1MgnAJSE9yqdtQzoS3eFjlrV",
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "CA"],
    },
    line_items: transformedItems,
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  //   console.log(session, "====session");

  res.status(200).json({ id: session.id });
};
