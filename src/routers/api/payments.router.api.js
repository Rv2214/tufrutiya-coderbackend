import CustomRouter from "../CustomRouter.js";
import { checkoutController } from "../../controllers/payments.controller.js";

class PaymentsRouter extends CustomRouter {
  init() {
    this.create("/checkout", ["USER", "PREM", "ADMIN"], checkoutController);
  }
}

const paymentsRouter = new PaymentsRouter();
export default paymentsRouter.getRouter();
