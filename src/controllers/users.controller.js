import service from "../services/users.service.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await service.create(data);
      return res.success201(response);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: { name: 1 },
        lean: true,
      };
      const filter = {};
      if (req.query.email) {
        filter.email = new RegExp(req.query.email.trim(), "i");
      }
      if (req.query.sort === "desc") {
        options.sort.name = "desc";
      }
      const all = await service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  stats = async (req, res, next) => {
    try {
      const id = req.one._id;
      const all = await service.stats(id);
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await service.readOne(uid);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const response = await service.update(uid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await service.destroy(uid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, stats, readOne, update, destroy } = controller;
export { create, read, stats, readOne, update, destroy };
