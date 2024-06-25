import service from "../services/users.service.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/errors.js";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await service.create(data);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
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
      if (all) {
        return res.success200(all);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  stats = async (req, res, next) => {
    try {
      const id = req.one._id;
      const all = await service.stats(id);
      if (all) {
        return res.success200(all);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await service.readOne(uid);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  readByEmail = async (req, res, next) => {
    try {
      const { email } = req.params;
      const response = await this.service.readByEmail(email);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const response = await service.update(uid, data);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await service.destroy(uid);
      if (response) {
        return res.success200(response);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  updateRole = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const { newRole } = req.body;
      const updatedUser = await service.updateRole(uid, newRole);
      return res.success200(updatedUser);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const {
  create,
  read,
  stats,
  readOne,
  readByEmail,
  update,
  destroy,
  updateRole,
} = controller;
export {
  create,
  read,
  stats,
  readOne,
  readByEmail,
  update,
  destroy,
  updateRole,
};
