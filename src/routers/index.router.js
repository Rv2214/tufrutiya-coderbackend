import ApiRouter from "./api/index.api.js";
import ViewsRouter from "./views/index.views.js";
import CustomRouter from "./CustomRouter.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
    this.router.use("/simplex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.router.use("/complex", (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 1000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}
