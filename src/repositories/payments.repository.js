import Stripe from "stripe";
import service from "../services/orders.service.js";
import CheckoutDTO from "../dto/checkout.dto.js";

const stripe = new Stripe(process.env.STRIP_SECRET_KEY);

const checkoutRepository = async (filter) => {
  try {
    let productsOnCartRes = await service.read(filter);
    let productsOnCart = productsOnCartRes.docs;
    const transformedProducts = productsOnCart.map(
      (each) => new CheckoutDTO(each)
    );

    const line_items = transformedProducts;
    const mode = "payment";
    const success_url = "http://localhost:8080/thanks.html";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export default checkoutRepository;
