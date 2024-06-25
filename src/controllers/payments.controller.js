import checkoutService from "../services/payments.service.js";

class CheckoutController {
  constructor() {
    this.service = checkoutService;
  }
  checkoutController = async (req, res, next) => {
    try {
      const userId = req.one._id;
      const response = await checkoutService({ userId });
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default CheckoutController;
const controller = new CheckoutController();
const { checkoutController } = controller;
export { checkoutController };
