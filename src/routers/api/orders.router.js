import { order } from "../../data/mongo/manager.mongo.js";
import { Router } from "express";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await order.create(data);
    return res.json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/report/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await order.report(uid);
    return res.json({
      statusCode: 200,
      reponse: report,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:uid", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
    };
    const { uid } = req.params;
    const filter = { user_id: uid };
    const all = await order.read({ filter, orderAndPaginate });
    console.log(all);
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await order.update(oid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await order.destroy(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;
