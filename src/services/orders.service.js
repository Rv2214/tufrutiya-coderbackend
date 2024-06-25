import repository from "../repositories/orders.repositories.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    try {
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  readOne = async (id) => await this.repository.readOne(id);
  update = async (id, data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
}

const service = new OrdersService();
export default service;
