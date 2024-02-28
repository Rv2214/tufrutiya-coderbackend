import { Router } from "express";
/* import user from "../../data/fs/users.fs.js"; */
import propsUsers from "../../middlewares/propsUsers.mid.js";
import { user } from "../../data/mongo/manager.mongo.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const orderAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { name: 1 },
    };
    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.sort === "desc") {
      orderAndPaginate.sort.name = "desc";
    }
    const all = await user.read({ filter, orderAndPaginate });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const one = await user.readOne(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    } else {
      console.log(one);
      return res.json({
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;

    const one = await user.readByEmail(email);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    } else {
      console.log(one);
      return res.json({
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const one = await user.destroy(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    } else {
      console.log(one);
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await user.create(data);
    res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const response = await user.update(uid, data);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

export default usersRouter;
